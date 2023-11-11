import { instance } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
    parnterList: [],
    parnter: '',
    options: {
      pagginate: {
        pages: 1,
        page: 1,
      },
      orderBy: {}
    }

};
const getters = {
  getPartnerList: (state) => state.parnterList,
  getPartner: (state) => state.parnter,
  getPartnerOptions: (state) => state.options,
};

const actions = {
    async loadPartnerList({commit}) {
      let dataSend = {
        options: this.getters.getParnterOptions
      }
      await instance.post('/api/v1/directory/partner/', dataSend).then((response) => {
        let data = response.data
        commit('setParnterOptions',data.options)
        commit('setParnterList',data.data)
        
      })
    }
};

const mutations = {
  setParnterList(state, list) {
    state.parnterList = list
  },

  setParnter(state, parnter) {
    state.parnter = parnter
  },

  setParnterOptions(state, options) {
    state.options = options
  },


};

export default {
  state,
  getters,
  actions,
  mutations
};