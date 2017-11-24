<template>
    <panel :showHeading="false">
        <div class="row">
            <div class="col-10 offset-1 breathe">
                <div class="entry-content" itemprop="text">
                    <h1 class="panel-heading">{{ t('messages.about.title') }}</h1>

                    <p class="home24-verb text-center">
                        <strong>{{ t('messages.about.verb') }}</strong>
                    </p>

                    <p v-html="t('messages.about.text_p1')"></p>
                    <p v-html="t('messages.about.text_p2')"></p>
                    <p v-html="t('messages.about.text_p3')"></p>
                    <p v-html="t('messages.about.text_p4')"></p>
                    <p v-html="t('messages.about.text_p5')"></p>
                    <p v-html="t('messages.about.text_p6')"></p>
                </div>
            </div>
        </div>
    </panel>
</template>

<script>
    export default {
        methods: {
            t(message) {
                return this.$store.state.i18n.t(message)
            },
        }
    }
</script>

<style>
</style>
