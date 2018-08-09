import '../css/index.css';
import offset from 'document-offset';

const className = 'fixed-top';
let listener, offsetTop, top, width, onResize;

export default {
    name: 'fixed-top',
    bind: function (el, binding) {
        top = `${typeof binding.value === 'number' ? binding.value : 0}px`;

        listener = function () {
            const docElem = document.documentElement || document.body;

            if (!el.classList.contains(className)) {
                try {
                    offsetTop = offset(el).top;
                    width = el.getBoundingClientRect().width;
                } catch(e) {
                    return;
                }
            }

            const scrollTop = docElem.scrollTop || document.body.scrollTop;

            if (scrollTop <= offsetTop) {
                if (el.classList.contains(className)) {
                    el.classList.remove(className);
                }

                el.style.width = '100%';
            }

            else {
                el.classList.add(className);
                el.style.width = `${width}px`;

                el.style.top = top;
            }
        };

        onResize = function (ev) {
            if (el.classList.contains(className)) {
                el.classList.remove(className);
            }

            el.style.width = '100%';
        };


        window.addEventListener('scroll', listener);

        window.addEventListener('resize', onResize);
    },
    update: function(el, binding) {
        top = `${typeof binding.value === 'number' ? binding.value : 0}px`;

        if (el.classList.contains(className)) {
            el.style.top = top;
        }
    },
    unbind: function (el) {
        window.removeEventListener('scroll', listener);

        window.removeEventListener('resize', onResize);
    }
};
