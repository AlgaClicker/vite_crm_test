<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '@/components/TableComponent.vue';
</script>
<template>
    
    
    <TableComponent v-bind:table="tbComponent" :updateListData="updateListData" :deleteRecord="deleteRecord" options="" :editRecord="editRecord" :addRecord="addRecord" v-bind:dataTable="dataTable" />
</template>
<script>
import store from '@/store';
import { mapGetters, mapState, mapActions  } from 'vuex'
import { toRaw, toValue,ref } from 'vue';
export default {
     data() {
        return {
            tbComponent: {
                header: {
                    title: "Оплата бригадам",
                },
                cols: {
                    id: {
                        label: "айди",
                        show: false,
                        input: false,
                        readonly: true,
                    },

                    type: {
                        label: "выплата",
                        show: true,
                        sort: true,
                        input: true,
                        filter: true,
                        type: "select",
                        trackBy: "type",
                        labelColName: "name",
                        dataList: [
                            {name:"Выплата",type:"salary"},
                            {name:"Аванс",type: "advance"},
                            {name:"Прочая оплата",type:"other"},
                        ],
                        value: function(data) {
                                return data

                        }
                    },
                   
                    brigade: {
                        label: "Бригада",
                        show: true,
                        input: true,
                        readonly: true,
                        type: "select",
                        dataList: store.getters.getBrigadeList,
                        trackBy: "id",
                        labelColName: "name",
                        value: function(data) {
                            return data.name + " ("+ data.master.username+")"
                        }
                    },
                    date: {
                        label: "месяц",
                        show: true,  
                        sort: true,  
                        input: true,
                        filter: true,
                        type: "dateMon",
                        value: function(data) {
                            
                            var date = new Date(data)
                            //date = date.toISOString()
                            var month = date.getMonth() + 1
                            return month+"/"+ date.getUTCFullYear()
                        }            
                    },

                    amount: {
                        label: "Сумма выплаты",
                        show: true,
                        sort: true,
                        input: true,
                        readonly: true,
                        filter: true
                    },

                    created_at: {
                        label: "Создан",
                        show: true,   
                        sort: true, 
                        input: false,
                        value: function(data) {
                            var date = new Date(data)
                            return date.toLocaleDateString()
                        }                         
                    }


                }
            }
        }
     },
     mounted() {
        this.loadBrigadePayList()
        this.loadBrigadeList()
        console.log('getBrigadeList',this.getBrigadeList)
     },
     computed: {
        ...mapGetters({
            dataTable:"getBrigadePaysList",
            getBrigadeList:"getBrigadeList"
        })
     },
     methods: {
        ...mapActions({
            loadBrigadePayList: "loadBrigadePayList",
            loadBrigadeList:"loadBrigadeList",
            createBrigadePay:"createBrigadePay"
        }),
        updateListData() {
            this.loadBrigadePayList()

        },
        deleteRecord(data) {

        },
        editRecord(data) {

        },
        addRecord(data) {
            let newData = {
                type: data.type.type,
                amount: data.amount,
                brigade: data.brigade.id,
                date: data.date.year+'-'+data.date.month+'-15'
            }
            this.createBrigadePay(newData)
        }
     }

}
</script>