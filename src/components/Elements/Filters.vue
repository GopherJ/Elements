<template>
    <!--eslint-disable-->
    <section class="filters">
        <b-message>
            <label class="label">Filter</label>

            <div class="field is-grouped level">
                <b-select placeholder="Add a filter"
                    v-model="factor">
                    <optgroup
                        v-if="factors.length !== 0"
                        label="Node">
                        <template v-for="factor of factors">
                            <option
                                v-for="(value, key) in factor"
                                v-text="key"
                                :value="value"
                                :key="value">
                            </option>
                        </template>
                    </optgroup>

                    <optgroup
                        v-if="fields.length !== 0"
                        label="Source">
                        <template v-for="field of fields">
                            <option
                                v-for="(value, key) in field"
                                v-text="key"
                                :value="value"
                                :key="value">
                            </option>
                        </template>
                    </optgroup>
                </b-select>

                <b-select
                    placeholder="Operator"
                    v-model="operator">
                    <template v-for="operator of operators">
                        <option
                            v-for="(value, key) in operator"
                            v-text="key"
                            :value="value"
                            :key="value">
                        </option>
                    </template>
                </b-select>

                <component
                    class="is-expanded"
                    v-if="operator !== 'exists' &&
                      operator !== 'does not exists'"
                    :is="isMultiValues ? 'b-taginput' : 'b-input'"
                    :placeholder="isMultiValues ? 'Comma separated' : 'Add a value'"
                    :confirm-key-codes="isMultiValues ? [188] : false"
                    @keyup.native.enter="addUpdateFilter"
                    v-model.trim="filter.value">
                </component>
            </div>

            <b-field label="Label">
                <b-input placeholder="Optional"
                         v-model.trim="filter.label"
                         @keyup.native.enter="addUpdateFilter">
                </b-input>
            </b-field>
        </b-message>

        <!--filter list-->
        <b-message  v-if="GET_FILTERS.length !== 0">
            <div class="field is-grouped is-grouped-multiline" style="overflow: hidden">
                <div class="control" v-for="(filter, index) of GET_FILTERS" :key="filter.id">
                    <b-taglist attached>
                        <b-tag
                            type="is-primary"
                            attached
                            @click.native.stop="updateFilter(filter)">
                            {{ filter.label }}
                        </b-tag>
                        <b-tag
                            :type="filter.active ? 'is-success' : 'is-light'"
                            @click.native.stop="$set(filter, 'active', !(filter.active))"
                            closable
                            @close="DELETE_FILTER(index)">
                            {{ filter.active ? 'active' : 'inactive' }}
                        </b-tag>
                    </b-taglist>
                </div>
            </div>
        </b-message>
    </section>
</template>

