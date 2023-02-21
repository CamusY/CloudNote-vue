<script setup>
  import {Avatar} from '@element-plus/icons-vue'
  
  const user = useUser()
  user.checkLogin() // 下面的东西第一次不执行，补上，否则会显示未登录
  // 必须外面再嵌套一层
  setInterval(function () {user.checkLogin()}, 120000)
</script>


<template>
    <div class="avatar" :title="`用户名：`+`${user.userName}`">
      <Avatar class="userIcon"/>
      <span class="userName">{{ user.userName }}</span>
    </div>
  </template>
  
  
  
  <style scoped lang="less">
  .avatar {
    width: 100%;
    margin: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  
    .userIcon {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  
    .userName {
      width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
      font-size: 18px;
    }
  }
  </style>