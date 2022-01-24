<template lang="pug">
v-container
  v-row
    v-col.text-center(cols='12')
      .text-h4 註冊
      v-form(v-model='valid' @submit.prevent='register' ref='form')
        v-text-field(v-model='form.account' label='帳號' required :rules='inputRules')
        v-text-field(v-model='form.password' label='密碼' required type='password' :rules='inputRules')
        v-btn(color='success' type='submit') 註冊
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      form: {
        account: '',
        password: ''
      },
      inputRules: [
        v => !!v || '必填'
      ]
    }
  },
  methods: {
    async register () {
      const valid = this.$refs.form.validate()
      if (!valid) return
      try {
        await this.api.post('/users', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '註冊失敗'
        })
      }
    }
  }
}
</script>
