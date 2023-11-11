<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '../components/TableComponent.vue';
</script>
<template>
    <TableComponent v-bind:table="tbComponent" :updateListData="initListobject" :deleteRecord="deleteRecord" :editRecord="editRecord" :addRecord="addRecord" v-bind:dataTable="dataTable" />
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
                        show: true,
                        label: "Наименование объекта",
                        input: false,
                        readonly: true,
                        type: "html",
                    },
                    name: {
                        label: "Наименование объекта",
                        show: false,
                        input: true,
                        readonly: false,

                    },
                    address: {
                        label: "Адрес объекта",
                        show: true,
                        input: true,
                        readonly: false,
                    },

                }
            },
            
             
        }
    },
    mounted() {
        console.log("ListObjects.vue: mounted")
        store.dispatch('listObjects')
        console.log(this.dataTable1)
        //this.initListobject

    },
    computed: {
        ...mapGetters({
            dataTable: 'getObjectsList',
            spec: 'specificationGetter',
            specificationList: 'specificationListGetter',
        }),

        
    },
    methods: {
        ...mapActions({
            initListobject: 'listObjects',
            getMe: 'getMe',
            specificationGetList: "specificationGetListActions",
            addObject: "addObject",
            updateObject: "updateObject",
            deleteObject:"deleteObject"
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