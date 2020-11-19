// const fetch = require('node-fetch');

import { ROUTE_META_DATA_API } from './b.js';

const LINKS_API = "http://60.248.40.4:8008/ebus-ty-strapi/main-menu-links";

const queryButton = document.getElementById('queryButton');

class BasicComponent {
  constructor({
    el,
    props={},
    children,
  }) {
    this.props = props;
    this.el = el;
    this.children = children;
    this.el && this.render();
    this.appendChildren();
  }

  appendChildren() {
    const haveChildren = this.children && this.children.length > 0;

    if(haveChildren) {
      for (const child of this.children) {
        const CHILD = new child(this.props);
        if (CHILD.hasOwnProperty('el')) {
          this.el.appendChild(CHILD.el);
        }
      }
    }
  }

  render() {}
}

class LinkTable extends BasicComponent {
  constructor(props) {
    super({
      ...props,
      el: document.createElement('table'),
      children: [
        // RouteMetaDataTable,
      ]
    });
    this.queryButton = queryButton;
    this.queryButton.addEventListener('click', () => {
      this.handleQueryLinks();
    });
    this.handleQueryLinks();
  }

  handleQueryLinks() {
    // console.log('querythis');
    getLinksData()
      .then(dataList => {
        dataList.forEach((data, index) => {
          this.addOneRow({
            ...data,
            index,
          });
        });
      });
  }

  addOneRow({
    index, title, link
  }) {
    this.el.innerHTML += `
      <tr data-id=${index}>
        <th class="id" colspan="2">${index + 1}</th>
        <td class="title" colspan="2">${title}</td>
        <td class="link" colspan="2">${link}</td>
      </tr>
    `;
  }

  render() {
    this.el.innerHTML += `
      <thead>
        <tr>
          <th colspan="2">Index</th>
          <th colspan="2">Title</th>
          <th colspan="2">Link</th>
        </tr>
      </thead>
    `;
  }
}

class RouteMetaDataTable extends BasicComponent {
  constructor(props) {
    super({
      ...props,
      el: document.createElement('div'),
    });
    this.handleQueryMetaData();
  }

  static getMetaData() {
    return fetch(ROUTE_META_DATA_API.read())
      .then(res => res.json())
      .then(res => res);
  }

  handleQueryMetaData() {
    RouteMetaDataTable.getMetaData()
      .then(listData => {
        listData.map((data, i) => {
          this.renderOneLine(data, i);
        });
      });
  }

  getMetaType({
    isAllBarrierFree, isPartOfBarrierFree
  }) {
    const haveMetaType = (isAllBarrierFree || isPartOfBarrierFree);
    const res = 
    haveMetaType ? (
      isAllBarrierFree ? '無障礙' : '部分無障礙'
    ) : '一般公車';

    return res;
  }

  renderOneLine(singleMetaTypeData, index) {
    const metaType = this.getMetaType(singleMetaTypeData);
    const html = `
      <tr data-id=${index}>
        <td class="title" colspan="2">${singleMetaTypeData.routeId}</td>
        <td class="title" colspan="2">${metaType}</td>
      </tr>
    `;
    this.el.table.innerHTML += html;
    return html;
  }
  
  render() {
    this.el.innerHTML = `
      <div>
        <h2>Content Here</h2>
        <table>
          <thead>
            <tr>
              <th colspan="2">RouteId</th>
              <th colspan="2">MetaType</th>
            </tr>
          </thead>
        </table>
      </div>
    `;
    this.el.table = this.el.getElementsByTagName('table') && this.el.getElementsByTagName('table')[0];
  }
}

const getLinksData = () => {
  return fetch(LINKS_API)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
};

class ContentPart extends BasicComponent {
  constructor(props) {
    super({
      ...props,
      el: document.createElement('div'),
      children: [
        LinkTable,
        RouteMetaDataTable,
      ]
    });
  }
}

class App extends BasicComponent {
  render() {
    this.el.innerHTML = `
      <div>
        <h1>APP</h1>
      </div>
    `;
  }
}

function init() {
  // new LinkTable();
  new App({
    el: document.getElementById('root'),
    children: [ContentPart]
  });
}
init();