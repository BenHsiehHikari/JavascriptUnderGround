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

//render
const renderProducts = (id, index, name, seller, price) => {
  tbody.innerHTML += `
      <tr data-id=${id}>
        <th class="id" scope="row">${index+1}</th>
        <td class="name">${name}</td>
        <td class="seller">${seller}</td>
        <td class="price">${price}</td>
        <td class="edit"><i id="edit-product" class="fas fa-edit btnedit"></i></td>
        <td class="delete"><i id="delete-product" class="fas fa-trash-alt btndelete"></i></td>
      </tr>
  `;
}

//Post
async function createproduct(name, seller, price){
    const response = await fetch( productURL , {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify({
        productName: name,
        productSeller: seller,
        productPrice : price
      }), 
    });
    const data = await response.json();
    return data;
}
btnCreate.addEventListener('click', function(e){
  e.preventDefault();
  createproduct(productname.value, productseller.value, productprice.value);
});

//Get
async function fetchData(){
  const responseprdouct = await fetch( productURL ,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const productList = await responseprdouct.json();
  return productList;
  location.reload();
}
fetchData().then(function(dataList){
  dataList.map((item, index, array) => {
    renderProducts(
      item.id,
      index,
      item.productName,
      item.productSeller,
      item.productPrice
    );
  });
});
btnRead.addEventListener('click', function(e){
  e.preventDefault();
  location.reload();
});

//Put
async function updateData(ID){
  const url = `http://localhost:1337/products/${ID}`;
  const response = await fetch( url, {
    method: 'PUT',
    body:JSON.stringify({
      productName: productname.value,
      productSeller: productseller.value,
      productPrice : productprice.value
    }), 
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  console.log(data);
  location.reload();
}

//Delete
async function deleteProduct(ID){
  const url = `http://localhost:1337/products/${ID}`;
  const response = await fetch(url, {
    method: 'DELETE',
  })
  const data = await response.json();
  console.log(data);
  location.reload();
}

//delete / update events
tbody.addEventListener('click' , function(e){
  e.preventDefault();
  let delButtonPressed = e.target.id == 'delete-product';
  let editButtonPressed = e.target.id == 'edit-product';

  let id = e.target.parentElement.parentElement.dataset.id;

  //Update
  if(editButtonPressed){
    const parent = e.target.parentElement.parentElement;
    let nameContent = parent.querySelector('.name').textContent;
    let sellerContent = parent.querySelector('.seller').textContent;
    let priceContent = parent.querySelector('.price').textContent;

    productname.value = nameContent;
    productseller.value = sellerContent;
    productprice.value = priceContent;
  }
  //Update put
  btnUpdate.addEventListener('click', function(){
    e.preventDefault();
    updateData(id);
  })

  //Delete
  if(delButtonPressed){
    deleteProduct(id);
  }

});

//delete all
btnDeleteAll.addEventListener('click', function(){
  tbody.innerHTML = "";
})
