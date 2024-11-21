const setSrc = (evt) => {
    const el = evt.currentTarget;
    el.setAttribute("src", el.fallback);
    el.fallback = "";
    el.removeEventListener("error", _listener);
};

const _listener = (evt) => setSrc(evt);

export default {
    bind(el, binding) {
        el.fallback = binding.value;
        el.addEventListener("error", _listener);
    },

    unbind(el) {
        el.removeEventListener("error", _listener);
    },
};