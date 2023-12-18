import { instance,api } from '@/modules/webclient.js'
import { isProxy, toRaw, toRef, ref, toValue } from 'vue';

const state = {
    data: {},
    account: {},

};
const getters = {
    getReportData: state => state.data
};

const actions = {
     async getReportAccountLogs({commit},accounts) {
        let dataRequest = {
          accounts: accounts
        } 
        let data = await api("accounts/active","report",dataRequest);
        commit('setReportData',data)
        //commit('setReportAccount',data)
    }
};

const mutations = {
  setReportData(state,data) {
    console.log("setReportData",data)
    state.data = data
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};