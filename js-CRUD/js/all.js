const productURL = 'http://localhost:1337/products/';
let productid = document.querySelector('#product-id');
let productname = document.querySelector('#product-name');
let productseller = document.querySelector('#product-seller');
let productprice = document.querySelector('#product-price');

let btnCreate = document.querySelector('#btn-create');
let btnRead = document.querySelector('#btn-read');
let btnUpdate = document.querySelector('#btn-update');
let btnDeleteAll = document.querySelector('#btn-delete');

const tbody = document.querySelector('#tbody');
let output = '';

const renderProducts = (products) => {
  products.map(function(item, index, array){
    output += `
      <tr data-id=${item.id}>
        <th class="id" scope="row">${index+1}</th>
        <td class="name">${item.productName}</td>
        <td class="seller">${item.productSeller}</td>
        <td class="price">${item.productPrice}</td>
        <td class="edit"><i id="edit-product" class="fas fa-edit btnedit"></i></td>
        <td class="delete"><i id="delete-product" class="fas fa-trash-alt btndelete"></i></td>
      </tr>
    `;
  });
  tbody.innerHTML = output;
}

function createNode(element) {
  return document.createElement(element); 
}
function append(parent, el) {
  return parent.appendChild(el);
}

async function fetchData(){
  const responseprdouct = await fetch( productURL ,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const productList = await responseprdouct.json();

  const responsecount = await fetch( productURL+'count' ,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const count = await responsecount.json();

  return productList;
}
fetchData().then(function(data){
  const fakeData = [...data];
  // console.log(fakeData);
  renderProducts(fakeData);
})

// async function createproduct(){
//     const response = await fetch( productURL , {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//       body:JSON.stringify({
//         productName: 'lol',
//         productSeller: 'ben',
//         productPrice : 100
//       }), 
//     });
// }

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

async function deleteProduct(){
  const url = `http://localhost:1337/products/`;
  const response = await fetch(url, {
    method: 'DELETE',
  })
  const data = await response.json();
  console.log(data);
  location.reload();
}
deleteProduct();

btnCreate.addEventListener('click', function(){
  fetch(productURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body:JSON.stringify({
      productName: productname.value,
      productSeller: productseller.value,
      productPrice : productprice.value
    })
  })
  .then(res => res.json())
  .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderProducts(dataArr);
  })

  productname.value = "";
  productseller.value = "";
  productprice.value = "";
});


tbody.addEventListener('click' , function(e){
  e.preventDefault();
  let delButtonPressed = e.target.id == 'delete-product';
  let editButtonPressed = e.target.id == 'edit-product';

  let id = e.target.parentElement.parentElement.dataset.id;

  if(delButtonPressed){
    deleteProduct(id);
  }
})