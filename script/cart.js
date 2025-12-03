let cartHtml = `
    <tr>
        <th>Predmet</th>
        <th>Cena</th>
        <th>Količina</th>
        <th>Ukupno</th>
        <th>Ukloni</th>
    </tr>
`;

let ukupno = JSON.parse(localStorage.getItem("ukupnoo")) || 0;
let cartNiz = JSON.parse(localStorage.getItem("cart")) || [];
let empty = cartNiz.length === 0;

const formatPrice = () => {
    let br1 = 0, br2 = 0, br3 = 0, price1 = 0, price2 = 0, price3 = 0; 
    cartNiz.forEach(c => {
        if(c[0] == "Auto" || c[0] == "Kvad/Traktor"){
            const count = c[3]
            br1 += count;
        } else if (c[0] == "Moto"){
            const count = c[3]
            br2 += count;
        } else{
            const count = c[3]
            br3 += count;
        }
    });

    for(let i = 0; i < br1; i++){
        if(i == 1){
            price1 += 2000;
        } else{
            price1 += 2500;
        }
    }

    for(let i = 0; i < br2; i++){
        if(i == 1){
            price2 += 1500;
        } else{
            price2 += 2000;
        }
    }

    if( br3 - (br1 + br2) > 0){
        let broj = br3 - (br1 + br2)
        price3 += broj * 1500;
    }

    return price1 + price2 + price3;
}

// Formatiranje broja za prikaz (npr. 2500 -> 2.500)
function formatNumber(num) {
    return num.toLocaleString("sr-RS");
}

const renderCart = () => {
    if (cartNiz.length === 0) {
        document.getElementById("cart-table").innerHTML = `
            <h2 style="text-align:center; font-weight: 100; display:flex; align-items:center; height:50vh; width:100vw; justify-content: center">
                Korpa je Prazna <i class="fa-solid fa-trash"></i>
            </h2>`;
        document.getElementById("numb-items").textContent = "(0)";
        empty = true;
        ukupno = 0;
        localStorage.setItem("ukupnoo", "0");
        document.getElementById("ukupno").textContent = " /";
        document.getElementById("ukupnoo").textContent = " /";
        document.getElementById("pay").style.display = "none";
        document.getElementById("cule").style.display = "none";
        document.getElementById("cart-numb").innerHTML = 0;
        return;
    }

    document.getElementById("pay").style.display = "inline";
    document.getElementById("cule").style.display = "block";
    let html = window.innerWidth >= 600 ? cartHtml : "";

    cartNiz.forEach((niz, index) => {
        html += `
            <tr>
                <td class="product-info" data-label="Predmet">
                    <img src="${niz[5]}" alt="Product" style="max-width:80px;">
                    <div><strong>${niz[1] == "Klasican"? "Ram" : "Tablica"} (${niz[0]}, ${niz[1]})</strong></div>
                </td>
                <td data-label="Cena">${formatNumber(niz[2])} RSD</td>
                <td data-label="Količina">
                    <div class="qty-control">
                        <button onclick="remove1(event)" data-index="${index}">-</button>
                        <input type="number" value=${niz[3]} min="1" max="10" readonly class="count">
                        <button onclick="add1(event)" data-index="${index}">+</button>
                    </div>
                </td>
                <td data-label="Ukupno" class="subtotal">${formatNumber(niz[4])} RSD</td>
                <td class="remove-item" data-index="${index}" data-label="Ukloni">⛌</td>
            </tr>
        `;
    });

    document.getElementById("ukupno").textContent = " " + formatNumber(ukupno) + " RSD";
    document.getElementById("ukupnoo").textContent = " " + formatNumber(formatPrice()) + " RSD";
    document.getElementById("cart-table").innerHTML = html;
    document.getElementById("numb-items").innerHTML = "(" + cartNiz.length + ")";
    document.getElementById("cart-numb").innerHTML = cartNiz.length;

    const totalPriceEl = document.getElementById("total-price");
    let total = JSON.parse(localStorage.getItem("ukupnoo"));
    totalPriceEl.textContent = formatNumber(total) + " RSD";

    empty = false;
};

