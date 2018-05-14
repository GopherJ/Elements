import '../css/index.css';
import offset from 'document-offset';

const className = 'fixed-top';
let listener, offsetTop, top;

export default {
    name: 'fixed-top',
    bind: function (el, binding) {
        top = `${typeof binding.value === 'number' ? binding.value : 0}px`;

        listener = function () {
            // docElem
            const docElem = document.documentElement || document.body;

            // save the real offset top
            if (!el.classList.contains(className)) {
                offsetTop = offset(el).top;
            }

            // scroll to the threshold
            if (docElem.scrollTop > offsetTop) {
                if (!el.classList.contains(className)) {
                    el.classList.add(className);
                }

                // calculate the top
                el.style.top = top;
            } else {
                if (el.classList.contains(className)) {
                    el.classList.remove(className);
                }

                el.style.top = null;
            }
        };

        window.addEventListener('scroll', listener);
    },
    update: function(el, binding) {
        top = `${typeof binding.value === 'number' ? binding.value : 0}px`;

        if (el.classList.contains(className)) {
            el.style.top = top;
        }
    },
    unbind: function (el) {
        window.removeEventListener('scroll', listener);
    }
};
