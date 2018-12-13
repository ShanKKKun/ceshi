import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Vue from 'vue';

if (process.env.NODE_ENV === 'production') {
  window.$Raven = Raven;
  window.$Raven
    .config('https://a05f50d763654215af5f4892889ff2e6@sentry.io/1277081')
    .addPlugin(RavenVue, Vue)
    .install();
}
