import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'

export const login = async ({ commit }, form) => {
  try {
    const { data } = await api.post('/users/login', form)
    commit('login', data.result)
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登入成功'
    })
    router.push('/')
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: '登入失敗'
    })
  }
}
