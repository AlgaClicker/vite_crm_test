<template>
    <div class="card tableComp card-sm ">
        <div class="card-header py-1 d-flex justify-content-between align-items-center">
            <h5>{{ table.header.title }}</h5>
            <button type="button" class="btn py-0 btn-sm btn-add" data-bs-toggle="modal" @click="thisAddRecord" data-bs-target="#editModal">
                <font-awesome-icon :icon="['fas', 'plus']" />
                Добавить
            </button>
        </div>

        <div class="card-body  p-0 m-1">
            <table class="table table-sm table-responsive-sm table-striped table-bordered table-hover ">
                <thead class="thead-dark ">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" v-for="(col, key) in table.cols" v-show="checkShow(col) ">
                        {{ col.label }}  
                            <span v-if="col.sort" @click="sort(key)">
                                <button class="btn btn-sm"> 
                                        <font-awesome-icon :icon="['fas', 'sort']" />
                                </button>
                            </span>

                            <span v-if="col.filter">
                                <button  class="btn btn-sm collapsed"  @click="filter(col)" data-bs-toggle="collapse" type="button" :data-bs-target="'#fl'+key" aria-expanded="false" :aria-controls="'fl'+key"> 
                                        <font-awesome-icon :icon="['fas', 'filter']" />
                                </button>
                                <Transition>
                                <div class="collapse" :id="'fl'+key">
                                    <VueDatePicker v-if="'dateMon' == col.type" v-model="filterData[key]" range locale="ru" auto-apply month-picker @update:model-value="filterSet(key,col,this)" />
                                       {{col.type}}
                                </div>
                            </Transition>
                            </span>
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,keyRow) in dataTable">
                        
                        <th scope="row text-center align-middle">{{ keyRow+1 }}
                        </th>
                        
                        <td v-for="(col, key) in table.cols" v-show="checkShow(col)">
                            
                            <span v-if='col.type == "html"' v-html="getColData(row,col,key)">
                                
                            </span>
                            <span v-else-if='col.type && col.type == "data"'>
                                {{ getColData(row,col,key) }} 
                            </span>      
                            <span v-else-if='col.type && col.type == "dateMon"'>
                                {{ getColData(row,col,key) }} 
                            </span>                      
                            <span v-else-if='!col.type || col.type == "text" || col.type == "select"'>
                                {{ getColData(row,col,key) }} 
                            </span>
                            <span v-else-if='col.type == "link" && col.url'>
                                <RouterLink :to=" getColData(row,col,key)">{{ row[key] }}</RouterLink>
                                
                            </span>

                            <span v-else-if='!col.type || col.type == "multiselect"'>
                                
                               {{ getColData(row,col,key) }} 
                            </span>

                            
                        </td>
                        
                        <td class="text-center editCol">
                            <button class="btn btn-secondary btn-sm mx-1"  data-bs-toggle="modal" @click="thisEditRecord(row)" data-bs-target="#editModal">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </button>
                            <button class="btn btn-info btn-sm mx-1"  data-bs-toggle="modal" @click="thisDeleteRecord(row)" data-bs-target="#deleteConfirmModal">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />    
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div v-if="pagginate" class="card-footer text-muted">
           
                <ul class="pagination pagination-sm justify-content-end" >
                    <li class="page-item mx-2">
                        <select class="px-2 custom-select" v-model="pagginate.limit" @change="setLimitpage()" required>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                </select> 
                    </li>
                    <li class="page-item" v-if="pagginate.page > 1"><a class="page-link"  @click="loadPage(pagginate.page - 1)">пред.</a></li>
                    
                    <li class="page-item" v-if="pagginate.pages > 1 " v-for="nxPage in pagginate.pages" :class="nxPage == pagginate.page ? 'active':''">
                        <a class="page-link" @click="loadPage(nxPage)">{{ nxPage }}</a>
                    </li>
                    <li class="page-item"  v-if="pagginate.pages > pagginate.page"><a class="page-link" @click="loadPage(pagginate.page+1)">след.</a></li>
                </ul>
        </div>
        
    </div> 

<!---------------------- Modal ----------------------->

