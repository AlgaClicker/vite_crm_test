<template>
  
</template>

<script>
import { toRaw,reactive } from 'vue';
import { mapGetters, mapState, mapActions  } from 'vuex'
import store from '@/store'
import VueMultiselect  from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';

export default {
    
    props: ['table','dataTable','addRecord','editRecord','deleteRecord','paggiante','updateListData'],
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