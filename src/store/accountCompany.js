import { instance } from '@/modules/webclient.js'

const state = {
    account: {
        id:null,
        username: null
    },

};
const getters = {

};

const actions = {
    async getAccount(id) {
        let requestData = {
            id: id 
        }
        await instance.post('api/v1/crm/account/', requestData).then((response) => {
            let data = response.data.data
            console.log(data)
            // commit('setToken', data.token)
           // commit('setCompany', data.company)
           // commit('setAccount', data.account)
        })
    }
};

const mutations = {

};
export default {
  state,
  getters,
  actions,
  mutations
};