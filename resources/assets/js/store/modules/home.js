import Form from "../../classes/Form"
import BrowserStorage from "../../classes/BrowserStorage"

let browserStorage = new BrowserStorage()

const state = {
    form: new Form({
        search: {
            text: "",

            typeTimeout: 0,

            running: false,
        },

        likes: [],

        artists: {
            current: {
                data: {
                    id: null,
                    name: null,
                    image_url: null,
                    mbid: null,
                    thumb_url: null,
                    tracker_count: null,
                    upcoming_event_count: null,
                    url: null,
                },

                events: {},
            },
        },
    }),
}

const getters = {}

const actions = {
    homeAddLikeAction(context, artist) {
        context.commit("homeAddLike", artist)

        context.dispatch("homeSaveToBrowserStorageAction", artist)
    },

    homeRemoveLikeAction(context, artist) {
        context.commit("homeRemoveLike", artist)

        context.dispatch("homeSaveToBrowserStorageAction")
    },

    homeSaveToBrowserStorageAction(context) {
        browserStorage.put("appState", context.state.form)
    },

    homeLoadFromBrowserStorageAction(context) {
        const form = browserStorage.get("appState")

        context.commit("homeSetForm", form)
    },

    homeSelectArtistAction(context, artist) {
        context.commit("homeSetCurrentArtist", artist)

        context.dispatch("homeSaveToBrowserStorageAction")
    },
}

const mutations = {
    homeSetSearch(state, data) {
        state.form.fields.search = data
    },

    homeSetCurrentArtist(state, artist) {
        state.form.fields.artists.current = artist
    },

    homeSetCurrentArtistEvents(state, artist) {
        state.form.fields.artists.current.events = artist
    },

    homeStoreErrors(state, payload) {
        state.form.errors.record(payload.errors)
    },

    homeAddLike(state, artist) {
        state.form.fields.likes.push(artist)
    },

    homeRemoveLike(state, artist) {
        const index = state.form.fields.likes.findIndex(
            like => like.id === artist.id
        )

        if (index > -1) {
            state.form.fields.likes.splice(index, 1)
        }
    },

    homeSetForm(state, form) {
        if (form) {
            state.form = form
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
