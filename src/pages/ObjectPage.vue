<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '../components/TableComponent.vue';
</script>

<template>
    <h5>{{ nameObject}}</h5>
    <TableComponent v-bind:table="tbComponent" :updateListData="updateListData" :paggiante="getPagginate" :deleteRecord="deleteRecord" :editRecord="editRecord" :addRecord="addRecord" v-bind:dataTable="dataTable" />

</template>


<script>
import router from '../router';
import store from '../store';
import { mapGetters, mapState, mapActions  } from 'vuex'

export default {
    props: {
        id: String
    },
    data() {
        return {
            objectId: "",
            tbComponent: {
                header: {
                    title: "Список спецификаций ",
                },
                cols: {
                    id: {
                        label: "айди",
                        show: false,
                        input: false
                    },
                    
                    name: {
                        label: "Наименование спецификации",
                        sort: true,
                        input: true,
                        type: "text",
                        
                    },
                    responsibles: {
                        label: "Ответственные",
                        
                        type: "multiselect",
                        input: true,
                        dataList: this.getAccounts,
                        labelColName: "username",
                        value: function (data) {
                            //return data

                            let newList = data.map(el=>{
                                return {
                                    name:  el.username,
                                    username:  el.username,
                                    id:  el.id,
                                }
                            })
                            return newList
                            
                        }

                    },
                    description: {
                        label: "Описание",
                        sort: true,
                        input: true,
                        show: false,
                        
                    },


                },
            }
        }
    },
    mounted() {
        this.readObject(this.$route.params.id)
        console.log("mounted",this.$route.params.id)
        this.loadListSpecifications(this.$route.params.id)
        
        this.tbComponent.cols.responsibles.dataList = this.getAccounts

        //console.log("getAccounts",this.getAccounts)
        
    },
    created() {
        this.objectId = this.$route.params.id
        store.dispatch("getAccountsList")
        
    },
    computed: {
        ...mapGetters({
            dataTable: "getListSpecification",
            getMasterList: "getMasterList",
            getObject: "getObject",
            getPagginate: "getPagginate"
            
        }),
        getAccounts: () => store.getters.getAccounts,
        nameObject() {
            if (this.getObject) {
                this.tbComponent.header.title = "Cпецификации по бъекту \""+this.getObject.name+"\""
            }
            //
            
        }

    },
    methods: {
        ...mapActions({
            getAccountsRole: "getAccountsRole",
            readObject: "readObject",
            loadListSpecifications: "loadListSpecifications",
        }),
        updateListData() {
            this.loadListSpecifications(this.$route.params.id)
        },
        listAccounts(){
            return this.getAccounts
        },
        deleteRecord(data) {
            
           store.dispatch("deleteSpecifications",data)
        },
        editRecord(data) {
            let dataNew = {
                id: data.id,
                objectId: this.getObject.id,
                name: data.name,
                description: data.description,
                responsibles: data.responsibles

            }
            store.dispatch("updateSpecifications",dataNew)
            this.loadListSpecifications(this.$route.params.id)
        },

        addRecord(data) {
            console.log("addRecord",this.getObject)
            let dataNew = {
                
                objectId: this.getObject.id,
                name: data.name,
                description: data.description,
                responsibles: data.responsibles

            }
            //console.log("addRecord",dataNew)
            store.dispatch("createSpecifications",dataNew)
        }
    },
}
</script>