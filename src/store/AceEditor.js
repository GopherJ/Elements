const namespaced = true;

const state = {
    aggs: `{
        "aggs": {

        }
    }`
};

const mutations = {
    UPDATE_AGGS(state, aggs) {
        state.aggs = aggs ;
    }
};

const getters = {
    GET_AGGS(state) {
        return state.aggs;
    }
};

export default {
    namespaced,
    state,
    mutations,
    getters
};
