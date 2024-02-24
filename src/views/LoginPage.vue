<template>
  <div class="login">
    <el-header height="100vh"></el-header>
    <el-row justify="center">
      <el-card class="card" @keyup.enter="login">
        <el-header height="5vh">
          <el-row justify="center">
            <el-text size="large">登录</el-text>
          </el-row>
        </el-header>
        <el-form model="loginForm" label-position="right" label-width="60px">
          <el-form-item label="账号">
            <el-input v-model="loginForm.username" style="width: 170px"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" show-password style="width: 170px"/>
          </el-form-item>
        </el-form>
        <el-footer height="5vh">
          <el-row justify="center">
            <el-button type="success" @click="login()">登录</el-button>
          </el-row>
        </el-footer>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";

const loginForm: Ref<{ username: number, password: string }> = ref({
  username: ref(),
  password: ref()
});

function login() {
}
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  background: linear-gradient(to right, #c7d2fe, #fecaca, #fef9c3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 300px;
  height: 260px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3vh);
}
</style>