// Dodavanje u korpu
const addToCart = (e) => {
    const btn = e.currentTarget;
    const value = btn.getAttribute("data-value");

    if(value === "tablica"){
        console.log(value)
        const selectValue = document.querySelector(".modern-select-display").getAttribute("data-value");
        const o2 = document.getElementById("o2").checked;

        let tip = selectValue == 0 ? "Auto" :
                  selectValue == 1 ? "Moto" : "Kvad/Traktor";
        let dizajn = o2 ? "Minimalni" : "Standardni";
        let cena = selectValue == 0 || selectValue == 2 ? 2500 : 2000;

        html2canvas(document.getElementsByClassName('plate')[selectValue], { scale: 0.8 }).then(function(canvas) {
            const plateImage = canvas.toDataURL('image/png');

            let niz = [tip, dizajn, cena, 1, cena, plateImage];
            cartNiz.push(niz);
            ukupno += cena;

            localStorage.setItem("ukupnoo", JSON.stringify(ukupno));
            localStorage.setItem("cart", JSON.stringify(cartNiz));

            renderCart();
        });

    } else if(value === "ram") {
        console.log(value)
        const font = document.getElementById("font-frame-text").textContent;
        let tip = font === "Euro" ? "Euro" : "Arial";
        let dizajn = "Klasican";
        let cena = 1500;

        html2canvas(document.getElementById("frame"), { scale: 0.5 }).then(function(canvas) {
            const plateImage = canvas.toDataURL('image/png');

            let niz = [tip, dizajn, cena, 1, cena, plateImage];
            cartNiz.push(niz);
            ukupno += cena;

            localStorage.setItem("ukupnoo", JSON.stringify(ukupno));
            localStorage.setItem("cart", JSON.stringify(cartNiz));

            renderCart();
        });
    }
};

// Brisanje stavke
document.getElementById("cart-table").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const index = e.target.getAttribute("data-index");
        ukupno -= cartNiz[index][4];
        cartNiz.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartNiz));
        localStorage.setItem("ukupnoo", JSON.stringify(ukupno));
        renderCart();
    }
});

function add1(e){
    const index = e.target.getAttribute("data-index");
    if(document.getElementsByClassName("count")[index].value < 10){
        const count = parseInt(document.getElementsByClassName("count")[index].value);
        cartNiz[index][3] = count + 1;
        cartNiz[index][4] = cartNiz[index][3] * cartNiz[index][2];
        localStorage.setItem("cart", JSON.stringify(cartNiz));

        let cena = cartNiz[index][0] == "Auto" || cartNiz[index][0] == "Kvad/Traktor" ? 2500 :
                   cartNiz[index][0] == "Moto" ? 2000 : 1500;

        ukupno += cena;
        localStorage.setItem("ukupnoo", JSON.stringify(ukupno));
        renderCart();
    }
}

function remove1(e){
    const index = e.target.getAttribute("data-index");
    if(document.getElementsByClassName("count")[index].value > 1){
        const count = parseInt(document.getElementsByClassName("count")[index].value);
        cartNiz[index][3] = count - 1;
        cartNiz[index][4] = cartNiz[index][3] * cartNiz[index][2];
        localStorage.setItem("cart", JSON.stringify(cartNiz));

        let cena = cartNiz[index][0] == "Auto" || cartNiz[index][0] == "Kvad/Traktor" ? 2500 :
                   cartNiz[index][0] == "Moto" ? 2000 : 1500;

        ukupno -= cena;
        localStorage.setItem("ukupnoo", JSON.stringify(ukupno));
        renderCart();
    }
}

document.getElementById("add-to-cart-btn").addEventListener("click", addToCart);
document.getElementById("add-to-cart-btn2").addEventListener("click", addToCart);

renderCart();

// Animacija dugmeta kada se klikne
document.querySelectorAll(".button-52").forEach(btn => {
    btn.addEventListener("click", function() {
      this.classList.add("added");
      setTimeout(() => {
        this.classList.remove("added");
      }, 3000); // posle 3s ukloni klasu
    });
});
