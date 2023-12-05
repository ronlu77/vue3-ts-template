<template>
  <div class="login">
    <div class="main">
      <div class="container">
        <div class="left">
          <div class="main-png">
            <img
              class="img"
              src="../../assets/svg/login-box-bg.svg"
              alt="img"
            />
            <h2>Vue3-Vite-TS</h2>
          </div>
        </div>
        <div class="right">
          <div class="form">
            <div class="form-title">登&nbsp;录</div>
            <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      type="text"
                      :prefix-icon="User"
                      placeholder="账号"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password"
                      :type="isShowPassword ? 'text' : 'password'"
                      autocomplete="off"
                      :prefix-icon="Lock"
                      @keyup.enter="handleLogin"
                      placeholder="密码"
                    >
                      <template #suffix>
                        <el-icon
                          class="cursor-pointer"
                          @click="togglePasswordShow"
                        >
                          <View v-if="isShowPassword" />
                          <Hide v-else />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="rememberMe">
                    <el-checkbox v-model="loginForm.rememberMe">
                      记住我
                    </el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-button
                    type="primary"
                    :loading="loading"
                    @click.prevent="handleLogin"
                  >
                    <span v-if="!loading">登&nbsp;录</span>
                    <span v-else>登&nbsp;录&nbsp;中...</span>
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'

const { proxy } = getCurrentInstance()
const router = useRouter()
const userStore = useUserStore()
const isShowPassword = ref<boolean>(false)
const loading = ref<boolean>(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456',
  rememberMe: false,
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

const loginRules = {
  username: { required: true, validator: usernameValidate },
  password: { required: true, validator: passwordValidate },
}

const togglePasswordShow = () => {
  isShowPassword.value = !isShowPassword.value
}

function handleLogin() {
  loading.value = true
  userStore
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
</script>

<style lang="scss" scoped>
$screen-max: 1100px;

.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (max-width: $screen-max) {
    background: #293146;

    .form {
      border-radius: 8px;
      padding: 20px;
      background: #fff;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 50%;
    height: 100%;
    background-image: url(../../assets/svg/login-bg.svg);
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;

    @media (max-width: $screen-max) {
      display: none;
    }
  }

  .main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 80%;
    height: 100%;
    padding: 16px;
  }

  .left,
  .right {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .right {
    justify-content: center;
  }

  .left {
    @media (max-width: $screen-max) {
      flex: 0;

      .logo-container {
        font-size: 16px;
      }

      .main-png {
        display: none;
      }
    }
  }
}

.logo-container {
  position: fixed;
  top: 2%;
  right: 2%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  line-height: normal;

  .logo {
    width: 440px;
    height: 65px;
    margin-left: -12px;
  }
}

.main-png {
  color: #fff;
  font-size: 1.6rem;

  .img {
    width: 400px;
  }
}

.form {
  width: 60%;
  min-width: 400px;

  .form-title {
    font-weight: 700;
    font-size: xx-large;
    margin: 10px 0;
  }

  .el-input {
    :deep(.el-input__inner) {
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      border-radius: 0;
    }

    :deep(.el-input__suffix-inner) {
      align-items: center;
    }
  }

  .el-button {
    width: 100%;
    height: 42px;
    border-radius: 0;
    background: #0960bd;
    font-size: 1rem;
  }
}
</style>
