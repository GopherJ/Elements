/* eslint-disable */

// components
import ReturnTop from './components/ReturnTop';

// directives
import FixedTop from './directives/FixedTop';
import Visible from './directives/Visible';
import Focus from './directives/Focus';

// prototypes
import eventBus from './prototypes/eventBus';



const install = (Vue, options = {}) => {
    // store
    if (options.store) {
        //
    }

    // components
    Vue.component(ReturnTop.name, ReturnTop);

    // directives
    Vue.directive(FixedTop.name, FixedTop);
    Vue.directive(Visible.name, Visible);
    Vue.directive(Focus.name, Focus);

    // prototypes
    Vue.prototype.$eventBus = eventBus;
};

export default {
    install
};

export {
    ReturnTop
};

