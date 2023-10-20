import { ref, reactive, defineComponent, watch, onMounted, onUnmounted, nextTick } from 'vue'
import request from '@/utils/request'
import { cloneDeep, isNil, isUndefined } from 'lodash-es'
import qs from 'qs'
import './style.scss'

export default defineComponent({
  name: 'LTableList',
  props: {
    schema: { type: Object, required: true }, // json 对象，用于构建 l-table-list
    distance: { type: Boolean, default: true }, // 默认为true , 用来判断是表单获取数据的方式，true,远程接口获取，false 静态数据，结合 sourceData 使用
    sourceData: { type: Array, default: () => [] }, // 使用静态数时的数据集合
    searchData: { type: Object, default: () => ({}) }, // 除分页外额外需要传递的字段
    displayPagination: { type: Boolean, default: true }, // 是否显示分页
    displayNavtool: { type: Boolean, default: true }, // 是否显示工具条
    size: { type: String, default: 'full' }, // 表单大小有三种情况: full: 跟随父元素变化; auto: 随自身高度变化 ; custom: 自定义，开启需要同时使用 tableHeight
    tableHeight: { type: [Number, String], default: 500 },
  },
  emit: [],
  setup(props, { emit, slots, expose }) {
    const lTableRef = ref(null)
    const defaulTableListProps = {
      distance: props.distance,
      displayPagination: props.displayPagination,
      displayNavtool: props.displayNavtool,
    }
    const paginationPropData = reactive({
      currentPage: 1,
      pageSize: 10,
    })
    const useSourceData = ref([])
    const loading = ref(false)
    const useSchema = ref(initSchema(props.schema))
    const useTableHeight = ref(props.tableHeight)
    const uId = ref('l-table-list' + new Date().getTime())

    //#region validate
    if (isUndefined(props.schema.tableSchema)) {
      console.warn('[l-table-list], "tableSchema" must be required')
      return () => ''
    }
    if (!props.schema.distance && props.sourceData) {
      useSourceData.value = cloneDeep(props.sourceData)
    } else {
      fetchTableListData(useSchema.value.requestSchema)
    }
    //#endregion

    // 初始化 props.Schema
    function initSchema(schema) {
      const subSchema = cloneDeep(schema)
      const { distance, displayPagination, requestSchema } = subSchema
      if (isNil(distance)) {
        subSchema.distance = defaulTableListProps.distance
      }
      if (distance && isNil(requestSchema)) {
        console.warn(
          '[l-table-list]: if you set "distance" true, "requestSchema" must be required.',
        )
      }
      if (
        distance &&
        !isUndefined(requestSchema) &&
        (isNil(requestSchema.requestUrl) || isNil(requestSchema.method))
      ) {
        console.warn(
          '[l-table-list]: if you set "distance" true, "requestUrl" and "method" must be required in requestSchema.',
        )
        subSchema.distance = false
      }
      if (isNil(displayPagination)) {
        subSchema.displayPagination = defaulTableListProps.displayPagination
      }
      return subSchema
    }

    /** 设置tableList的大小 */
    function setTableListSize(props) {
      const size = props.size
      if (isUndefined(size)) return
      nextTick(() => {
        // 根据 l-table-list 外层父元素撑满
        if (size === 'full') {
          const LTableList = document.getElementById(uId.value)
          if (isNil(LTableList)) return
          const parentDom = LTableList.parentNode
          const MainClientHeight = parentDom.offsetHeight
          // [32, 28, 40] => [top, navtool, pagination]
          useTableHeight.value = MainClientHeight - 100 - 10 // offset 10
        } else if (size === 'auto') {
          useTableHeight.value = (useSourceData.value.length + 1) * 41
        } else if (size === 'custom') {
          useTableHeight.value = props.tableHeight
        }
      })
    }

    /** 获取l-table-list表单数据 */
    function fetchTableListData(requestSchema) {
      const { requestUrl: url, method } = requestSchema
      const params = {
        method,
        url: `${url}?${qs.stringify(paginationPropData)}`,
      }
      loading.value = true
      request(params)
        .then((result) => {
          useSourceData.value = result.data
          loading.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        })
    }

    function handlePaginationChange({ key, val }) {
      paginationPropData[key] = val
      fetchTableListData(useSchema.value.requestSchema)
      // 切换表单后滚动条回到顶部
      lTableRef.value.elTableRef.setScrollTop(0)
    }

    function renderPagination(schema) {
      if (!schema.displayPagination) return ''
      const total = 200
      return (
        <l-pagination
          class="l-table-list__pagination"
          total={total}
          current-page={paginationPropData.currentPage}
          page-size={paginationPropData.pageSize}
          onPaginationChange={handlePaginationChange}
        ></l-pagination>
      )
    }

    /** l-table 渲染 */
    function renderTable(schema, props) {
      const slotKeys = Object.keys(slots)
      const vSlot = {}
      // 多层级插槽传递，l-table 内置插槽
      const internalSlotList = ['indexTable', 'expandTable', 'selectionTable']
      slotKeys.forEach((key) => {
        if (internalSlotList.includes(key)) {
          vSlot[key] = (slotProps) => slots[key](slotProps)
        }
      })
      const tableSchema = schema.tableSchema
      setTableListSize(props)
      return (
        <l-table
          ref={lTableRef}
          sourceData={useSourceData.value}
          schema={tableSchema}
          v-slots={vSlot}
          loading={loading.value}
          tableHeight={useTableHeight.value}
          navtool={defaulTableListProps.displayNavtool}
        ></l-table>
      )
    }

    /** 获取表格选中行 */
    const tableSelection = () => {
      return lTableRef.value.tableSelection()
    }

    // 刷新表格数据
    const refreshTableList = () => {
      fetchTableListData(useSchema.value.requestSchema)
    }

    /** 窗口变化标识 */
    let resizing = false

    // function handleResetTableSize() {
    //   antishakeWindowResize(props)
    // }

    function antishakeWindowResize(props) {
      if (!resizing) {
        resizing = true
        setTimeout(() => {
          setTableListSize(props)
          resizing = false
        }, 300)
      }
    }

    onMounted(() => {
      //! 这里第二个参数回调函数不会使用外部定义变量，由于传递函数名时给的是函数的引用，执行回调函数的位置在全局层面，
      //! 因此无法根据作用域链找到传递的属性值，可以通过闭包或者bind方法改变函数执行来实现读取外部变量
      window.addEventListener('resize', antishakeWindowResize.bind(null, props))
    })

    onUnmounted(() => {
      window.removeEventListener(
        'resize',
        antishakeWindowResize.bind(null, props),
      )
    })

    expose({
      lTableRef,
      tableSelection,
      refreshTableList,
    })

    return () => {
      const renderTableMain = renderTable(props.schema, props)
      const renderPaginationMain = renderPagination(useSchema.value)
      return (
        <div class="l-table-list" id={uId.value || ''}>
          {renderTableMain}
          {renderPaginationMain}
        </div>
      )
    }
  },
})
