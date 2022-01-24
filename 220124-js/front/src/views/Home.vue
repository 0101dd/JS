<template lang="pug">
v-container
  v-row
    v-col(cols='12' v-if='!user.isLogin')
      .text-h4.text-center 請先登入
    v-col(cols='4' v-if='user.isLogin')
      v-card
        v-list
          v-list-item-group(v-model='selected')
            v-list-item(v-for='user in users' :key='user._id')
              v-list-item-content {{ user.account }}
    v-col(cols='8' v-if='user.isLogin')
      .text-h4.text-center(v-if='selected === undefined') 請選擇使用者
      Chat(v-else :member='users[selected]' :key='selected')
</template>

<script>
import Chat from '../components/Chat.vue'

export default {
  components: {
    Chat
  },
  data () {
    return {
      selected: undefined,
      users: []
    }
  },
  async created () {
    if (!this.user.isLogin) return
    try {
      const { data } = await this.api.get('/users', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.users = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得使用者失敗'
      })
    }
  }
}
</script>
