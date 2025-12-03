const popup = document.getElementById("popup");
const body1 = document.getElementById("body");
const buttonPopup = document.getElementById("closePopup");
if (navigator.userAgent.includes("Instagram")) {
    popup.style.display = "flex";
    body1.style.opacity = "0.3";
}

buttonPopup.addEventListener("click",function(){
    popup.style.display = "none";
    body1.style.opacity = "1";
})


window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
  
    setTimeout(() => {
      if (overlay) {
        overlay.style.display = "none";
      }
    }, 2000);
  });
  
const cartOpen = document.getElementById("cart");
const cartOpen1 = document.getElementById("cart1");
const cartClose = document.getElementById("cart-close")
document.getElementById("cart-page").style.display="none";
cartOpen.addEventListener("click", () => {
   document.getElementById("cart-page").style.display="inline";
   if(window.innerWidth <=900)
   isMenu = false;
   updateMenu();
   document.body.style.overflowY = "hidden"
});

cartOpen1.addEventListener("click", () => {
  document.getElementById("cart-page").style.display="inline";
  if(window.innerWidth <=900)
  isMenu = false;
  updateMenu();
  document.body.style.overflowY = "hidden"
});


cartClose.addEventListener("click", () => {
     document.body.style.overflowY = "auto"
  document.getElementById("cart-page").style.display="none";
});