<div class="modal editModal" id="editModal"  tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" id="ModalLabel">
        <span v-if="isNewRecord">Добавить Запись</span>
        <span v-if="isEditRecord">Изменить Запись</span>
        </h6>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="">
            
            <div class="input-group input-group-sm mb-1" v-for="(col,nameCol) in table.cols" >
                
                <div class="input-group-prepend" v-if="col.input">
                    <span class="input-group-text" :id="'basic-addon-'+nameCol">{{col.label}}</span>
                </div>

                    <!--
                    <select  v-if="col.input && col.type=='select' && col.dataList" class="form-select form-select-sm" v-model="record[nameCol]" :aria-label="'basic-addon-'+nameCol">
                        
                        <option v-for="opt in v" :value="opt">
                            <span v-if="opt.username ">{{ opt.username }}</span>
                            <span v-else-if="opt.name ">{{ opt.name }}</span>
                            <span v-else-if="opt.fullname ">{{ opt.fullname }}</span>
                        </option>
                    </select>
                    -->

                    <div v-if="col.input && col.type=='dateMon'">
                            
                            <VueDatePicker v-model="record[nameCol]" :format="format" locale="ru" auto-apply month-picker/>
                    </div>
                    
                    <VueMultiselect v-if="col.input && col.type=='select' && col.dataList" 
                    v-model='record[nameCol]'
                    :options="col.dataList" 
                    :searchable="true" 
                    selectedLabel = "Выбрано"
                    deselectLabel = "Удалить"
                    selectLabel = "Выбрать в список"
                    :close-on-select = "true" 
                    :label = "col.labelColName ? col.labelColName : 'name'" 
                    :track-by = "col.trackBy ? col.trackBy : 'id'"
                    placeholder="Вебирите записи"
                    :show-labels = "false">
                    </VueMultiselect>

                    <div v-if="col.input == false && col.show == false">
                        
                        <input type="hidden" :name="nameCol" v-model="record[nameCol]">
                    </div>
                    <div v-if="col.input && col.type=='data'">
                        <VueDatePicker v-model="record[nameCol]" :format="format" locale="ru" auto-apply />
                    </div>    
                   
                    <div v-if="col.input && col.type=='multiselect' && col.dataList">
                       
                        <VueMultiselect  
                            v-model=record[nameCol]
                            selectedLabel="Выбрано"
                            deselectLabel="Удалить"
                            selectLabel="Выбрать в список"
                            :multiple="true" 
                            :options="col.dataList"  
                            placeholder="Выберете из списка" 
                            :label="col.labelColName ? col.labelColName : 'name'" 
                            track-by="id"
                            :taggable="false"
                        >
                    </VueMultiselect>
                        
                    </div>

                    
                    <input v-if="col.input && !col.type || col.type == 'text'" type="text" v-model="record[nameCol]" c :placeholder="col.label" :readonly="col.readonly && !isNewRecord" :aria-label="'# basic-addon-'+nameCol" :aria-describedby="'#basic-addon-'+nameCol">
                
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Закрыть</button>
        <button type="button" v-if="isNewRecord" class="btn btn-sm btn-success"  @click="addRecordLocal">Добавть</button>
        <button type="button" v-if="isEditRecord" class="btn btn-sm btn-primary"  data-bs-dismiss="modal" @click="saveRecordLocal">Сохранить</button>
      </div>
    </div>
  </div>
</div>


