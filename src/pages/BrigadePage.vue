<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '../components/TableComponent.vue';
</script>
<template>

<TableComponent v-bind:table="tbComponent" paggiante="getPagginate" :deleteRecord="deleteRecord" :editRecord="editRecord" :addRecord="addRecord" v-bind:dataTable="dataTable" />

</template>

<script>
import store from '../store';
import { mapGetters, mapState, mapActions  } from 'vuex'
import { toRaw, toValue,ref } from 'vue';

export default {
     data() {
        return {
            isNewRecord: false,
            isEditRecord: false,
            tbComponent: {
                header: {
                    title: "Список бригад",
                },
                cols: {
                    id: {
                        label: "айди",
                        show: false,
                        input: false
                    },
                    
                    name: {
                        label: "Наименование бригады",
                        sort: true,
                        input: true,
                        
                    },

                    master: {
                        label: "Мастер",
                        input: true,
                        type: "select",
                        trackBy: "id",
                        dataList: this.getMasterList,
                        labelColName: "username",
                        value: (data) =>  {
                            if (data) {
                                return data.username
                            } else {
                                return "нет"
                            }
                        }
                    },

                    workpeoples: {
                        label: "Работники",
                        input: false,
                        value: (data) => {
                            //console.log(data)
                            return data ? data.length : ''
                        }
                    }
                },
            }
        }
    },
    computed: {
        ...mapGetters({
            dataTable: "getBrigadeList",
            getMasterList: "getMasterList",
            getPagginate:"getPagginate"
        }),
    },
    mounted() {
        
        //loadMastersList
        store.dispatch("loadMastersList")

        //this.loadMastersList()
        this.loadBrigade()
        this.tbComponent.cols.master.dataList = this.getMasterList
        console.log("BrigadePage",this.getMasterList)
    },
    methods: {
        ...mapActions({
            loadBrigade: "loadBrigadeList",
            getAccountsRole: "getAccountsRole",
            loadMastersList:"loadMastersList",
            newBrigade: "newBrigade",
            editBrigade: "editBrigade"

            
        }),
        masterList() {
            return this.getMasterList
        },
        deleteRecord(data) {
            store.dispatch("deleteBrigade",data.id)
        },
        addRecord(data) {

         let dataSend = {
            name: data.name,
            master: data.master ? data.master.id : null
         }

          console.log("data:",dataSend)
          this.newBrigade(dataSend)
          
        },
        editRecord(data) {
            let dataSend = {
            id: data.id,
            name: data.name,
            master: data.master ? data.master.id : null,
            workpeople: data.workpeople ? data.workpeople : ''
         }
            store.dispatch('editBrigade',dataSend)
            //this.editBrigade(dataSend)
        }
    }
    
}
</script>