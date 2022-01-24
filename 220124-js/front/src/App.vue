<template lang="pug">
v-app
  v-app-bar(app color='primary' dark)
    v-toolbar-title 聊天室
    v-spacer
    v-btn(text to='/login' v-if='!user.isLogin') 登入
    v-btn(text to='/register' v-if='!user.isLogin') 註冊
    span(v-else) {{ user.account }}
  v-main
    router-view
</template>
