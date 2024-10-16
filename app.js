
const productsDom = document.querySelector(".products-center")
const searchInput =document.querySelector("#search")
const btns = document.querySelectorAll(".btn")
let allProductsData = []; 
const filters = {
    searchItems :"",
}
document.addEventListener("DOMContentLoaded",()=>{
    axios
    .get("http://localhost:3000/items")
    .then((res)=>{
     allProductsData =res.data
     // render products on DOM
     renderProducst(res.data,filters)

    })
    .catch((err)=>console.log(err))
})

function renderProducst(products,_filters) {
 const filteredProducts= products.filter( (p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase())
  }) ;
  console.log(filteredProducts);
  //render to DOM
  productsDom.innerHTML = ""
  filteredProducts.forEach((item) => {
    //creat
    //contetn 
    //append to .products
    const productsDiv =document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML=`
    
     <div class="img-container"> 
      <img src=${item.image} >
      </div>
      <div class="products-desc">
      <p class="product-price">${item.price}$</p>
      <p class="product-title">${item.title}</p>
      </div>
              `
              productsDom.appendChild(productsDiv);
            });
}


searchInput.addEventListener('input',(e) =>{
    console.log(e.target.value);
    filters.searchItems= e.target.value;
    renderProducst(allProductsData,filters)
})




//fillter based on groups

btns.forEach((btn)=>{
  btn.addEventListener("click" ,(e)=>{
    const filter = e.target.dataset.filter;

    console.log(filter);
    filters.searchItems=filter
    renderProducst(allProductsData,filters)
  })
})