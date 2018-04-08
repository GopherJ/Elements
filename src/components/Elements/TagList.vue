<template>
    <div class="field is-grouped is-grouped-multiline">
        <div class="control" v-for="(tag, idx) of tags"
             v-if="tag.active"
             :key="Object.values(tag).join('')">
            <b-tag
                :type="type"
                attached
                closable
                style="cursor: pointer;"
                @close="$emit('close', idx)">
                {{ tag.title || title() }}
            </b-tag>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import uuid from 'uuid/v1';

    export default {
        name: 'tag-list',
        props: {
            tags: {
                type: Array,
                default: () => [],
            },
            type: {
                type: String,
                default: 'is-primary',
            }
        },
        methods: {
            title() {
                return uuid();
            }
        }
    };
</script>

<style scoped>
</style>
