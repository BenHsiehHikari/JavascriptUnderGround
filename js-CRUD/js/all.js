const productURL = 'http://localhost:1337/products/';
let ablumid = document.querySelector('#ablumid');
let ablumtitle = document.querySelector('#ablumtitle');
let photourl = document.querySelector('#photourl');
let btnCreate = document.querySelector('#btn-create');
let btnRead = document.querySelector('#btn-read');
let btnUpdate = document.querySelector('#btn-update');
let btnDeleteAll = document.querySelector('#btn-delete');

function createNode(element) {
  return document.createElement(element); 
}

function append(parent, el) {
  return parent.appendChild(el);
}

async function fetchData(){
  const response = await fetch( productURL ,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const productList = await response.json();
  console.log(productList);
  const tbody = document.querySelector('#tbody');
  productList.map(function(item){
      let tr = createNode('tr');
      let th = createNode('th');
      let td1 = createNode('td');
      let td2 = createNode('td');
      let td3 = createNode('td');
      let td4 = createNode('td');
      let td5 = createNode('td');
      let img = createNode('img');
      let iEdit = createNode('i');
      let iDel = createNode('i');
  
      th.textContent = item.id;

      td1.classList.add("name");
      td1.textContent = item.productName;
  
      td2.classList.add("seller");
      td2.textContent = item.productSeller;

      td3.classList.add("price");
      td3.textContent = item.productPrice;

      td4.classList.add("edit");
      iEdit.className = "fas fa-edit btnedit";

      td5.classList.add("delete");
      iDel.className = "fas fa-trash-alt btndelete";
      
      append(tr, th);

      append(tr, td1);
  
      append(tr, td2);
  
      append(tr, td3);
  
      append(td4, iEdit);
      append(tr, td4);

      append(td5, iDel);
      append(tr, td5);
  
      append(tbody, tr);
    })
}


async function createAlbum(){
  const response = await fetch( productURL , {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body:JSON.stringify({
      productName: 'iphone 12',
      productSeller: '船長',
      productPrice: 30000,
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





window.addEventListener('load', function(){
  fetchData();
})

btnCreate.addEventListener('click', function(){
  
});
