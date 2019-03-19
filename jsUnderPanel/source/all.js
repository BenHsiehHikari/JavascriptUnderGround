const HomePage = {
    template: `
    <div class="page HomePage">
    </div>
  `
};
const nineninemath = {
    template: `
    <div class="page Page99">
      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-99/index.html" target="_blank"><h1>Javascript作法</h1></a>
      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-99/vue-99.html" target="_blank"><h1>Vue.js作法</h1></a>
    </div>
  `
};
const timeclock = {
    template: `
    <div class="page timeclock">
      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js_clock/index.html" target="_blank"><h1>作品展示</h1></a>
    </div>
  `
};
const calculator = {
    template: `
    <div class="page ContactPage">
      <a href=""><h1>作品展示</h1></a>
    </div>
  `
};
const timezone = {
    template: `
    <div class="page ContactPage">
      <a href=""><h1>作品展示</h1></a>
    </div>
  `
};
const NotFoundPage = {
    template: `
    <div class="page NotFoundPage">
      <h1>404</h1>
    </div>
  `
};


const router = new VueRouter({
    routes: [{
            path: '/',
            component: HomePage
        },
        {
            path: '/99math',
            component: nineninemath
        },
        {
            path: '/timeclock',
            component: timeclock
        },
        {
            path: '/calculator',
            component: calculator
        },
        {
            path: '/timezone',
            component: timezone
        },
        {
            path: '*',
            component: NotFoundPage
        },
    ]
});

const vm = new Vue({
    el: "#app",
    router,
});