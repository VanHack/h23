<template>
    <panel :showHeading="false">
        <div class="row">
            <div class="col-10 offset-1 breathe">
                <h1 class="panel-heading">{{ t('messages.contact') }}</h1>

                <div v-if="sent">
                    <h3 class="text-center">
                        {{ t('messages.your-message-was-sent') }}

                        {{ t('messages.thank-you') }}
                    </h3>
                </div>

                <form @submit.prevent v-if="! sent" @keydown="errors.clear($event.target.name)">
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="document">{{ t('messages.your-name') }} ({{ t('messages.required') }})</label>
                                                <input v-model="name" name="name" type="text" class="form-control">
                                                <h6 class="text-danger" v-if="errors.has('name')" v-text="errors.get('name')"></h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="document">{{ t('messages.your-email') }} ({{ t('messages.required') }})</label>
                                                <input v-model="email" name="email"  type="text" class="form-control">
                                                <h6 class="text-danger" v-if="errors.has('email')" v-text="errors.get('email')"></h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="document">{{ t('messages.subject') }}</label>
                                                <input v-model="subject" name="subject" type="text" class="form-control">
                                                <h6 class="text-danger" v-if="errors.has('subject')" v-text="errors.get('subject')"></h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="document">{{ t('messages.phone') }}</label>
                                                <input v-model="phone" name="phone" type="text" class="form-control">
                                                <h6 class="text-danger" v-if="errors.has('phone')" v-text="errors.get('phone')"></h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="document">{{ t('messages.message') }}</label>
                                                <textarea v-model="message" name="message" rows="7" class="form-control"></textarea>
                                                <h6 class="text-danger" v-if="errors.has('message')" v-text="errors.get('message')"></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" v-if="captchaEnabled">
                                <div class="col-12">
                                    <vue-recaptcha
                                        :sitekey="captchaSiteKey"
                                        @verify="__recaptchaVerified()"
                                        @expired="__recaptchaExpired()"
                                    ></vue-recaptcha>
                                </div>
                            </div>

                            <div class="row top-buffer">
                                <div class="col-12">
                                    <button type="button" v-on:click="__sendMessage()" class="btn btn-success" :disabled="(busy || errors.any() || ! recaptchaVerified) && ! debug">
                                        {{ t('messages.send') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <alert-modal :title="modalText" v-if="showModal"></alert-modal>
    </panel>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';
    import Helpers from '../classes/Helpers';
    import { mapState } from 'vuex'

    let helpers = new Helpers;

    export default {
        props: [],

        components: {
            VueRecaptcha
        },

        data() {
            return {
                busy: false,
                showModal: '',
                modalText: '',
                sent: false,
                recaptchaVerified: this.verified,
                captchaSiteKey: this.$store.state.environment.captchaSiteKey,
                captchaEnabled: this.$store.state.environment.captchaEnabled,
                debug: this.$store.state.environment.debug,
            }
        },

        events: {

        },

        methods: {
            t(message) {
                return this.$store.state.i18n.t(message)
            },

            __busy(value, modalText) {
                if (typeof value !== 'undefined') {
                    this.busy = value;

                    this.__showModal(value, modalText);
                }

                return this.busy;
            },

            __sendMessage() {
                let data = helpers.removeEmptyProperties(this.$store.state.contact.form.fields);

                axios.post(this.$store.state.apiUrlPrefix+'/contact', data)
                    .then(success => this.__onSuccess())
                    .catch(error => this.$store.commit('contactStoreErrors', { errors: error.response.data }))
                ;
            },

            __onSuccess() {
                this.$store.state.contact.form.onSuccess();

                this.sent = true;
            },

            __recaptchaVerified() {
                this.recaptchaVerified = true;
            },

            __recaptchaExpired() {
                this.recaptchaVerified = false;
            }
        },

        computed: {
            ...mapState(['environment']),

            form: {
                get() {
                    return this.$store.state.contact.form;
                }
            },
            errors: {
                get() {
                    return this.form.errors;
                }
            },
            email: {
                get() {
                    return this.form.fields.email;
                },
                set(value) {
                    this.$store.commit('contactStoreFormField', { field: 'email', value })
                }
            },
            name: {
                get() {
                    return this.form.fields.name;
                },
                set(value) {
                    this.$store.commit('contactStoreFormField', { field: 'name', value })
                }
            },
            subject: {
                get() {
                    return this.form.fields.subject;
                },
                set(value) {
                    this.$store.commit('contactStoreFormField', { field: 'subject', value })
                }
            },
            message: {
                get() {
                    return this.form.fields.message;
                },
                set(value) {
                    this.$store.commit('contactStoreFormField', { field: 'message', value })
                }
            },
            phone: {
                get() {
                    return this.form.fields.phone;
                },
                set(value) {
                    this.$store.commit('contactStoreFormField', { field: 'phone', value })
                }
            },
        },

        mounted() {
        },
    }
</script>

<style>
</style>
