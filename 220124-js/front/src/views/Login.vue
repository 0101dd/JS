<template lang="pug">
v-container
  v-row
    v-col.text-center(cols='12')
      .text-h4 登入
      v-form(v-model='valid' @submit.prevent='login' ref='form')
        v-text-field(v-model='form.account' label='帳號' required :rules='inputRules')
        v-text-field(v-model='form.password' label='密碼' required type='password' :rules='inputRules')
        v-btn(color='success' type='submit') 登入
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
    login () {
      const valid = this.$refs.form.validate()
      if (!valid) return
      this.$store.dispatch('user/login', this.form)
    }
  }
}
</script>
