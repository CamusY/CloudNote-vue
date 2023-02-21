<template>
  <router-view />
</template>

<style lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #bbb;
  font-size: 14px;

  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #575B61;
    border-radius: 3px;
  }
}

body {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}

a {
  text-decoration: none;
  color: #444;
}

ul,
li {
  list-style: none;
}

@import "assets/v-md-editor";
@import "assets/message-box";
@import "assets/el-drawer";
</style>

<script>
export default {
  name: 'App',

  data: () => ({
    // 控制导航侧栏的显示和隐藏
    drawer: true
  }),
  methods: {
    // 通过视图的名字跳转到特定视图，一般用作主页，登录页，注册页等
    open (login) {
      // 需要先判断当前路由名称是否和目标路由一致，如果一致就不跳转
      if (this.$route.name !== login) {
        this.$router.push({
          name: login
        })
      }
    }
  }
}
</script>