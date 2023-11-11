import { instance, api } from '@/modules/webclient.js'

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
    let data =  await api('crm/objects/', 'post',dataSend)
    console.log("setListObjects",data.data)  
    commit('setListObjects',data.data)
      
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