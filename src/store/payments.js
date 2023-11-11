import { api  } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
    brigadePayList: [],

};
const getters = {
    getBrigadePaysList: (state) => state.brigadePayList
};

const actions = {
    async loadBrigadePayList({commit}) {
        let dataSend = {
          options: this.getters.getParnterOptions
        }
        let data =  await api('crm/payments/brigade/','post', dataSend)
        commit('setBrigadePayList',data.data)
        this.commit('setPagginate',data.options.pagginate)
    },
    async createBrigadePay({commit}, data) {
        await api('crm/payments/brigade/add/','create', data)
        this.dispatch('loadBrigadePayList')
        
    }
};

const mutations = {
    setBrigadePayList(state,list) {
        state.brigadePayList = list
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};