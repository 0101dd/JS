export const login = (state, data) => {
  state.account = data.account
  state.token = data.token
  state._id = data._id
}
