export const selectIdentityAction = function (
  {commit, dispatch},
  selectedIdentity
) {
  dispatch('routerTo', 'view')
  commit('setSelectedIdentity', selectedIdentity)
}
