





<template><!--登录注册 组件-->
  <main id="page-bg"> <!-- 整体背景，为一张图片 -->
    <h1 class="page-title">云笔记系统</h1>
    <div class="form">
      <form id="loginForm">
        <input type="text" name="userEmail" placeholder="电子邮箱" autofocus="autofocus" /><br /><br />
        <input type="password" name="userPwd" placeholder="登录密码" /><br /><br />
        <span style="font-size:20px">验证码：</span>
        <input type="text" name="checkCode" style="width:80px;height:30px;font-size:20px" />
        <img src="${pageContext.request.contextPath}/checkCodeImg" id="checkCodeImg"
          onclick="changeCheckCode()" /><br /><br />
        <input type="submit" value="登录" onclick="return login()" /><br /><br />
        <a href="${pageContext.request.contextPath}/register">注册账号</a>
        <a href="${pageContext.request.contextPath}/goChangeUserPwd?msg=getBack">找回密码</a>
      </form>
    </div>
  </main>
  
</template>

<script setup>
const msg = "${param.msg}";
//初始化
function onload() {
  //修改地址栏里的地址
  history.pushState(null, null, "${pageContext.request.contextPath}/login");
  if (msg == "loggedElseWhere") alert("该账户已在别处登录！");
  else if (msg == "userInfoError") alert("账户登录已过期！");
}
//更换验证码
function changeCheckCode() {
  //清空验证码输入框
  $("[name='checkCode']").val("");
  //刷新验证码
  $("#checkCodeImg")[0].src = "${pageContext.request.contextPath}/checkCodeImg?" + new Date();
  //使验证码输入框获得焦点
  $("[name='checkCode']").focus();
}
//登录
function login() {
  if (!checkForm()) return false;
  $.ajax(
    {
      url: "${pageContext.request.contextPath}/userLogin",
      type: "post",
      data: $("#loginForm").serialize(),
      dataType: "text",
      success: function (data) {
        if (data == "infoError") {
          alert("登录信息填写不符合要求！");
        }
        else if (data == "checkCodeError") {
          alert("验证码错误！");
          changeCheckCode();
        }
        else if (data == "userInfoError") {
          alert("电子邮箱或密码错误！");
          changeCheckCode();
          //清空密码框
          $("[name='userPwd']").val("");
          //使密码框获得焦点
          $("[name='userPwd']").focus();
        }
        else if (data == "LoginFailed") {
          alert("登录失败，请稍后重试！")
          //清空密码框
          $("[name='userPwd']").val("");
          //使密码框获得焦点
          $("[name='userPwd']").focus();
        }
        else if (data == "success") location.href = "${pageContext.request.contextPath}/index";
      }
    });
  return false;
}
//判断输入的信息是否符合要求
function checkForm() {
  var value = $("[name='userEmail']").val();
  if (!isEmpty(value, "电子邮箱")) return false;
  //验证电子邮箱格式的正则表达式
  var regex = /^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,4}$/;
  if (!regex.test(value)) {
    alert("电子邮箱格式不合法");
    return false;
  }
  value = $("[name='userPwd']").val();
  if (!isEmpty(value, "密码")) return false;
  value = $("[name='checkCode']").val();
  if (!isEmpty(value, "验证码")) return false;
  return true;
}
//判断输入的信息是否为空，参数msg表示当输入的信息为空时弹出的提示信息
function isEmpty(value, msg) {
  if (value == "") {
    alert("请输入" + msg + "！");
    return false;
  }
  return true;
}
</script>
<style lang="less" scoped>
@import (inline) "../assets/google-fonts.css";

#page-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: url(../../public/evernote-bg.jpg) center no-repeat rgba(0, 0, 0, 0.7);
  background-size: cover;

  .page-title {
    font: 1000 50px 'ZhiMangXing-Regular', cursive;
    color: rgba(250, 250, 250, 0.9);
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .formLogin{
    position: inherit;
  }
}
</style>
<template>
  <div class="formLogin">
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-col :span="24">
          <el-row>
            <el-col :span="13">
              <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="formData.userEmail" placeholder="abcd@efg.com" clearable
                  :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="密码" prop="userPwd">
                <el-input v-model="formData.userPwd" placeholder="请输入密码" clearable show-password
                  :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="验证码" prop="checkcode">
                <el-input v-model="formData.checkcode" placeholder="请输入验证码" clearable
                  :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-form-item label="" prop="login">
            <el-button type="primary" icon="el-icon-user-solid" size="medium" @click="return login()"> 登陆 </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="" prop="register">
            <el-button type="primary" icon="el-icon-user" size="medium"> 注册 </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="" prop="getBack">
            <el-button type="info" icon="el-icon-question" size="medium"> 忘记密码了？点此找回 </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        userEmail: undefined,
        userPwd: undefined,
        checkcode: undefined,
        login: undefined,
        register: undefined,
        getBack: undefined,
      },
      rules: {
        userEmail: [{
          required: true,
          message: 'abcd@efg.com',
          trigger: 'blur'
        }],
        userPwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        checkcode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>