<!--  Modale Confirm Delete -->
<div class="modal modal-sm fade" id="deleteConfirmModal" tabindex="2" role="dialog" aria-labelledby="deleteConfirmModalModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deleteConfirmModalModalLabel">
            Удалить запись
        </h5>
        
      </div>
      <div class="modal-body text-center">
        <button type="button"  class="btn btn-sm btn-secondary mx-2"  data-bs-dismiss="modal">Отменить</button>
        <button type="button"  class="btn btn-sm btn-danger mx-2"  data-bs-dismiss="modal" @click="deleteRecordLocal">Удалить</button>
        
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { toRaw,reactive } from 'vue';
import { mapGetters, mapState, mapActions  } from 'vuex'
import store from '@/store'
import VueMultiselect  from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import { RouterLink } from 'vue-router';
import { Tooltip, Toast, Popover, Collapse } from 'bootstrap';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    components: { VueMultiselect,VueDatePicker,Collapse,RouterLink  },
    
    props: ['table','dataTable','addRecord','editRecord','deleteRecord','options','updateListData'],
    data() {
        return {
            modelMultiSelect: null,
            cel_options: ['Select option', 'options', 'selected', 'multiple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],
            show: "",
            isNewRecord: false,
            isEditRecord: false,
            showModal: true,
            record: {},
            filterData:{}
            
        }
    },
    created() {
        //console.log("TableComponent: created, Props:",this.dataTable)
        
    },
    mounted() {
        console.log("store.getters.getPagginate",store.getters.getPagginate)
    },
    computed: {
        ...mapGetters({
            pagginate: 'getPagginate'
        }),
        checkData:(elem) => {
            //console.log("checkData",elem)
             return "test"
        },
        checkModelSelect: (elem) => {
            console.log("checkModelSelect")
        },
        format: date => {
            console.log("format",date)
            /*
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `Selected date is ${day}/${month}/${year}`;
            */
           //return date
        }
        
    },
    methods: {
        ...mapActions({
            
            
        }),
        async setLimitpage(){
                store.dispatch('setPagginateLimit',this.pagginate.limit)
                await this.updateListData()
        },
        multiSelectRecord(record,col)  {
            return record
        },
        onSelectVueMultiselect(value,col) {
            console.log("onSelectVueMultiselect:value",value[col])
            console.log("onSelectVueMultiselect:col",col)
            this.record[col] = value[col]
            return value
        },
        toHtml(col,row) {
            
            return row,col
        },
        async loadPage(page) {
            store.dispatch("setPagginatePage",page)
            await this.updateListData()
            console.log("loadPage",this.dataTable)
        },
        getColData(row,col,key) {
           
            if (col.type == 'multiselect') {
                let text = ""
                row[key].forEach(element => {
                    
                    text  = text + element[col.labelColName] +" " 
                });
                return text
            }
            if (col.type == 'link' && col.url) {
                console.log(row,' -|COL|- ');
                return col.url.replace('{{id}}', row.id)
            }
            if (col.value) {
                col.data = row
                col.value(row[key])
                return col.value(row[key])
            } else {
               return toRaw(row[key])
            }
           
        },
        async filter(col) {
            console.log(col)
            
        },
        async filterSet(key,col,data) {
            console.log('col:',col,'key:',key)
            let val = toRaw(this.filterData)
            console.log('filterSet:',typeof val[col],'|',data.value,'|',col)
            
            if (typeof val[key] === "undefined" ) {
                //clear filter 
                console.log('clear filter',key)
                //store.dispatch('removeFilterReq',key)
                //await this.updateListData()
                return key
            }

            
            let dateStartVal = val[key][0]
            let dateEndVal = val[key][1]
            
            var dateStart = new Date()
            let dateEnd = new Date()
            dateStart.setDate('01')
            dateStart.setMonth(dateStartVal.month)
            dateStart.setFullYear(dateStartVal.year)

            
            dateEnd.setMonth(dateEndVal.month)
            dateEnd.setFullYear(dateEndVal.year)
            var lastDateofTheMonth = 33 - new Date(dateEndVal.year, dateEndVal.month, 33).getDate()
            console.log("lastDateofTheMonth",lastDateofTheMonth)
            dateEnd.setDate(lastDateofTheMonth)
            //dateStart = dateStart.setUTCFullYear(dateStartVal.year)
            let filter ={}

            filter[key] = {
                start: dateStart,
                end: dateEnd
            }

            store.dispatch('addFilterReq',filter)

            console.log("filterSet",lastDateofTheMonth,dateStart," | ",dateEnd)
            await this.updateListData()

        },
        async sort(col) {
            await store.dispatch('setSort',col)
            await this.updateListData()
          console.log(col)  
        },

        async saveRecordLocal() {
           await this.editRecord(this.record)
        },

        async deleteRecordLocal() {
            await this.deleteRecord(this.record)
        },

        async addRecordLocal() {
            //console.log("addRecord")
            this.addRecord(this.record)
            this.isNewRecord = true
            this.showModal = false
           
           

        },
        thisAddRecord() {
            this.isNewRecord = true
            this.isEditRecord = false
            
            this.record = {}
        },
        thisDeleteRecord(rowId) {
            this.isNewRecord = false
            this.isEditRecord = false
            this.record = rowId
        },
        thisEditRecord(rowId) {
            console.log("thisEditRecord",rowId)
            this.isNewRecord = false
            this.isEditRecord = true
            this.record = rowId
            
        },
        checkShow(e) {
                console.log("checkShow",e)
        },
        checkShow(prm) {
            if (prm.show == 'undefined') {
                return true;

            } else {
                if (prm.show == false) {
                    return false 
                } else {
                    return true
                }
            }
            
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
.card {
    height: 100vh;
}
.tableComp {
    box-shadow:   3px 3px 4px 2px #888888 ;
}
.editCol {
    width: 100px;
}

.editModal {
    padding-top: 200px !important; 
}
.modal-header {
    margin: 0 0 0 0;
    padding: 5px 10px 5px 15px !important;

}
</style>