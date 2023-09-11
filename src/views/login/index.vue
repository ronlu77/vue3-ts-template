<template>
  <div class="login_container">
    <div class="login_wrapper">
      <div class="header">
        <h1 class="title">Vue3-TS-Template</h1>
      </div>
      <div class="login_form_wrapper">
        <el-form ref="elForm" :model="loginForm" :rules="rules">
          <el-row>
            <el-col>
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  :prefix-icon="User"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="password">
                <el-input
                  :type="!isHidenPassword ? 'password' : 'text'"
                  v-model="loginForm.password"
                  :prefix-icon="Lock"
                  autocomplete="off"
                >
                  <template #suffix>
                    <el-icon @click="togglePassword">
                      <View v-if="isHidenPassword" />
                      <Hide v-else />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="footer">
        <el-button
          type="primary"
          :loading="loading"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'

const router = useRouter()
const useStore = useUserStore()
const isHidenPassword = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})
const usernameValidate = (rlue: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
const passwordValidate = (rlue: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('密码不得小于6位'))
  } else {
    callback()
  }
}
const rules = {
  username: [{ required: true, validator: usernameValidate }],
  password: [{ required: true, validator: passwordValidate }],
}
const loading = ref(false)

function handleLogin() {
  loading.value = true
  useStore
    .userLogin(loginForm)
    .then(() => {
      loading.value = false
      ElNotification({
        title: 'Success',
        type: 'success',
        message: '登录成功❗',
      })
      router.push('./').catch((err) => {
        console.log('error login', err)
      })
    })
    .catch((err) => {
      loading.value = false
      console.warn(err)
    })
}

function togglePassword() {
  isHidenPassword.value = !isHidenPassword.value
}
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg');
  background-size: cover;
  position: relative;

  .login_wrapper {
    position: absolute;
    top: 40%;
    right: 10%;
    width: 30%;
    padding: 40px;
    backdrop-filter: blur(40px);
    box-shadow: 0 0 10px rgba(20, 20, 20, 0.5);
    border-radius: 4px;
  }
}

.title {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #fff;
}

.footer {
  .el-button {
    width: 100%;
  }
}
</style>
