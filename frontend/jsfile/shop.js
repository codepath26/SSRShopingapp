let item = document.getElementById('data');

document.addEventListener('DOMContentLoaded',fetchdata)
item.addEventListener('click' , addtocart);

async function fetchdata (e){
const products = await axios.get('http://localhost:4000')

const items = products.data;
items.forEach(product=> {
  item.innerHTML += `<div class="col-md-4">
  <div class="card">
    <img src="${product.imageUrl}" class="card-img-top" alt="Product Image">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text">${product.price}</p>
      <a href="/htmlFile/products.html" class="btn btn-primary">Details</a>
      <a href="/htmlFile/cart.html" class="btn btn-primary add-to-cart">Add to Cart</a>
    </div>
  </div>
</div>`
});

}

