<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '../components/TableComponent.vue';
</script>
<template>
    <div>
       
        <TableComponent v-bind:table="tbComponent" :updateListData="initListobject" :deleteRecord="deleteRecord" :editRecord="editRecord" :addRecord="addRecord" v-bind:dataTable="dataTable" />
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions  } from 'vuex'
import store from '../store'
import router from '../router';
import { RouterLink } from 'vue-router';

export default {
    data ()  {
        return {
            specification: {
                    object_id: '',
            },
            tbComponent: {
                header: {
                    title: "Объекты",
                },
                cols: {
                    id: {
                        show: false,
                        label: "id",
                        readonly: true,
                    },

                    name: {
                        label: "Наименование объекта",
                        show: true,
                        input: true,
                        sort: true,
                        readonly: false,
                        type: "text",
                        filter: true,
                    },
                    address: {
                        label: "Адрес объекта",
                        show: true,
                        sort: true,
                        input: true,
                        readonly: false,
                        filter: true,
                    },
                    responsibles: {
                        label: "responsibles",
                        show: true,
                        filter: false,
                        sort: false,
                        type: "multiselect",
                        trackBy: "id",
                        labelColName: "username",
                        dataList: this.getAccountsCompany,
                        input: true,
                        
                    },

                }
            },
            
             
        }
    },
    created() {
        store.dispatch('clearFilterReq')
    },
    mounted() {
        console.log("ListObjects.vue: mounted")
        
        store.dispatch('listObjects')

        console.log(this.dataTable1)
        //this.initListobject
        this.tbComponent.cols.responsibles.dataList = this.getAccountsCompany

    },
    computed: {
        ...mapGetters({
            dataTable: 'getObjectsList',
            spec: 'specificationGetter',
            specificationList: 'specificationListGetter',
            getAccountsCompany: 'getAccountsCompany'
        }),

        
    },
    methods: {
        ...mapActions({
            initListobject: 'listObjects',
            getMe: 'getMe',
            
            specificationGetList: "specificationGetListActions",
            addObject: "addObject",
            updateObject: "updateObject",
            deleteObject:"deleteObject",
            
        }),
        deleteRecord(id) {
            this.deleteObject(id.id)
        },
        editRecord(record) {
            this.updateObject(record)
            
        },
        addRecord(record) {
           this.addObject(record)
        },
        objectOpen(e) {
            console.log(e)
        }
    }
    
}
</script>