<template>
    <div>
        object page
        <hr>
        <button class="btn btn-sm btn-info" @click="listObjects">Load </button>
            <ul>
                <li v-for="object in getObjectsList">{{ object.name }}</li>
            </ul>
        <hr>
        {{ listNotifications }}
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions  } from 'vuex'
export default {
    data: () => {
        return {

        }
    },
    computed: {
        ...mapGetters({
            listNotifications: "listNotifications",
            getObjectsList: "getObjectsList"
        })
    },
    mounted() {
        this.listObjects();
    },
    methods: {
        ...mapActions({
            listObjects: 'listObjects',

        }),
    }
}
</script>