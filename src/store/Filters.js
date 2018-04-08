import _ from 'lodash';

const namespaced = true;

const state = {
    filters: []
};

const mutations = {
    ADD_FILTER({filters}, filter) {
        filters.push(filter);
    },
    UPDATE_FILTER({filters}, {filter, index}) {
        filters.splice(index, 1, filter);
    },
    DELETE_FILTER({filters}, index) {
        filters.splice(index, 1);
    }
};

const getters = {
    GET_FILTERS({filters}) {
        return _.cloneDeep(filters);
    }
};

export default {
    namespaced,
    state,
    mutations,
    getters
};
