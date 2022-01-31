
let params = new URL(window.location.href).searchParams;

let newID = params.get('id');

const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
 
  .catch(_error => {
    alert('Oops ! Le serveur ne répond pas, suivez les instructions dans le READ.me.');
  });



const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };

 
  let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

  const addProductLocalStorage = () => {
  productInLocalStorage.push(selection);
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }

  let addConfirm = () => {
    alert('Le produit a bien été ajouté au panier');
  }

  let update = false;
  if (productInLocalStorage) {

   productInLocalStorage.forEach (function (productOk, key) {
    if (productOk.id == newID && productOk.color == selectColors.value) {
      productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      update = true;
      addConfirm();
    }
  });


    if (!update) {
    addProductLocalStorage();
    addConfirm();
    }
  }
  else {
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});

