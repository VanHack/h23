import Vue from "vue"
import VueRouter from "vue-router"
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import Contact from "./views/Contact.vue"

Vue.use(VueRouter)

let routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        mustBeLoggedIn: false,
    },
    {
        path: "/about",
        component: About,
        mustBeLoggedIn: false,
    },
    {
        path: "/contact",
        component: Contact,
        mustBeLoggedIn: false,
    },
    {
        path: "/language/:lang",
        mustBeLoggedIn: false,
    },
]

let router = new VueRouter({
    routes,
    linkActiveClass: "nav-active",
})

export default router
