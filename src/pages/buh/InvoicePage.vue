<script setup>
    
    import TableComponent from '@/components/TableComponent.vue';
</script>
<template>
    Поступления 
    <TableComponent 
        v-bind:table="tbComponent" 
        :options="getOptionsInvoice" 
        :updateListData="loadInvoicesList" 
        :deleteRecord="deleteRecord" 
        :editRecord="editRecord" 
        :addRecord="addRecordInv" 
        :dataTable="getInvoiceList" />
</template>

<script>
import { toRaw, toValue,ref } from 'vue';
import store from '@/store';
import { mapGetters, mapState, mapActions  } from 'vuex'

export default {
    data() {
        return {
            tbComponent: {
                header: {
                    title: "Платежи компании",
                },
                cols: {
                    id: {
                        label: "айди",
                        show: false,
                        input: false
                    },
                    date: {
                        label: "Дата",
                        type: "data",
                        sort: false,
                        show: true,
                        input: true,
                        value: function (data)  {
                            let date = new Date(data)

                            return date.toLocaleDateString()
                        }
                        
                    },   
                    description: {
                        label: "Коментарий",
                        sort: false,
                        show: true,
                        input: true,
                        
                    },
                    amount: {
                        label: "Сумма платежа",
                        sort: false,
                        input: true,
                        
                    },
                    type: {
                        label: "Тип платежа",
                        type: "select",
                        input: true,
                        trackBy: "type",
                        labelColName: "name",
                        dataList: [
                            {name:"Поступило",type:"in"},
                            {name:"Оплатили",type:"out"},
                        ],
                        value: function (data)  {
                                if (data.type=='in') {
                                    return "поступление"
                                } else {
                                    return "Оплата"
                                }
                        }
                    },
                    partner: {
                        label: "Компания",
                        input: true,
                        type: "select",
                        dataList: store.getters.getPartnerList,
                        labelColName: "name",
                        value: (data) =>  {
                            return data.name + ' ' + data.inn
                            if (data) {
                                return data.username
                            } else {
                                return "нет"
                            }
                        }
                    },  
                    specification: {
                        label: "Спецификация",
                        input: true,
                        type: "select",
                        dataList: store.getters.getActiveListSpecification,
                        labelColName: "name",
                        value: (data) =>  {
                            
                            if (data && data.hasOwnProperty('objectName')){
                                return data.objectName + " " + data.name
                            }
                            
                            if (data) {
                                return data.username
                            } else {
                                return "нет"
                            }
                        }
                    },                   
                }
            }
        }
    },
    mounted() {
        this.loadInvoicesList()
        this.loadPartnerList()
    },
    computed: {
        ...mapGetters(['getInvoiceList','getInvoice','getOptionsInvoice']),
        

    },
    methods: {
        ...mapActions({
            loadInvoicesList: "loadInvocesList",
            loadPartnerList: "loadPartnerList"
            
        }),
        getSpecStatus() {
            console.log("get_Spec")
        },
        editRecord(data) {
            let newData = {
                id: data.id,
                date: data.date,
                amount: data.amount,
                description: data.description,
                type: data.type,
                partner: data.partner.id,
                specification: data.specification ? data.specification.id : null

            }
            store.dispatch("updateInvoice",newData)
        },
        deleteRecord(data) {
            store.dispatch("deleteInvoice",data)
        },
        addRecordInv(data) {
            let newData = {
                date: data.date,
                amount: data.amount,
                description: data.description,
                type: data.type.type,
                partner: data.partner.id,
                specification: data.specification ? data.specification.id : ""

            }
            store.dispatch("createInvoice",newData)
        }
    }
}

</script>