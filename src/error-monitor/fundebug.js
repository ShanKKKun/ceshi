/* eslint-disable */
import Vue from 'vue';

if (process.env.NODE_ENV === 'production') {
  const fundebug = require('fundebug-javascript');
  fundebug.apikey = 'bf492e6974b2e6eb2a2d9f76c9dc27bbe927b93de3962517a84da479683cee8e';
  fundebug.silentVideo = false;
  fundebug.silentConsole = true;
  function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';

    const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? `component <${name}>` : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ` at ${vm.$options && vm.$options.__file}` : '');
  }

  Vue.config.errorHandler = function (err, vm, info) {
    const componentName = formatComponentName(vm);
    const propsData = vm.$options && vm.$options.propsData;

    fundebug.notifyError(
      err,
      {
        metaData:
        {
          componentName,
          propsData,
          info,
        },
      },
    );
  };
}