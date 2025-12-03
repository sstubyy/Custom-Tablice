const contactContainer = document.getElementsByClassName("contact-section")[0];
window.addEventListener("scroll", function(){
    const rect=contactContainer.getBoundingClientRect();
    if(rect.top * 1.2 <= window.innerHeight){
        contactContainer.style.opacity = "1";
        contactContainer.style.transform = "scale(1)";
    }
    else{
        contactContainer.style.opacity = "0";
        contactContainer.style.transform = "scale(0.8)";
    }
});