<template>
    index report
    <VueMultiselect v-model="accounts" :options="options" :multiple="true" :taggable="true" track-by="id" @select="selectedAccount" label="username"></VueMultiselect>
    
    <TableComponent v-bind:table="tbComponent" :updateListData="loadPartnerList" :deleteRecord="deleteRecord" :editRecord="editRecord" :addRecord="addRecord" :dataTable="getReportData" />

</template>


<script>

import TableComponent from '@/components/TableComponent.vue';
import VueMultiselect  from 'vue-multiselect'
import { toRaw,reactive,toValue } from 'vue';
import { mapGetters, mapState, mapActions  } from 'vuex'
import store from '@/store'

export default {
    components: {VueMultiselect,TableComponent},
    data() {
        return {
            accounts: [],
            options: [],
            dataTable: this.getReportData,
            tbComponent: {
                header: {
                    title: "Логи ",
                },
                cols: {
                    id: {
                        label: "uuid",
                        show: true,
                        input: false
                    },
                    created_at: {
                        label: "дата",
                        sort: true,
                        type: "text",
                        value: data => {
                            let dat = new Date(data);
                            return dat.toLocaleDateString()
                            return  dat.getDate()+"-"+(dat.getMonth()+1)+"-"+ dat.getFullYear() + "г."
                        }
                    },
                    entity: {
                        label: "сущность",
                        sort: true,
                        input: true,
                    },
                    autor: {
                        label: "Название организации",
                        sort: true,
                        input: true,
                    },
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            getAccountsCompany: "getAccountsCompany",
            getReportData: "getReportData"
        }),
         dataTable: async () => {
            return store.getters.getReportData
        }

    },
    methods: {
        ...mapActions({
            loadAccountsCompnay: "loadAccountsCompnay",
            
        }),
        selectedAccount() {
            store.dispatch("getReportAccountLogs",this.accounts)
            console.log("selectedAccount",this.accounts)
        },
        addRecord(data) {

        },
        editRecord(id) {

        },
        deleteRecord(id) {

        },
        loadPartnerList() {
            store.dispatch("getReportAccountLogs",this.accounts)
        },
        getData() {
                return store.getters.getReportData
        },

    },
    mounted() {
        this.loadAccountsCompnay()
        console.log("mounted getReportData()",toValue(this.getReportData))
        this.options = this.getAccountsCompany
    }
}
</script>