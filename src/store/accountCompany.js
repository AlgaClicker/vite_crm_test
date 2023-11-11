import { instance, api } from '@/modules/webclient.js'

const state = {
    account: {
        id:null,
        username: null
    },
    accounts: []

};
const getters = {
    getAccountsCompany: state => state.accounts
};

const actions = {
    async getAccount({commit},id) {
        let requestData = {
            id: id 
        }
        await instance.post('api/v1/crm/account/', requestData).then((response) => {
            let data = response.data.data
            console.log(data)
        })
    },
    async loadAccountsCompnay({commit}) {
        let accountList = await api('crm/account/','all',{});
        //console.log('loadAccountsCompnay |',accountList)
        commit('setAccountsList', accountList)
    }

};

const mutations = {
    setAccountsList(state, list) {
        state.accounts = list
    }
};
export default {
  state,
  getters,
  actions,
  mutations
};