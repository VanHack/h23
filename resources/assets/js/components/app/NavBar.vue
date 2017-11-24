<template>
    <div v-if="__mounted()">
        <nav class="navbar navbar-expand-md">
            <router-link class="navbar-brand min-height-80" to="/">
                <span v-if="_showBrand" v-html="_brand"></span>
            </router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="mr-auto navbar-left"></div>
                <ul class="navbar-nav navbar-right my-2 my-md-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">{{ t('menu.home') }}</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">{{ t('menu.about') }}</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">{{ t('menu.contact') }}</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            v-if="_locales[_locale]"
                        >
                            {{ _locales[_locale].language.display_name }}
                            <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a
                                v-for="locale in _locales"
                                :class="'dropdown-item' + (locale.language.tag == _locales[_locale].language.tag ? ' bg-dark text-white' : '')"
                                href="#"
                                @click="__switchLocale(locale.language.tag)"
                                disabled="disabled"
                            >
                                {{ locale.language.display_name }}
                            </a>

                            <!---->
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        computed: {
            _showBrand() {
                return this.$store.getters.rootShowBrand;
            },

            _brand() {
                return this.$store.state.brand;
            },

            _locales() {
                return this.$store.getters.rootLocales;
            },

            _locale: {
                get() {
                    return this.$store.getters.rootLocale;
                },
                set(locale) {
                    return this.$store.commit('rootSetLocale', locale);
                }
            },
        },

        methods: {
            __mounted() {
                console.log('NavBar mounted --------- ', this.$store.state && this.$store.state.mounted);
                return this.$store.state && this.$store.state.mounted;
            },

            t(message) {
                return this.$store.state.i18n.t(message)
            },

            __switchLocale(locale, event) {
                 if (locale) {
                     this._locale = locale
                 }
            },
        }
    };
</script>
