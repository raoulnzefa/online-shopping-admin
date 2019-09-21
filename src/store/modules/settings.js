import { collapsed } from "../../settings";
const state = {
  sidebar: {
    collapsed: collapsed
  }
};

const getters = {
  sidebar: state => state.sidebar
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.collapsed = !state.sidebar.collapsed;
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
