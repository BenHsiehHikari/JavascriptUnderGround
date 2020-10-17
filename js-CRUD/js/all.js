const ablumURL = 'https://jsonplaceholder.typicode.com/photos';
const url = ablumURL + '?_limit=5';

function createNode(element) {
  return document.createElement(element); 
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetchData();
async function fetchData(){
  const response = await fetch( url ,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  const tbody = document.querySelector('#tbody');
  data.map(function(item){
    let tr = createNode('tr');
    let th = createNode('th');
    let td1 = createNode('td');
    let td2 = createNode('td');
    let td3 = createNode('td');
    let td4 = createNode('td');
    let img = createNode('img');
    let iEdit = createNode('i');
    let iDel = createNode('i');

    th.textContent = item.id;
    td1.textContent = item.title;

    td2.classList.add("album-pic");
    img.src = item.thumbnailUrl;
    img.alt = `album${item.id}`;

    iEdit.className = "fas fa-edit btnedit";
    iDel.className = "fas fa-trash-alt btndelete";
    
    append(tr, th);
    append(tr, td1);

    append(td2, img);
    append(tr, td2);

    append(td3, iEdit);
    append(tr, td3);

    append(td4, iDel);
    append(tr, td4);

    append(tbody, tr);
  })
}

async function createAlbum(){
  const url = 'https://jsonplaceholder.typicode.com/photos?_limit=50';
  const response = await fetch( url, {
    method: 'POST',
    credentials: 'include', 
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body:JSON.stringify({
      albumId: 1,
      title: 'foo',
      url: 'https://via.placeholder.com/600/cef542',
      thumbnailUrl: 'https://via.placeholder.com/150/cef542',
    }), 
  });
  const data = await response.json();
  console.log(data);
}

async function updateData(){
  const url = 'https://jsonplaceholder.typicode.com/photos/1';
  const response = await fetch( url, {
    method: 'PUT',
    body:JSON.stringify({
      id:1,
      albumId: 1,
      title: 'ben',
      url: 'https://via.placeholder.com/600/cef545',
      thumbnailUrl: 'https://via.placeholder.com/150/cef545',
    }), 
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  console.log(data);
}

async function deleteData(){
  const url = 'https://jsonplaceholder.typicode.com/photos/1';
  const response = await fetch(url, {
    method: 'DELETE',
  })
  const data = await response.json();
  console.log(data);
}






