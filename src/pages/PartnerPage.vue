<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '../components/TableComponent.vue';
</script>

<template>
    Partner
    <TableComponent v-bind:table="tbComponent" :updateListData="loadPartnerList" :deleteRecord="deleteRecord" :editRecord="editRecord" :addRecord="addRecord" :dataTable="dataTable" />
</template>
<script>
import router from '../router';
import store from '../store';
import { mapGetters, mapState, mapActions  } from 'vuex'

export default {
    data() {
        return {
            objectId: "",
            tbComponent: {
                header: {
                    title: "Список организаций ",
                },
                cols: {
                    id: {
                        label: "uuid",
                        show: false,
                        input: false
                    },
                    
                    name: {
                        label: "Название организации",
                        sort: true,
                        input: true,
                        
                    },
                    inn: {
                        label: "ИНН",
                        sort: true,
                        input: true,
                        show: true,
                        
                    },
                    address: {
                        label: "Адрес",
                        sort: true,
                        input: true,
                        show: true,
                        
                    },

                },
            }
        }
    },
    mounted() {
        this.loadPartnerList()
    },
    computed: {
        ...mapGetters({
            dataTable: 'getPartnerList',
            spec: 'specificationGetter',
            specificationList: 'specificationListGetter',
            getPagginate: "getPagginate"
        }),
        

        
    },
    methods: {
        ...mapActions({
            loadPartnerList: 'loadPartnerList',
            getMe: 'getMe',
            addObject: "addObject",
            updateObject: "updateObject",
            deleteObject:"deleteObject"
        }),
        updateListData: () => {},
        deleteRecord: (data) => {
            
            store.dispatch("deletePartner",data.id)
        },
        editRecord: (data) => {
            store.dispatch("updatePartner",data)
        },
        addRecord: (data) => {
            store.dispatch("newPartner",data)
        }
    }
}
</script>