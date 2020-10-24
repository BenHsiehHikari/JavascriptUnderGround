const api = "http://60.248.40.4:8008/ebus-ty-strapi/main-menu-links";

const queryButton = document.getElementById('queryButton');
class LinkTable {
  constructor() {
    this.table = document.getElementById('linkTable');
    this.queryButton = queryButton;
    this.queryButton.addEventListener('click', () => {
      this.handleQueryLinks();
    });
    this.render();
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
    this.table.innerHTML += `
      <tr data-id=${index}>
        <th class="id" colspan="2">${index + 1}</th>
        <td class="title" colspan="2">${title}</td>
        <td class="link" colspan="2">${link}</td>
      </tr>
    `;
  }
  render() {
    this.table.innerHTML += `
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
const getLinksData = () => {
  return fetch(api)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
};
function init() {
  new LinkTable();
}
init();