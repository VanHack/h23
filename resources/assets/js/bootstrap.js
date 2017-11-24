/**
 * Vue
 */
window.Vue = require("vue")

/**
 * Vuex
 */
window.Vuex = require("vuex")

/**
 * lodash (_)
 */
window._ = require("lodash")

/**
 * Moment.js
 */
window.moment = require("moment")
moment.locale("en")

/**
 * jQuery & Boostrap
 */
window.$ = window.jQuery = require("jquery")

window.Popper = require("popper.js")

require("bootstrap")

/**
 * Boostrap Social
 */
require("bootstrap-social")

/**
 * FontAwesome
 */
require("../../../node_modules/font-awesome/scss/font-awesome.scss")

/**
 * Vue Grecaptcha
 */
import VueRecaptcha from "vue-recaptcha"
Vue.use(VueRecaptcha, {
    sitekey: "6LchDyAUAAAAAPPYWb2ZcFQOh12bI88qpJjKei9J",
})
Vue.component("vue-recaptcha", VueRecaptcha)

/**
 * cheerio
 */
const cheerio = require("cheerio")
window.cheerio = cheerio

/**
 * sha256
 */
const sha256 = require("sha256")
window.sha256 = sha256

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require("axios")

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
let token = document.head.querySelector('meta[name="csrf-token"]')
