<template>
    <panel :showHeading="false">
        <div class="row">
            <div class="col-2">
                <div class="row col-12">
                    <div class="input-group">
                        <input @input="__searchChange()" v-model="_searchText" class="form-control" placeholder="artist">
                        <div v-if="_searchRunning" class="input-group-addon"><i class="fa fa-cog fa-spin"></i></div>
                    </div>
                </div>
                
                <div class="row col-12 breathe-top-20">
                    <div @click="__selectArtist(like)" v-for="like in _likes" :key="like.data.id" :class="'pointer card' + (__artistIsCurrent(like) ? ' bg-light' : '')">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-12">
                                            <img class="card-img-top image-responsive" :src="like.data.thumb_url" alt="Artist image"> 
                                        </div>  
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-12">
                                            <h6>{{ like.data.name }}</h6>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div @click="__toggleLike(_currentArtist)" class="text-danger text-right">
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-10">
                <div v-if="_currentArtist.data.id" class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <img class="card-img-top image-responsive" :src="_currentArtist.data.image_url" alt="Artist image">
                            </div>

                            <div class="col-8">
                                <div class="row justify-content-between">
                                    <div class="col-10">
                                        <h1 class="card-title">{{ _currentArtist.data.name }}</h1>
                                    </div>
                                    <div class="col-2 text-right">
                                        <i @click="__toggleLike(_currentArtist)" :class="'fa fa-heart fa-2x pointer ' + (__userLikes(_currentArtist) ? 'text-danger' : 'text-light')"></i>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <a v-if="_currentArtist.data.facebook_page_url" :href="_currentArtist.data.facebook_page_url" target="_blank" class="btn btn-primary">
                                            <i class="fa fa-facebook"></i>
                                        </a>
                                    </div>
                                </div>

                                <div class="row breathe-top-40 font-sm">
                                    <div class="col-12">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Venue</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Country</th>
                                                    <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="event in _currentArtist.events">
                                                    <td>{{ event.venue.name }}</td>
                                                    <td>{{ event.venue.city }}</td>
                                                    <td>{{ event.venue.country }}</td>
                                                    <td>{{ event.datetime }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </panel>
</template>

<script>
    import Helpers from "../classes/Helpers"

    let helpers = new Helpers()

    export default {
        data() {
            return {
                searchKeyboardTimeout: 0,
            }
        },

        methods: {
            t(message) {
                return this.$store.state.i18n.t(message)
            },

            __makeSearchUrl() {
                return '//rest.bandsintown.com/artists/'+this._searchText+'?app_id=pragmarx-home24'
            },

            __makeEventsUrl(artist) {
                return '//rest.bandsintown.com/artists/'+artist.data.name+'/events?app_id=pragmarx-home24'
            },

            __searchChange() {
                let me = this;

                clearTimeout(me.searchKeyboardTimeout);

                me.searchKeyboardTimeout = setTimeout(function () {
                    me.__search();
                }, 500);
            },

            _loadCurrentArtistEvents() {
                if(!this._currentArtist) {
                    return;
                }

                axios.get(this.__makeEventsUrl(this._currentArtist))
                    .then(success => this.__setCurrentArtistEvents(success.data))
                    .catch(error => dd('Error occurred: ', error))
                ;
            },

            __setCurrentArtist(data) {
               this.$store.commit('homeSetCurrentArtist', data)

               this._loadCurrentArtistEvents();
            },

            __setCurrentArtistEvents(events) {
                this.$store.commit('homeSetCurrentArtistEvents', events)
            },

            __search() {
                if (this.__isSearchable()) {
                    this._searchRunning = true;

                    axios.get(this.__makeSearchUrl())
                        .then(success => this.__setCurrentArtist({ data: success.data, events: null }))
                        .catch(error => dd('Error occurred: ', error))
                        .then(success => this._searchRunning = false)
                    ;
                }
            },

            __isSearchable() {
                return !!this._searchText
            },

            __userLikes(artist) {
                if (!artist) {
                    return false
                }

                return this.$store.state.home.form.fields.likes.filter(function (like) {
                    return like.data.id === artist.data.id;
                }).length > 0
            },

            __toggleLike(artist) {
                const cloned = helpers.clone(artist);

                if (this.__userLikes(cloned)) {
                    this.$store.dispatch('homeRemoveLikeAction', cloned)

                    return;
                }

                this.$store.dispatch('homeAddLikeAction', cloned)
            },

            __selectArtist(artist) {
                this.$store.dispatch('homeSelectArtistAction', artist)
            },

            __artistIsCurrent(artist) {
                return this._currentArtist.data.id === artist.data.id;
            },
        },

        computed: {
            _searchText: {
                get() {
                    return this.$store.state.home.form.fields.search.text
                },
                set(value) {
                    let search = this.$store.state.home.form.fields.search

                    search.text = value

                    return this.$store.commit('homeSetSearch', search)
                }
            },

            _searchRunning: {
                get() {
                    return this.$store.state.home.form.fields.search.running
                },
                set(value) {
                    let search = this.$store.state.home.form.fields.search

                    search.running = value

                    return this.$store.commit('homeSetSearch', search)
                }
            },

            _currentArtist() {
                return this.$store.state.home.form.fields.artists.current
            },

            _likes() {
                return this.$store.state.home.form.fields.likes
            }
        },

        mounted() {
            this.$store.dispatch('homeLoadFromBrowserStorageAction')
        }
    }
</script>

<style>
</style>
