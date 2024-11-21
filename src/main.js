import './style.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// make v-fallback usable in all components
const setSrc = (evt) => {
    const el = evt.currentTarget;
    el.setAttribute("src", el.fallback);
    el.setAttribute("data-fallback", true);
    el.fallback = '';
};

const _listener = (evt) => setSrc(evt);

app.directive('fallback', {
    /* ... */
    created: (el, binding) => {
        el.fallback = binding.value;
        el.addEventListener("error", _listener);
    },
    unmounted(el) {
        el.removeEventListener("error", _listener);
    }
});

app.use(router);

app.mount('#app');
