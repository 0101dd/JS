<template>
  <div id="app">
    <form @submit.prevent="add">
      <input type="text" v-model="form.account" placeholder="帳號">
      <input type="password" v-model="form.password" placeholder="密碼">
      <input type="number" v-model="form.age" placeholder="年齡">
      <input type="text" v-model="form.email" placeholder="信箱">
      <input type="submit">
    </form>
    <hr>
    <table border="1">
      <tr v-for="(user, idx) in users" :key="user._id">
        <td>{{ user.account }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.email }}</td>
        <td>
          <input type="button" value="編輯">
          <input type="button" value="刪除" @click="del(idx)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      users: [],
      form: {
        account: '',
        password: '',
        age: '',
        email: ''
      }
    }
  },
  methods: {
    async del (idx) {
      try {
        await this.axios.delete('/' + this.users[idx]._id)
        this.users.splice(idx, 1)
      } catch (error) {
        alert('刪除失敗')
      }
    },
    async add () {
      try {
        const { data } = await this.axios.post('/', this.form)
        this.users.push(data.result)
        this.form = {
          account: '',
          password: '',
          age: '',
          email: ''
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  },
  async created () {
    try {
      const { data } = await this.axios.get('/')
      this.users = data.result
    } catch (error) {
      console.log(error)
      alert('取得資料失敗')
    }
  }
}
</script>
