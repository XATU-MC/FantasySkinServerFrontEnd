<template>
  <el-container>
    <el-header class="my_el-header">
      <div class="my_header">
        <div class="left"><h1>测试前端</h1></div>
        <div class="right">
          <el-button type="primary" size="default" @click="showNewPwdDialog">修改密码</el-button>
          <el-button type="warning" size="default" @click="logout">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="180px">
        <el-menu
            default-active="/genera"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse-transition="false"
        >
          <el-menu-item v-for="page in pages" :index="page.link">
            <span slot="title">{{ page.name }}</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <div v-if="router.getRoutes().length <= 1">
          <el-header height="20vh"></el-header>
          <el-row justify="center">
            <el-card class="card" type="waring">
              <el-header height="14vh"></el-header>
              <el-row justify="center">
                <el-text type="danger" size="large">抱歉，您似乎没有权限操作任何页面</el-text>
              </el-row>
            </el-card>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <el-dialog
        :lock-scroll="false"
        :append-to-body="true" v-model="showNewPwdDialogFlag" title="修改密码" width="400px">
      <el-form label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="pwdForm.new_pwd" @input="confirm" show-password style="width: 300px"/>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="pwdForm.confirm_pwd" @input="confirm" show-password style="width: 300px"/>
          <el-text v-show="!confirmFlag" type="danger">两次输入的密码不一致</el-text>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="showNewPwdDialogFlag = false">取消</el-button>
        <el-button :disabled="!confirmFlag||pwdForm.confirm_pwd==''||pwdForm.new_pwd==''" type="primary"
                   @click="newPwd">确定
        </el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script setup lang="ts">
import router, {goToLogin} from "@/router";
import {ref} from "vue";
import {getAvailablePages} from "@/handler/PageHandler"

const pages = getAvailablePages();

if (router.getRoutes().length > 1 && router.currentRoute.value.path == '/') router.push(router.getRoutes()[1].path)

function logout() {
  goToLogin();
}

let showNewPwdDialogFlag = ref(false);
let pwdForm = ref({
  new_pwd: ref(''),
  confirm_pwd: ref('')
});

let confirmFlag = ref(true)

function confirm() {
  confirmFlag.value = pwdForm.value.new_pwd == pwdForm.value.confirm_pwd
}

function showNewPwdDialog() {
  showNewPwdDialogFlag.value = true;
}

function newPwd() {
  showNewPwdDialogFlag.value = false;
}
</script>


<style scoped lang="scss">
.my_el-header {
  color: #fff;
  background-color: #545c64 !important;
}

.el-aside {
  height: 100vh;
}

.my_header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.el-menu {
  border: none;
  overflow: hidden;
  height: 100%;
}

.my_toggleable {
  text-align: center;
  letter-spacing: 6px;
  height: 30px;
  line-height: 30px;
  color: #fff;
}

.card {
  width: 300px;
  height: 260px;
  background: rgba(224, 33, 33, 0.2);
  backdrop-filter: blur(3vh);
}
</style>
