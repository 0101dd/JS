<template lang="pug">
v-card
  div(style='height: 500px; overflow-y: scroll;')
    .d-flex.my-2.justify-center
      v-btn(outlined @click='fetchOld' :disabled='fetchingOld' v-if='!fetchOldest') 載入更多
    .d-flex.my-2.align-center(v-for='message in messages' :key='message._id' :class='{ "flex-row-reverse": isMe(message.sender) }')
      v-avatar.mx-2(:color='isMe(message.sender) ? "blue darken-1" : "grey darken-1"')
        v-img(:src='"https://source.boringavatars.com/beam/120/" + message.sender')
      v-tooltip(top)
        template(v-slot:activator="{ on, attrs }")
          v-chip(v-bind="attrs" v-on="on" :color='isMe(message.sender) ? "blue darken-1" : "grey darken-1"') {{ message.text }}
        span {{ new Date(message.date).toLocaleString() }}
  v-card-actions
    v-text-field(outlined v-model='text' append-outer-icon='mdi-send' @click:append-outer='sendMessage' @keydown.enter='sendMessage')
</template>

<script>
export default {
  data () {
    return {
      text: '',
      sending: false,
      messages: [],
      timer: 0,
      fetchingOld: false,
      fetchOldest: false
    }
  },
  props: {
    member: {
      type: Object,
      default () {
        return {
          account: '',
          _id: ''
        }
      }
    }
  },
  methods: {
    isMe (id) {
      return id === this.user._id
    },
    async sendMessage () {
      if (this.sending || this.text.length === 0 || this.member._id.length === 0) return
      this.sending = true
      try {
        const { data } = await this.api.post(`/chats/members/${this.member._id}/messages`, { text: this.text }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.messages.push(data.result)
      } catch (error) {
        console.log(error)
      }
      this.sending = false
      this.text = ''
    },
    async fetchNew () {
      try {
        const date = this.messages[this.messages.length - 1]?.date || ''
        const { data } = await this.api.get(`/chats/members/${this.member._id}?gt=${date}`, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        if (data.result.length > 0) {
          this.messages.push(...data.result)
          Notification.requestPermission((permission) => {
            if (permission === 'granted') {
              const notification = new Notification('聊天室有新訊息', {
                body: `${this.member.account} 傳了 ${data.result.length} 個新訊息`,
                icon: 'https://cdn-icons.flaticon.com/png/512/2174/premium/2174653.png?token=exp=1643011533~hmac=4335fea76a9682e849c03394a9c0667e'
              })
              notification.onclick = () => {}
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchOld () {
      if (this.fetchingOld) return
      this.fetchingOld = true
      try {
        const date = this.messages[0]?.date || ''
        const { data } = await this.api.get(`/chats/members/${this.member._id}?lt=${date}`, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        if (data.result.length === 0) {
          this.fetchOldest = true
        } else {
          this.messages.unshift(...data.result.reverse())
        }
      } catch (error) {
        console.log(error)
      }
      this.fetchingOld = false
    }
  },
  async created () {
    if (this.member._id.length === 0) return
    try {
      const { data } = await this.api.get('/chats/members/' + this.member._id, {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      if (data.result.length === 0) {
        this.fetchOldest = true
      } else {
        this.messages = data.result
      }
      this.timer = setInterval(this.fetchNew, 3000)
    } catch (error) {
      console.log(error)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