<script>
    /* eslint-disable */
    import uuid from 'uuid/v1';
    import BMessage from "buefy/src/components/message/Message";
    import { mapMutations, mapGetters } from 'vuex';

    /**
     *
     * @param arr
     * @param key
     * @param value
     * @returns {number}
     * @constructor
     */
    const FindIndex = (arr, key, value) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] === value) {
                return i;
            }
        }
        return -1;
    };

    /**
     *
     * @param arr
     * @param key
     * @param value
     * @param index
     * @returns {boolean}
     * @constructor
     */
    const NotExistsExcept = (arr, key, value, index) => {
        for (let i = 0; i < arr.length; i += 1) {
            if (i !== index && arr[i][key] === value) {
                return false;
            }
        }

        return true;
    };

    /**
     *
     * @param arr
     * @param key
     * @param value
     * @returns {boolean}
     * @constructor
     */
    const NotExists = (arr, key, value) => FindIndex(arr, key, value) === -1;

    export default {
        components: {BMessage},
        name: 'filters',
        data() {
            return {
                filter: {
                    id: null,
                    label: null,
                    active: null,
                    entry: {
                        factor: null,
                        operator: null,
                        value: null
                    }
                }
            }
        },
        props: {
            factors: {
                type: Object,
                default() {
                    return {};
                }
            },
            fields: {
                type: Object,
                default() {
                    return {
                        duration: 'duration',
                        userid: 'user.udid',
                        username: 'user.name',
                        device: 'user.device_info.model',
                        zoneid: 'zone.id',
                        zonename: 'zone.name',
                        zonetag: 'zone.tags',
                    };
                }
            },
            operators: {
                type: Object,
                default() {
                    return {
                        'is greater than': 'gt',
                        'is greater than or equal to': 'gte',
                        'is less than': 'lt',
                        'is less than or equal to': 'lte',
                        'is equal to': 'is',
                        contains: 'contains',
                        'is not equal to': 'is not',
                        'is one of': 'is one of',
                        'is not one of': 'is not one of',
                        exists: 'exists',
                        'does not exists': 'does not exists'
                    }
                }
            }
        },
        methods: {
            ...mapMutations('Filters', [
                'ADD_FILTER',
                'UPDATE_FILTER',
                'DELETE_FILTER'
            ]),
            filterClear() {
                Object.assign(this.filter, {
                    id: null,
                    label: null,
                    active: null,
                    entry: {
                        factor: null,
                        operator: null,
                        value: null
                    }
                });
            },
            warningFilterLabelExists() {
                this.$snackbar.open({
                    message: 'The label of this filter already exists!',
                    type: 'is-warning',
                    position: 'is-top',
                });
            },
            warningFilterEntryExists() {
                this.$snackbar.open({
                    message: 'This entry of this filter already exists!',
                    type: 'is-danger',
                    position: 'is-top',
                });
            },
            updateFilter(filter) {
                Object.assign(this.filter, filter);
            },
            addUpdateFilter() {
                if (!this.filter.entry.factor || !this.filter.entry.operator || !['exists', 'does not exists'].includes(this.filter.entry.operator) && this.filter.entry.value === null) {
                    return;
                }

                const text = ['exists', 'does not exists'].includes(this.filter.entry.operator)
                    ? `${this.filter.entry.factor} ${this.filter.entry.operator}`
                    : `${this.filter.entry.factor} ${this.filter.entry.operator} ${this.filter.entry.filter.value}`;

                const filter = {
                    id: this.filter.id || uuid(),
                    label: this.filter.label || text,
                    text,
                    active: this.filter.active !== null ? this.filter.active : true,
                    entry: this.filter.entry,
                };

                if (NotExists(this.GET_FILTERS, 'id', filter.id)) {
                    if (NotExists(this.GET_FILTERS, 'text', filter.text)) {
                        if (NotExists(this.GET_FILTERS, 'label', filter.label)) {
                            this.ADD_FILTER(filter);
                        } else {
                            this.warningFilterLabelExists();
                        }
                    } else {
                        this.warningFilterEntryExists();
                    }
                } else {
                    const index = FindIndex(this.GET_FILTERS, 'id', filter.id);

                    if (NotExistsExcept(this.GET_FILTERS, 'text', filter.text, index)) {
                        if (NotExistsExcept(this.GET_FILTERS, 'label', filter.label, index)) {
                            this.UPDATE_FILTER(filter, index);
                        } else {
                            this.warningFilterLabelExists();
                        }
                    } else {
                        this.warningFilterEntryExists();
                    }
                }

                this.filterClear();
            },
        },
        computed: {
            ...mapGetters('Filters', [
                'GET_FILTERS'
            ]),
            activeFilters() {
                return this.GET_FILTERS.filter(el => el.active);
            },
            isMultiValues() {
                return ['is one of', 'is not one of'].includes(this.filter.entry.operator);
            }
        },
        watch: {
            'filter.entry.operator': {
                handler(n, o) {
                    if (!(['is one of', 'is not one of'].includes(o)) && ['is one of', 'is not one of'].includes(n) && o !== null) {
                        this.filter.entry.value = [];
                    }
                }
            },
            activeFilters: {
                deep: true,
                handler(n) {
                    this.$emit('change', n);
                }
            }
        },
    }
</script>

<style scoped>
    .filters >>> .message-body {
        border: none;
    }

    .filters >>> .tag {
        cursor: pointer;
    }
</style>
