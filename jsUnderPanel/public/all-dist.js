"use strict";var HomePage={template:'\n    <div class="page HomePage">\n    </div>\n  '},nineninemath={template:'\n    <div class="page Page99">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-99/index.html" target="_blank"><h1>Javascript作法</h1></a>\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js-99/vue-99.html" target="_blank"><h1>Vue.js作法</h1></a>\n    </div>\n  '},timeclock={template:'\n    <div class="page timeclock">\n      <a href="https://benhsiehhikari.github.io/JavascriptUnderGround/js_clock/index.html" target="_blank"><h1>作品展示</h1></a>\n    </div>\n  '},calculator={template:'\n    <div class="page ContactPage">\n      <a href=""><h1>作品展示</h1></a>\n    </div>\n  '},timezone={template:'\n    <div class="page ContactPage">\n      <a href=""><h1>作品展示</h1></a>\n    </div>\n  '},NotFoundPage={template:'\n    <div class="page NotFoundPage">\n      <h1>404</h1>\n    </div>\n  '},router=new VueRouter({routes:[{path:"/",component:HomePage},{path:"/99math",component:nineninemath},{path:"/timeclock",component:timeclock},{path:"/calculator",component:calculator},{path:"/timezone",component:timezone},{path:"*",component:NotFoundPage}]}),vm=new Vue({el:"#app",router:router});
//# sourceMappingURL=all-dist.js.map