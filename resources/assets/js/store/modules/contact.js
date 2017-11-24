import Form from "../../classes/Form"

const state = {
    form: new Form({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    }),
}

const getters = {}

const actions = {}

const mutations = {
    contactStoreFormField(state, payload) {
        state.form.fields[payload.field] = payload.value
    },

    contactStoreErrors(state, payload) {
        state.form.errors.record(payload.errors)
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
