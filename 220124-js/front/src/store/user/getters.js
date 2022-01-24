export const user = (state) => {
  return { ...state, isLogin: state.token.length > 0 }
}
