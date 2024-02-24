<template>
  <router-view/>
</template>
<script>
import {Request} from "@/request/Request";

export default {
  setup: () => {
    setInterval(() => {
      let expire = localStorage.getItem("expire_time");
      if (expire != null || expire !== undefined) {
        let expire_time = Number.parseInt(expire);
        let now_time = new Date().getTime() / 1000;
        if (expire_time - now_time <= 180)
          Request.post('/account/token', {}, context => {
            localStorage.setItem("token", context.data.token);
            localStorage.setItem("expire_time", context.data.expire_time);
          });
      }
    }, 60000);
  }
}
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  overflow: hidden;
}
</style>
