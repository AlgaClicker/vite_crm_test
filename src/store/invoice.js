import { instance } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
    invoiceList: [],
    invoice: '',
    options: {
      pagginate: {
        pages: 1,
        page: 1,
      },
      orderBy: {}
    }

};
const getters = {
    getInvoiceList: (state) => state.invoiceList,
    getInvoice: (state) => state.invoice,
    getOptionsInvoice: (state) => state.options
};

const actions = {
    async loadInvocesList({commit}) {
      let data = {
        options: this.getOptionsReques
      }
      await instance.post('/api/v1/crm/payments/invoice', data).then((response) => {
          console.log("loadInvocesList");
          console.log(response);
          commit('setInvoiceList',response.data.data);
          commit('setOptions',response.data.options);
      })
    },
    async createInvoice({commit},data) {
      await instance.post('/api/v1/crm/payments/invoice/add', data).then((response) => {
        console.log("loadInvocesList");
        console.log(response);
        
        commit('setInvoice',response.data.data);
        this.dispatch('loadInvocesList')
    })
    }

};

const mutations = {
    setInvoiceList:  (state,list) => {
      state.invoiceList = list
    },
    setInvoice:  (state,invoice) => {
      state.invoice = invoice
    },

    setOptions: (state,options) => {
      state.options = options
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};