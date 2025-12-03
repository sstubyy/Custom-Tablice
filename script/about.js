const aboutContainer = document.getElementsByClassName("container2")[0];
window.addEventListener("DOMContentLoaded", function(){
        aboutContainer.style.opacity = "1";
        aboutContainer.style.transform = "scale(1)";
});

window.addEventListener("DOMContentLoaded", function(){
    var customer = document.getElementById("customer");
    var counter = 0;
    function animatetext(){
        var rect= customer.getBoundingClientRect();
        if (rect.top * 1.1 <= window.innerHeight && rect.bottom > 0) {
            const interval = setInterval(() => {
                if (counter <= 10000) {
                    
                    customer.textContent = counter + "+ ";
                    counter++;
                } else {
                    clearInterval(interval);
                }
            }, 10); // Adjust interval time for smoother animation
        }
    }
    window.addEventListener("scroll", animatetext);
});

const serviceBox = document.querySelectorAll(".service");
window.addEventListener("scroll",function(){
    for(let i=0; i<serviceBox.length; i++){
        const rect = serviceBox[i].getBoundingClientRect();
        if(rect.top * 1.1 <= this.window.innerHeight){
            serviceBox[i].style.opacity= 1;
            serviceBox[i].style.transform = "scale(1)";
            serviceBox[i].style.transform = "translateX(0)";
        }
    }
});