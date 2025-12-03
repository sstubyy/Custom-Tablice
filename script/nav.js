
    let isMenu = window.innerWidth >= 900;
    let lastScroll = 0;
    const header = document.getElementById("header");
    const navMenu = document.getElementById("nav-menu");
    const bars = [document.getElementById("bar1"), document.getElementById("bar2"), document.getElementById("bar3")];

    function toggleMenu() {
      isMenu = !isMenu;
      updateMenu();
    }

    function updateMenu() {
      if (isMenu) {
        navMenu.style.opacity = "1";
        navMenu.style.visibility = "visible";
        if (window.innerWidth <= 900) {
          navMenu.style.transform = "translate(-50%,-50%)";
        } else {
          navMenu.style.transform = "none";
        }

        bars[0].style.backgroundColor = "black";
        bars[0].style.transform = "translateX(-5px) rotate(90deg)";
        bars[1].style.backgroundColor = "black";
        bars[1].style.transform = "rotate(90deg)";
        bars[1].style.width = "20px";
        bars[2].style.backgroundColor = "black";
        bars[2].style.transform = "translateX(5px) rotate(90deg)";
      } else {
        navMenu.style.opacity = "0";
        navMenu.style.visibility = "hidden";
        if (window.innerWidth <= 900) {
          navMenu.style.transform = "translate(-50%,-100%)";
        }

        bars.forEach(bar => bar.style.backgroundColor = "white");
        bars[0].style.transform = "none";
        bars[1].style.transform = "none";
        bars[1].style.width = "17px";
        bars[2].style.transform = "none";
      }
    }

    function handleResize() {
      isMenu = window.innerWidth >= 900;
      updateMenu();
    }

    const customPlates = document.getElementsByClassName("plate-display");

    function handleScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && !isMenu) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0%)";
        navMenu.style.top = "50vh"
      }
      lastScroll = currentScroll;

      if( header.style.transform == "translateY(-100%)"){
        for(let i = 0; i < customPlates.length; i++){
          customPlates[i].style.top="10px";
        }
      }else {
        if(window.innerWidth <= 450){
          for(let i = 0; i < customPlates.length; i++){
            customPlates[i].style.top="70px";
          }
        } else{
          for(let i = 0; i < customPlates.length; i++){
            customPlates[i].style.top="90px";
          }
        }
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", updateMenu);