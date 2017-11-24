<template>
    <div class="card panel-primary card-bg-opacity-60">
        <div class="card-header" v-if="_showHeading">{{ heading }}</div>

        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['heading', 'showHeading'],

        computed: {
            _showHeading: function () {
                return typeof this.showHeading == 'undefined'
                        ? true
                        : this.showHeading;
            },
        },
    }
</script>
