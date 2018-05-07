/* eslint-disable */

// components
import ReturnTop from './components/ReturnTop';

// directives
import FixedTop from './directives/FixedTop';
import Visible from './directives/Visible';



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
};

export default {
    install
};

export {
    ReturnTop
};

