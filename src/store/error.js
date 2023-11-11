import { instance } from '@/modules/webclient.js'

const state = {
    error: {
        status: false,
        message: ""
    },
    object: null,
};

const getters = {
    getErrorStatus: state  => state.error.status, 
    getErrorMessage: state  => state.error.message, 
};

const actions = {
    setErrorMessage({commit},message) {
        commit("setError",message)
        console.log("setErrorMessage")
    },
    setErrorStatus({commit},status) {
        commit("setStatus",status)
    },
    clearError({commit}) {
        commit("clearError")
    }

};

const mutations = {
    clearError(state) {
        state.status = false
        state.message = ""
    },
    setError(state,message) {
        state.error.status = true
        state.error.message = message
    },
    setStatus(state,status) {
        state.error.status = status
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};