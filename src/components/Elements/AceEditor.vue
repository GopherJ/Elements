<template>
    <editor :content="content" :theme="'monokai'" :lang="'json'" :sync="true"></editor>
</template>

<script>
    import editor from 'vue2-ace';
    import 'brace/mode/json';
    import 'brace/theme/monokai';
    import {mapMutations, mapGetters} from 'vuex';

    export default {
        name: 'ace-editor',
        components: {
            editor
        },
        methods: {
            ...mapMutations('AceEditor', [
                'UPDATE_AGGS'
            ])
        },
        computed: {
            ...mapGetters('AceEditor', [
                'GET_AGGS'
            ])
        },
        mounted() {
            this.$on('editor-update', function(n){
                this.UPDATE_AGGS(n);
            });
        }
    }
</script>

<style scoped>
</style>
