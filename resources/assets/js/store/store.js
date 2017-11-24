/**
 * Imports
 */
import Vue from "vue"
import Vuex from "vuex"
import VueI18NLocalizationModule from "../localization/module.js"

/**
 * Vuex
 */
Vue.use(Vuex)

/**
 * Global state
 */
import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

/**
 * Modules
 */
import home from "./modules/home"
import contact from "./modules/contact"

/**
 * State
 */
const state = {
    mounted: false,

    environment: {
        debug: true,

        captchaSiteKey: "6LdmHDoUAAAAAOZ4tq63jX1CVVuf090P25ilzYP3",

        captchaEnabled: true,
    },

    i18n: VueI18NLocalizationModule,

    brand: "Home24",
}

/**
 * Store
 */
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
        home,
        contact,
    },
})
