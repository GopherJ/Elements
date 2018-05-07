export default function visible(el, binding) {
    if (binding.value) {
        el.style.visibility = 'visible';
    }
    else {
        el.style.visibility = 'hidden';
    }
};


