"use strict";
var HomePage = { template: '\n    <div class="page HomePage">\n    </div>\n  ' },

    nineninemath = { template: '\n    <div class="page Page99">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-99/index.html" target="_blank"><h1>Javascript作法</h1></a>\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-99/vue-99.html" target="_blank"><h1>Vue.js作法</h1></a>\n    </div>\n  ' },

    timeclock = { template: '\n    <div class="page timeclock">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js_clock/index.html" target="_blank"><h1>作品展示</h1></a>\n    </div>\n  ' },

    calculator = { template: '\n    <div class="page calculator">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-calc/index.html"><h1>作品展示</h1></a>\n    </div>\n  ' },

    timezone = { template: '\n    <div class="page timezone">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-timezone/index.html"><h1>作品展示</h1></a>\n    </div>\n  ' },

    air = {
        template: '\n    <div class="page air">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-timezone/index.html"><h1>作品展示</h1></a>\n    </div>\n  '
    },

    mathgame = {
        template: '\n    <div class="page mathgame">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-timezone/index.html"><h1>作品展示</h1></a>\n    </div>\n  '
    },

    canvasdraw = {
        template: '\n    <div class="page canvasdraw">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-timezone/index.html"><h1>作品展示</h1></a>\n    </div>\n  '
    },

    OOXX = {
        template: '\n    <div class="page OOXX">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-timezone/index.html"><h1>作品展示</h1></a>\n    </div>\n  '
    },

    NotFoundPage = { template: '\n    <div class="page NotFoundPage">\n      <h1>404</h1>\n    </div>\n  ' },

    router = new VueRouter({
        routes: [{
            path: "/",
            component: HomePage
        }, {
            path: "/99math",
            component: nineninemath
        }, {
            path: "/timeclock",
            component: timeclock
        }, {
            path: "/calculator",
            component: calculator
        }, {
            path: "/timezone",
            component: timezone
        }, {
            path: "/air",
            component: air
        }, {
            path: "/mathgame",
            component: mathgame
        }, {
            path: "/canvasdraw",
            component: canvasdraw
        }, {
            path: "/OOXX",
            component: OOXX
        }, {
            path: "*",
            component: NotFoundPage
        }]
    }),
    vm = new Vue({ el: "#app", router: router });
//# sourceMappingURL=all-dist.js.map