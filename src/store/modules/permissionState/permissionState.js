export default {
  state() {
    return {
      permissionState: null,
    };
  },
  mutations: {
    SET_TO_PERMISSION_STATE(state, permissions) {
      state.permissionState = permissions;
    },
  },
  getters: {
    GET_PERMISSION_STATE: (state) => {
      return state.permissionState;
    },
  },
};
