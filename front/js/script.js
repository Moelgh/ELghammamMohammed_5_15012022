
fetch('http://localhost:3000/api/products')
  
  .then(res => res.json())  
  .then(data => { 
    showProducts(data);
  })
  .catch(_error => {
    alert('Oops ! Le serveur ne répond pas, suivez les instructions dans le READ.me.');
  });

function showProducts(data) {
    
    for (product of data) {
        
        const itemCard = document.getElementById('items');
        itemCard.innerHTML +=`
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>
      `; 
    }
}

