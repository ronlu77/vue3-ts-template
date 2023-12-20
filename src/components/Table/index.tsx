import { TextTag, TextDict, NavTools } from './components'
import { ref, computed, watch, defineComponent } from 'vue'
import { Ref, ComponentPublicInstance } from 'vue'
import { CD } from './utils'
import { cloneDeep, isUndefined, isNil } from 'lodash-es'

export default defineComponent({
  name: 'LTable',
  props: {
    sourceData: { type: Array, default: () => [] }, // 当tableType 为 0 时设置的静态数据集合；
    schema: { type: Object, required: true }, // ltable 的JSON对象
    tableHeight: { type: [String, Number], default: 300 }, // 自定义ltable高度
    loading: { type: Boolean, default: false },
    navtool: { type: Boolean, default: false }, // 开启l-table顶部工具导航
  },
  emit: [],
  setup(props, context) {
    const DEFAULT_COLUMN_WIDTH = 180
    const { emit, slots, expose } = context
    if (isUndefined(props.schema) || isUndefined(props.schema.properties)) {
      console.warn('ltable [schema] [schema.properties] is required.')
      return () => ''
    }
    const elTableRef: Ref<HTMLElement | ComponentPublicInstance | null> =
      ref(null)
    const tableMainRef: Ref<HTMLElement | ComponentPublicInstance | null> =
      ref(null)
    const useTableData = computed(() => props.sourceData)
    const useTableHeight = computed(() => props.tableHeight)

    // ltable 默认原生组件属性
    const defaultTableComponentProps = {
      border: true,
      stripe: true,
      showHeader: true,
      hightlightCurrentRow: true,
      height: useTableHeight.value,
    }

    // 最终渲染的ltable属性
    const renderTableMainProps = ref({})

    renderTableMainProps.value = Object.assign(
      {},
      defaultTableComponentProps,
      props.schema[CD.component],
    )

    watch(useTableHeight, (newVal) => {
      renderTableMainProps.value['height'] = newVal
    })

    /** 初始化列 ltable-column 属性，非原生组件属性 */
    function initSchema(propsSchema, CD) {
      const defaultColumnProps = {
        [CD.display]: true,
        [CD.component]: 'text',
      }
      const finalSchema = cloneDeep(propsSchema)
      const schemaPropKeys = Object.keys(propsSchema.properties)
      schemaPropKeys.forEach((key) => {
        const filedColumn = finalSchema.properties[key]
        if (!isUndefined(finalSchema.properties)) {
          finalSchema.properties[key] = Object.assign(
            {},
            defaultColumnProps,
            filedColumn,
          )
        } else {
          finalSchema.properties[key] = Object.assign({}, defaultColumnProps)
        }
        if (
          !isUndefined(filedColumn.customRender) &&
          filedColumn.customRender == 'slotName'
        ) {
          finalSchema.properties[key][CD.component] = key
        }
        if (isUndefined(filedColumn.dataIndex)) {
          finalSchema.properties[key]['dataIndex'] = key
        }
      })
      return finalSchema
    }

    const useSchema = ref(
      cloneDeep(Object.assign({}, initSchema(props.schema, CD))),
    )

    /** 判断表格宽度和具体表格列宽总和之间的关系：
     *  - 如果具体列宽总和大于表格宽度，则按照具体列宽来设置每一列宽度；
     *  - 反之，如果设置了withMode: auto的列按照auto来设置，没有设置还是按照具体列宽来设置。
     * */
    function determineTableWidthSpill(schema): boolean {
      if (isNil(tableMainRef.value)) return false
      const scrollWidth = gainRealTableWidth(schema, CD)
      return (tableMainRef.value as HTMLElement).offsetWidth < scrollWidth
    }

    /** 处理ltable 插槽列 */
    function renderSlots(slots, tableColumnList) {
      const EnumSlotsList = ['indexTable', 'selectionTable', 'expandTable']
      const slotKeys = Object.keys(slots)
      if (!slotKeys.length) return
      slotKeys.forEach((key) => {
        if (EnumSlotsList.includes(key)) {
          switch (key) {
            case 'indexTable':
            case 'selectionTable': {
              const operateTypeMap = {
                indexTable: 'index',
                selectionTable: 'selection',
              }
              const defaultTableOperatColumnProps = {
                type: operateTypeMap[key],
                width: 55,
                align: 'center',
                headerAlign: 'center',
                label: key === 'indexTable' ? '序号' : '',
                fixed: 'left',
              }
              const item = (
                <el-table-column
                  {...defaultTableOperatColumnProps}
                ></el-table-column>
              )
              tableColumnList.push(item)
              break
            }
            case 'expandTable': {
              const vSlots = {
                default: (slotProps) => (
                  <div class="l-table__expand">{slots[key](slotProps)}</div>
                ),
              }
              const item = (
                <el-table-column
                  type="expand"
                  v-slots={vSlots}
                ></el-table-column>
              )
              tableColumnList.push(item)
              break
            }
            default:
              break
          }
        }
      })
    }

    /** 处理ltable 单元格内容 */
    function renderTableColumnCell(key, finalColumnProps, tableColumnList) {
      const filedColumn = useSchema.value.properties[key]
      const vSlots = {}
      // 处理 customHeaderRender 自定义头部插槽
      if (!isUndefined(filedColumn.customHeaderRender)) {
        vSlots['header'] = slots[filedColumn.customHeaderRender]
      }
      switch (filedColumn[CD.component].toLowerCase()) {
        case 'text': {
          vSlots['default'] = (slotProps) => {
            const contentStr = slotProps.row[key]
            return <span>{contentStr}</span>
          }
          break
        }
        case 'text.dict': {
          vSlots['default'] = (slotProps) => (
            <TextDict
              lkey={key}
              schema={cloneDeep(useSchema.value)}
              scope={slotProps}
            ></TextDict>
          )
          break
        }
        case 'text.tag': {
          vSlots['default'] = (slotProps) => (
            <TextTag
              lkey={key}
              schema={cloneDeep(useSchema.value)}
              scope={slotProps}
            ></TextTag>
          )
          break
        }
        default: {
          break
        }
      }
      const filedJsx = (
        <el-table-column
          v-slots={vSlots}
          {...finalColumnProps}
        ></el-table-column>
      )
      tableColumnList.push(filedJsx)
    }

    /** 渲染ltable-column display为true的列 */
    function renderDisplayTableColumn(schema: any, CD: any) {
      const tableColumnList = []
      const schemaPropKeys = Object.keys(schema.properties)
      // 优先处理内置插槽 ['indexTable', 'selectionTable', 'expandTable']
      renderSlots(slots, tableColumnList)
      schemaPropKeys.forEach((key) => {
        const filedColumn = schema.properties[key]
        if (!filedColumn[CD.display]) return
        // ltable-column-item 默认原生组件属性
        const defaultColumnComponentProps = {
          width: DEFAULT_COLUMN_WIDTH,
          sortable: false,
          showOverflowTooltip: true,
          align: 'left',
          headerAlign: 'center',
        }
        let finalColumnProps = {}
        if (!isUndefined(filedColumn[CD.componentProps])) {
          finalColumnProps = Object.assign(
            {},
            defaultColumnComponentProps,
            filedColumn[CD.componentProps],
          )
          if (
            isUndefined(finalColumnProps['label']) ||
            isUndefined(finalColumnProps['prop'])
          ) {
            finalColumnProps['label'] = isUndefined(filedColumn.title)
              ? key
              : filedColumn.title
            finalColumnProps['prop'] = key
          }
          // 根据具体宽度是否溢出表格来处理 列宽取值
          if (determineTableWidthSpill(schema)) {
            // 1. 溢出 => 移除 widthMode: auto, 取默认宽度或自定义宽度
          } else {
            // 2.没有溢出 | widthMode: auto
            !isUndefined(filedColumn.widthMode) &&
              delete finalColumnProps['width']
          }
        }
        const EnumComponentTypeList = ['text', 'text.dict', 'text.tag']
        // 判断 x-component 为自定义插槽
        if (
          EnumComponentTypeList.includes(
            filedColumn[CD.component].toLowerCase(),
          )
        ) {
          renderTableColumnCell(key, finalColumnProps, tableColumnList)
        } else {
          // 处理自定义插槽 customRender
          const item = (
            <el-table-column
              v-slots={{
                default: slots && slots[key],
              }}
              {...finalColumnProps}
            ></el-table-column>
          )
          tableColumnList.push(item)
        }
      })

      return tableColumnList
    }

    // 获取 l-table的具体宽度
    const gainRealTableWidth = (schema: any, CD: any): number => {
      let _width = 0
      const { properties } = schema
      // 过滤掉 x-display：false 项
      const schemaPropKeys = Object.keys(properties).filter((k) => {
        return isNil(properties[k][CD.display]) || properties[k][CD.display]
      })
      schemaPropKeys.forEach((key) => {
        _width +=
          Number(properties[key][CD.componentProps].width) ||
          DEFAULT_COLUMN_WIDTH
      })
      return _width
    }

    const refreshLayout = () => {
      elTableRef.value && (elTableRef.value as any).doLayout()
    }

    const tableSelection = () => {
      return (elTableRef.value as any).getSelectionRows()
    }

    expose({
      elTableRef,
      refreshLayout,
      tableSelection,
    })

    return () => {
      // setup 返回的render函数会执行多次，setup只会执行一次
      const renderTableColumns = renderDisplayTableColumn(useSchema.value, CD)
      const renderTableMain = (
        <el-table
          ref={elTableRef}
          data={useTableData.value}
          v-loading={props.loading}
          {...renderTableMainProps.value}
        >
          {renderTableColumns}
        </el-table>
      )
      const tableNav = props.navtool ? (
        <NavTools schema={useSchema.value}></NavTools>
      ) : (
        ''
      )
      return (
        <div class="l-table__container">
          <div class="l-table__top l-table-nav">{tableNav}</div>
          <div ref={tableMainRef} class="l-table__main">
            {renderTableMain}
          </div>
        </div>
      )
    }
  },
})
