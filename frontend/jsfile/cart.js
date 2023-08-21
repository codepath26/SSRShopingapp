const cartList = document.getElementById('cart');
 const orderNowButton = document.getElementById('orderNowButton');

 document.addEventListener('DOMContentLoaded' , addcarts)

    // Simulated cart data
    const cartItems = [
      { title: 'Product 1', quantity: 2 },
      { title: 'Product 2', quantity: 1 },
      // Add more cart items here
    ];

    // Populate the cart list with items
    cartItems.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      cartItem.innerHTML = `
        ${item.title}
        <span class="badge badge-primary badge-pill">${item.quantity}</span>
        <button class="btn btn-danger btn-sm delete-button">Delete</button>
      `;
      cartList.appendChild(cartItem);
    });

    // Add event listener to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', removeCartItem);
    });

    function removeCartItem(event) {
      const listItem = event.target.closest('.list-group-item');
      cartList.removeChild(listItem);
    }

    // Add event listener to "Order Now" button
    orderNowButton.addEventListener('click', placeOrder);
    
    function placeOrder() {
      alert('Order placed successfully!');
      // Reset the cart (for demonstration)
      cartList.innerHTML = '';
    }