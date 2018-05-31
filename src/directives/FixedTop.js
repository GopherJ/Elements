import '../css/index.css';
import offset from 'document-offset';

const className = 'fixed-top';
let listener, offsetTop, top, width;

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
                width = el.getBoundingClientRect().width;
            }

            // scroll to the threshold
            if (docElem.scrollTop > offsetTop) {
                el.classList.add(className);
                el.style.width = `${width}px`;

                // calculate the top
                el.style.top = top;
            } else {
                el.classList.remove(className);

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
