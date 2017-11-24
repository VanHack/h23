<template>
    <div>
        <vue-recaptcha
            sitekey="6LchDyAUAAAAAPPYWb2ZcFQOh12bI88qpJjKei9J"
            @verify="__recaptchaVerified()"
            @expired="__recaptchaExpired()"
        ></vue-recaptcha>
    </div>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        props: [
            'verified'
        ],

        data() {
            return {
                busy: false,
                showModal: '',
                modalText: '',
                sent: false,
                recaptchaVerified: this.verified,
            }
        },

        components: {
            VueRecaptcha
        },

        methods: {
            __recaptchaVerified() {
                this.recaptchaVerified = true;
            },

            __recaptchaExpired() {
                this.recaptchaVerified = false;
            }
        },
    }
</script>
