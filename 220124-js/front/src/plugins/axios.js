import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API
})

Vue.use(VueAxios, { axios, api })
