import '../css/index.css';
import offset from 'document-offset';

let listener;
let offsetTop;

export default {
    name: 'fixed-top',
    bind: function (el, binding, vnode) {
        listener = function () {
            const docElem = document.documentElement || document.body;
            offsetTop = !el.classList.contains('fixed-top')
                ? offset(el).top
                : offsetTop;

            if (docElem.scrollTop > offsetTop) {
                if (!el.classList.contains('fixed-top')) {
                    el.classList.add('fixed-top');

                    el.style.top = typeof binding.value === 'number'
                        ? `${binding.value}px`
                        : `0px`;
                }
            } else {
                if (el.classList.contains('fixed-top')) {
                    el.classList.remove('fixed-top');

                    el.style.top = null;
                }
            }
        };

        window.addEventListener('scroll', listener);
    },
    unbind: function () {
        window.removeEventListener('scroll', listener);
    }
};
