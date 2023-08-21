let Title = document.getElementById('title')
let ImageUrl = document.getElementById('imageUrl')
let Price= document.getElementById('price')
let Description= document.getElementById('description')
let form = document.getElementById('form-data')

form.addEventListener('submit', adddata);

async function adddata (e){
  e.preventDefault();
  let obj = {
    title: Title.value,
    imageUrl: ImageUrl.value,
    price: Price.value,
    description: Description.value,
    }
    let jsonString = JSON.stringify(obj);
    try{
      let product = await axios.post('http://localhost:4000/admin/add-product',jsonString,{headers: {
        'Content-Type': 'application/json'
      }});
      console.log(product.data)
    }catch(err){
      console.log(err)
    }
}