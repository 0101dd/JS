import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, name: '白玉歐蕾', price: 60, image: 'https://d1ralsognjng37.cloudfront.net/767546d7-e2ba-4f79-b11a-d3da64a1e0e2.jpeg' },
      { id: 2, name: '胭脂紅茶', price: 45, image: 'https://d1ralsognjng37.cloudfront.net/99e3e994-2be8-48c7-b053-6c7397303ea3.jpeg' },
      { id: 3, name: '麗春紅茶', price: 35, image: 'https://d1ralsognjng37.cloudfront.net/3cdbb722-db4f-40ca-9685-a0f58973be55.jpeg' },
      { id: 4, name: '春梅冰茶', price: 45, image: 'https://d1ralsognjng37.cloudfront.net/e2700522-53af-4ec2-aed9-5fdfa68c802a.jpeg' },
      { id: 5, name: '熟成歐蕾', price: 50, image: 'https://d1ralsognjng37.cloudfront.net/2b8e503b-7867-43d6-9dba-1bf2657addd5.jpeg' },
      { id: 6, name: '紅寶歐酪', price: 75, image: 'https://d1ralsognjng37.cloudfront.net/afc95173-dc87-4915-9f01-d7d9a1eb4110.jpeg' }
    ],
    cart: []
  },
  mutations: {
    addCart (state, data) {
      // 找購物車裡有沒有這個商品
      const idx = state.cart.findIndex(product => {
        return product.id === data
      })
      if (idx > -1) {
        // 有的話數量 + 1
        state.cart[idx].count++
      } else {
        // 沒有的話，用 id 找出該商品的資料後 push 進購物車
        const pidx = state.products.findIndex(product => {
          return product.id === data
        })
        state.cart.push({ ...state.products[pidx], count: 1 })
      }
    },
    delCart (state, data) {
      const idx = state.cart.findIndex(product => {
        return product.id === data
      })
      state.cart.splice(idx, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      // localStorage 的 key，不設的話是 vuex
      key: 'shop-practice',
      // 指定只保存 state 裡的哪個資料
      paths: ['cart']
    })
  ]
})
