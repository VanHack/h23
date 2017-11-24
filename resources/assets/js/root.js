import Vue from "vue"
import store from "./store/store.js"
import router from "./routes"

new Vue({
    el: "#root",

    router,

    store,

    methods: {},

    computed: {},

    mounted() {
        this.$store.commit("rootSetMounted", true)
    },
})
