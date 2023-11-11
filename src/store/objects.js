import { instance } from '@/modules/webclient.js'

const state = {
    object: {},
    objectsList: [],
    company_id: null,
    account_id: null,
    specificationsList: [],
    
};
const getters = {
  getObjectsList: state  => state.objectsList, 
  getSpecificationsList: state  => state.specificationsList, 
};

const actions = {
  async listObjects({commit}) {
    console.log("objects-store: getListObjects")
    let dataSend = ""
    await instance.post('/api/v1/crm/objects', dataSend).then((response) => {
      let data = response.data
      commit('setListObjects',data)
      console.log("setListObjects",data)
    })
  },
  async getSpecifications({commit},id) {
    await commit("specificationGetListActions",id)
    await commit("setSpecifications",this.getters.specificationListGetter)
    return this.getters.specificationListGetter
  }
};


const mutations = {
  setListObjects(state,objects) {
    console.log("objects-store: setListObjects")
    state.objectsList = objects
  },

  setSpecifications(state,specifications) {
    state.specificationsList = specifications
  }

};
export default {
  state,
  getters,
  actions,
  mutations
};