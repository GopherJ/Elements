/* eslint-disable */
import Filters from '../components/E'

const install = (Vue, options = {}) => {
    if (options.store) {
        options.store.registerModule('Filters', FiltersStore);
    }

    Vue.component(Filters.name, Filters);
};

export default {
    install,
};

