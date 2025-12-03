let lastFocusedInput = null;

const leftInput = document.getElementById("left-input");
const centerInput = document.getElementById("center-input");
const rightInput = document.getElementById("text-input");

// Update last focused input on focus
[leftInput, centerInput, rightInput].forEach(input => {
    input.addEventListener("focus", () => {
        lastFocusedInput = input;
    });
});


const write = () => {
    const selectedRadio = document.querySelector('.design-select input:checked');
    const isO2 = selectedRadio && selectedRadio.id === "o2";
    const layout = parseInt(document.getElementById("selectedOption").getAttribute("data-value"), 10);


    const leftInput = document.getElementById("left-input");
    const centerInput = document.getElementById("center-input");
    const rightInput = document.getElementById("text-input");

    const value = parseInt(rightInput.getAttribute("data-value"), 10);

    const leftElements = document.getElementsByClassName("left-plate-text-display");
    const middleElements = document.getElementsByClassName("middle-plate-text-display");
    const rightElements = document.getElementsByClassName("right-plate-text-display");

    // Prepare input values
    const leftRaw = leftInput.value;
    const centerRaw = centerInput.value;
    const rightRaw = rightInput.value;

    // Format them
    const { formatted: lFormat, virtualLength: lLen } = formatInput(leftRaw);
    const { formatted: cFormat, virtualLength: cLen } = formatInput(centerRaw);
    const { formatted: rFormat, virtualMap, virtualLength: rLen } = formatInput(rightRaw);

    // --- INPUT VISIBILITY & LOGIC ---

    // ============ CASE 1: Layout 0 + o2 ============
    if (layout === 0 && isO2) {
        // Only right input shown
        leftInput.style.display = "none";
        centerInput.style.display = "none";
        rightInput.style.display = "inline-block";

        rightInput.value = rFormat;
        rightInput.setAttribute("maxlength", "12");

        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 12 - rLen);

        if (rightElements[value]) {
            rightElements[value].innerHTML = virtualMap.map(e => e.char).join('').replace(/ /g, '&nbsp;');
            rightElements[value].style.fontSize = (rLen <= 5 || rLen <= 7) ? "80px" : (rLen <= 9 ? "66px" : "55px");
            rightElements[value].style.letterSpacing = (rLen <= 5 || rLen <= 6) ? "17px" : (rLen <= 9 ? "6px" : "1px");
        }
        centerInput.setAttribute("maxlength", "4");
        leftInput.setAttribute("maxlength", "2");
        return;
    }

    // ============ CASE 2: Layout 0 + o1 ============
    if (layout === 0 && !isO2) {
        leftInput.style.display = "inline-block";
        centerInput.style.display = "inline-block";
        rightInput.style.display = "inline-block";

        // Enforce max lengths
        leftInput.value = lLen <= 2 ? lFormat : leftRaw.slice(0, -1);
        centerInput.value = cLen <= 4 ? cFormat : centerRaw.slice(0, -1);
        rightInput.value = rLen <= 8 ? rFormat : rightRaw.slice(0, -1);

        // Update counters
        document.querySelectorAll(".manyLeft")[0].textContent = Math.max(0, 2 - lLen);
        document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 4 - cLen);
        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 8 - rLen);

        // Update display
        if (leftElements[value]) leftElements[value].innerHTML = lFormat.replace(/ /g, '&nbsp;');
        if (middleElements[value]) middleElements[value].textContent = cFormat;
        if (rightElements[value]) rightElements[value].innerHTML = rFormat.replace(/ /g, '&nbsp;');

        rightInput.setAttribute("maxlength", "8");
        centerInput.setAttribute("maxlength", "4");
        leftInput.setAttribute("maxlength", "2");
        return;
    }

    // ============ CASE 3: Layout 1 + o2 ============
    if (layout === 1 && isO2) {
        leftInput.style.display = "none";
        centerInput.style.display = "inline-block";
        rightInput.style.display = "inline-block";

        centerInput.value = cLen <= 4 ? cFormat : centerRaw.slice(0, -1);
        rightInput.value = rLen <= 6 ? rFormat : rightRaw.slice(0, -1);

        document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 4 - cLen);
        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 6 - rLen);

        if (middleElements[value]) middleElements[value].textContent = cFormat;
        if (rightElements[value]) rightElements[value].innerHTML = rFormat.replace(/ /g, '&nbsp;');

        rightInput.setAttribute("maxlength", "6");
        leftInput.setAttribute("maxlength", "2");
        centerInput.setAttribute("maxlength", "4");
        return;
    }

    // ============ CASE 4: Layout 1 + o1 ============
    if (layout === 1 && !isO2) {
        leftInput.style.display = "inline-block";
        centerInput.style.display = "inline-block";
        rightInput.style.display = "inline-block";

        leftInput.value = lLen <= 2 ? lFormat : leftRaw.slice(0, -1);
        centerInput.value = cLen <= 4 ? cFormat : centerRaw.slice(0, -1);
        rightInput.value = rLen <= 6 ? rFormat : rightRaw.slice(0, -1);

        document.querySelectorAll(".manyLeft")[0].textContent = Math.max(0, 2 - lLen);
        document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 4 - cLen);
        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 6 - rLen);

        if (leftElements[value]) leftElements[value].innerHTML = lFormat.replace(/ /g, '&nbsp;');
        if (middleElements[value]) middleElements[value].textContent = cFormat;
        if (rightElements[value]) rightElements[value].innerHTML = rFormat.replace(/ /g, '&nbsp;');

        rightInput.setAttribute("maxlength", "6");
        centerInput.setAttribute("maxlength", "4");
        leftInput.setAttribute("maxlength", "2");
        return;
    }
    if(layout == 2 && isO2){
        leftInput.style.display = "none";
        centerInput.style.display = "inline-block";
        rightInput.style.display = "inline-block";

        centerInput.value = cLen <= 6 ? cFormat : centerRaw.slice(0, -1);
        rightInput.value = rLen <= 10 ? rFormat : rightRaw.slice(0, -1);

        document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 6 - cLen);
        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 10 - rLen);

        if (middleElements[value]) middleElements[value].textContent = cFormat;
        if (rightElements[value]) rightElements[value].innerHTML = rFormat.replace(/ /g, '&nbsp;');

        rightInput.setAttribute("maxlength", "10");
        centerInput.setAttribute("maxlength", "6");
        leftInput.setAttribute("maxlength", "2");
        return;
    }
    if(layout == 2 && !isO2){
        leftInput.style.display = "inline-block";
        centerInput.style.display = "inline-block";
        rightInput.style.display = "inline-block";

        leftInput.value = lLen <= 5 ? lFormat : leftRaw.slice(0, -1);
        centerInput.value = cLen <= 4 ? cFormat : centerRaw.slice(0, -1);
        rightInput.value = rLen <= 10 ? rFormat : rightRaw.slice(0, -1);

        document.querySelectorAll(".manyLeft")[0].textContent = Math.max(0, 5 - lLen);
        document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 4 - cLen);
        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 10 - rLen);

        if (leftElements[value]) leftElements[value].innerHTML = lFormat.replace(/ /g, '&nbsp;');
        if (middleElements[value]) middleElements[value].textContent = cFormat;
        if (rightElements[value]) rightElements[value].innerHTML = rFormat.replace(/ /g, '&nbsp;');

        leftInput.setAttribute("maxlength", "5");
        rightInput.setAttribute("maxlength", "10");
        centerInput.setAttribute("maxlength", "4");
        return;
    }
};


const formatInput = (raw, numb = 2) => {
    const cleaned = raw.toUpperCase();
    let virtualLength = 0;
    let actualString = '';
    const virtualMap = [];

    for (let char of cleaned) {
        const isSymbol = /[^A-Z0-9 ]/.test(char);
        const charLength = (char === ' ') ? 1 : (isSymbol ? numb || 2 : 1);

        if (virtualLength + charLength > 12) break;

        actualString += char;
        virtualMap.push({ char, length: charLength });
        virtualLength += charLength;
    }

    return {
        formatted: actualString,
        virtualMap,
        virtualLength
    };
};



const symbols = Array.from(document.querySelectorAll("#icons button"));

const writeSymbol = (event) => {
    const layout = parseInt(document.getElementById("selectedOption").getAttribute("data-value"), 10);
    const symbol = event.target.textContent;
    const symbolWeight = Number(event.target.getAttribute("data-value")) || 2;

    const selectedRadio = document.querySelector('.design-select input:checked');
    const isO2 = selectedRadio && selectedRadio.id === "o2";

    const leftInput = document.getElementById("left-input");
    const centerInput = document.getElementById("center-input");
    const rightInput = document.getElementById("text-input");

    const value = parseInt(rightInput.getAttribute("data-value"), 10);
    const leftElements = document.getElementsByClassName("left-plate-text-display");
    const middleElements = document.getElementsByClassName("middle-plate-text-display");
    const rightElements = document.getElementsByClassName("right-plate-text-display");

    const updateDisplay = () => {
        if (leftElements[value]) leftElements[value].innerHTML = leftInput.value.replace(/ /g, '&nbsp;');
        if (middleElements[value]) middleElements[value].textContent = centerInput.value;
        if (rightElements[value]) rightElements[value].innerHTML = rightInput.value.replace(/ /g, '&nbsp;');
    };

    const updateCounters = (lLen, cLen, rLen) => {
        document.querySelectorAll(".manyLeft")[0].textContent = Math.max(0, 2 - lLen);
        document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 4 - cLen);
        document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 8 - rLen);
    };

    const insertSymbol = (input, max) => {
        const simulated = input.value + symbol;
        const { formatted, virtualLength } = formatInput(simulated, symbolWeight);
        if (virtualLength <= max) {
            input.value = formatted;
        } else {
            input.value = input.value.slice(0, -1);
        }
        return virtualLength;
    };

    // ========== layout 0 ==========
    if (layout === 0) {
        if (isO2) {
            const simulated = rightInput.value + symbol;
            const { formatted, virtualLength, virtualMap } = formatInput(simulated, symbolWeight);
            if (virtualLength <= 12) {
                rightInput.value = formatted;
                const combined = virtualMap.map(e => e.char).join('').replace(/ /g, '&nbsp;');
                rightElements[value].innerHTML = combined;

                let fontSize, letterSpacing;
                if (virtualLength <= 5) {
                    fontSize = "80px"; letterSpacing = "12px";
                } else if (virtualLength <= 7) {
                    fontSize = "80px"; letterSpacing = "12px";
                } else if (virtualLength <= 9) {
                    fontSize = "66px"; letterSpacing = "6px";
                } else {
                    fontSize = "55px"; letterSpacing = "1px";
                }
                rightElements[value].style.fontSize = fontSize;
                rightElements[value].style.letterSpacing = letterSpacing;
                document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 12 - virtualLength);
            }
            return;
        } else {
            const tryInputs = [lastFocusedInput, leftInput, centerInput, rightInput].filter(Boolean);
            for (const input of tryInputs) {
                const id = input.id;
                const limits = { "left-input": 2, "center-input": 4, "text-input": 8 };
                const virtualLength = insertSymbol(input, limits[id]);
                const lLen = formatInput(leftInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
                const cLen = formatInput(centerInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
                const rLen = formatInput(rightInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
                updateCounters(lLen, cLen, rLen);
                updateDisplay();
                break;
            }
            return;
        }
    }

    // ========== layout 1 ==========
    if (layout === 1) {
        const tryInputs = [lastFocusedInput, leftInput, centerInput, rightInput].filter(Boolean);
        for (const input of tryInputs) {
            const limits = isO2
                ? { "center-input": 4, "text-input": 6 }
                : { "left-input": 2, "center-input": 4, "text-input": 6 };

            const max = limits[input.id] || 6;
            const virtualLength = insertSymbol(input, max);

            const lLen = formatInput(leftInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
            const cLen = formatInput(centerInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
            const rLen = formatInput(rightInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;

            document.querySelectorAll(".manyLeft")[0].textContent = Math.max(0, 2 - lLen);
            document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, 4 - cLen);
            document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 6 - rLen);

            updateDisplay();
            break;
        }
        return;
    }

    // ========== layout 2 ==========
    if (layout === 2) {
        const tryInputs = [lastFocusedInput, leftInput, centerInput, rightInput].filter(Boolean);
        for (const input of tryInputs) {
            const limits = isO2
                ? { "center-input": 6, "text-input": 10 }
                : { "left-input": 5, "center-input": 4, "text-input": 10 };

            const max = limits[input.id] || 10;
            const virtualLength = insertSymbol(input, max);

            const lLen = formatInput(leftInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
            const cLen = formatInput(centerInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;
            const rLen = formatInput(rightInput.value, parseInt(event.target.getAttribute("data-value"))).virtualLength;

            document.querySelectorAll(".manyLeft")[0].textContent = Math.max(0, (isO2 ? 2 : 5) - lLen);
            document.querySelectorAll(".manyLeft")[1].textContent = Math.max(0, (isO2 ? 6 : 4) - cLen);
            document.querySelectorAll(".manyLeft")[2].textContent = Math.max(0, 10 - rLen);

            updateDisplay();
            break;
        }
        return;
    }
};



symbols.forEach(symbol => {
    symbol.addEventListener("click", writeSymbol);
}); 
document.getElementById("left-input").addEventListener("input", write);
document.getElementById("center-input").addEventListener("input", write);
document.getElementById("text-input").addEventListener("input", write);

// For radio change
document.querySelectorAll('.design-select input').forEach(radio => {
    radio.addEventListener("change", write);
});



const customPlate = document.getElementById("custom-plate");
const buttons = document.querySelectorAll("#license-plate-maker button")
const h2 = document.querySelectorAll("#license-plate-maker h2")
document.querySelectorAll('.design button').forEach(button => {
    // Add 'notActive' class if the button doesn't already have 'active' class
    if (!button.classList.contains('active')) {
        button.classList.add('notActive');
    }
});

const selectColor = document.querySelectorAll(".container-color select");
Array.from(selectColor).forEach(select => {
    select.addEventListener("change", changeColor);
});


const select = document.getElementById("custom-select");
const design = document.getElementsByClassName("design")[1];
const display = document.getElementsByClassName("plate-display")[0];
const selectedOption = document.getElementById("selectedOption");
const modal = document.getElementById("selectModal");
const options = document.querySelectorAll(".option");

select.addEventListener("click", () => {
    modal.style.display = "flex";
    document.getElementById("o1").checked = true;
    designChange();
});


// On selecting an option
options.forEach(opt => {
    opt.addEventListener("click", () => {
        options.forEach(opt => {
            opt.classList.remove("selected");
        });
        opt.classList.add("selected");
        const value = opt.getAttribute("data-value");
        selectedOption.textContent = opt.textContent;
        selectedOption.setAttribute("data-value", value);
        designChange();
        updatePlateView(parseInt(value));

        modal.style.display = "none";
    });
});

// Click outside to close modal
modal.addEventListener("click", (e) => {
        modal.style.display = "none";
    
});

function updatePlateView(value) {
    const plates = document.getElementsByClassName("plate");
    for (let i = 0; i < plates.length; i++) {
        plates[i].style.display = "none";
    }

    plates[value].style.display = "flex";

    // Reset text values
    leftInput.value = "";
    centerInput.value = "";
    rightInput.value = "";

    // Sync data-value
    btn.setAttribute("data-value", value);
    rightInput.setAttribute("data-value", value);

    // Clear all display content
    const leftElements = document.getElementsByClassName("left-plate-text-display");
    const middleElements = document.getElementsByClassName("middle-plate-text-display");
    const rightElements = document.getElementsByClassName("right-plate-text-display");

    if (leftElements[value]) leftElements[value].textContent = "";
    if (middleElements[value]) middleElements[value].textContent = "";
    if (rightElements[value]) rightElements[value].textContent = "";

    // Set dimension text
    const dimText = document.getElementById("dim");
    const isO2 = document.getElementById("o2").checked;

    if (value == 0) {
        dimText.textContent = "Dimenzije Tablice: 52x11cm";
    } else if (value == 1) {
        dimText.textContent = "Dimenzije Tablice: 15x15cm";
    } else {
        dimText.textContent = "Dimenzije Tablice: 34x20cm";
    }

    // Show inputs again
    leftInput.style.display = "inline";
    centerInput.style.display = "inline";
    rightInput.style.display = "inline";

    // Reset counters
    Array.from(document.querySelectorAll(".manyLeft")).forEach(ml => {
        ml.style.display = "inline";
        ml.textContent = "0";
    });

    write();
}






document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      const icons = document.querySelectorAll('#icons .icon');

      icons.forEach(icon => {
        if (filter === 'all') {
          icon.style.display = 'flex';
        } else {
          icon.style.display = icon.classList.contains(filter) ? 'flex' : 'none';
        }
      });
    });
  });

  const boxes = document.querySelectorAll('#back-color .color-box');
  const nameDisplay = document.getElementById('selectedName');

    boxes.forEach(box => {
      box.addEventListener('click', () => {
        boxes.forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        nameDisplay.textContent = box.getAttribute('data-name') || '';
        const element = document.querySelectorAll(".plate");
        let value = this.value;
    
        for(let i=0; i<element.length; i++){
            element[i].style.backgroundColor = box.style.backgroundColor;
    
        }
      });
    });

    const boxes2 = document.querySelectorAll('#text-color .color-box');
    const nameDisplay2 = document.getElementById('selectedName2');
  
      boxes2.forEach(box => {
        box.addEventListener('click', () => {
          boxes2.forEach(b => b.classList.remove('selected'));
          box.classList.add('selected');
          nameDisplay2.textContent = box.getAttribute('data-name') || '';
          const element = document.querySelectorAll(".plate");
          for(let i=0; i<element.length; i++){
              element[i].style.color = box.style.backgroundColor;
      
          }
        });
      });


    document.getElementById("text-input2").addEventListener("input", () => {
        document.getElementById("frame-text").innerHTML =  document.getElementById("text-input2").value;
    })

    Array.from(document.getElementsByClassName("font-frame")).forEach(btn => {
        btn.addEventListener("click", () => {
            Array.from(document.getElementsByClassName("font-frame")).forEach(el => {
                el.classList.remove("selected");
            });
            btn.classList.add("selected");
            document.getElementById("font-frame-text").textContent = btn.textContent;
            const value = btn.getAttribute("data-value");
            document.getElementById("frame-text").style.fontFamily = value;
            document.getElementById("text-input2").style.fontFamily = value;


            if(value == "Arial"){
                if(window.innerWidth <= 500){
                document.getElementById("frame-text").style.fontSize = "13px"
                } else document.getElementById("frame-text").style.fontSize = "19px"
            } else{
                if(window.innerWidth <= 500){
                    document.getElementById("frame-text").style.fontSize = "10px"
                } else document.getElementById("frame-text").style.fontSize = "15px"
            }

        });
    });
    


    let opened = false;
    document.getElementById("faq-button").addEventListener("click", () => {
        opened = !opened;
        document.getElementById("faq-result").style.display = opened? "block" : "none";
    })


    const designRadio = Array.from(document.querySelectorAll(".design-select input"));

    designRadio.forEach(radio => {
        radio.addEventListener("change", designChange);
    });


    function designChange () {
        // Which plate is currently selected (0, 1 or 2)
        const idx = parseInt(document.getElementById("selectedOption").getAttribute("data-value"), 10);
        ;          // ← always a number
        const plates = document.querySelectorAll('.plate');
        if (!plates[idx]) return;                  // safety guard
    
        // Did the user pick the o2 radio-button?
        const isO2 = this.id === 'o2';
    
        // Template helpers
        const svgO2 = /*html*/`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="69" height="62" viewBox="0 0 148 176">
                                <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACwCAYAAADpAUf0AAAAAXNSR0IArs4c6QAAIABJREFUeF7tXXd8VMX2P9tbkk3vvZAQCCH0EiBIFbChiFh4TywgNlQsICgiz44FpFloUhXxoUhHdtN7D4T0trvZzaZsNtv33vtjNmxeEiLZ3bsY8zPz+fAH2TlzzznznTMz55yZocBQGdKAHTVAsWNbQ00NaQCGADUEArtqYAhQdlXnUGNDgBrCgF01MAQou6pzqLEhQA1hwK4aGAKUXdU51NgQoIYwYFcNDAHKruocamwIUEMYsKsGhgBlV3UONTYEqCEM2FUDQ4CyqzqHGhsC1BAG7KqBIUDZVZ1DjQ0BaggDdtXAEKDsqs6hxoYANYQBu2pgCFB2VedQY0OAGsKAXTVADlBU+BwA/LtxZACADis4bLWiLmoXtW9J0QGA2pKKQAEcABQW1UWVKNAOAJhF9Y2gAQCtRXUBjACgtLAuqnandGcFC7dWJQuoYgAYQYqDIeK/kwZ2AQ6ryTBEFlCFABBDBZAAAEEAcC1lhgBwtrTuUL2/TAM7AIcXyHyNLKDyASB2j3dwbQCTGUSGkdvRqnFciQNh0TSjIXCtHrdsatQDblDjuC56+xdNdAaT1hcPmEGPYXqDETNilDZN37O5sq5eI/l2n3d3+lbMqCcACEt00oHjmI7ALaqrJXBCi6Ox238xEDihIvB++7hCp3NoxY1jAWA74PBS/y3/eY1+P3bbxqmQBwCjf/QPa3Og0gatxZlfVaoCAJ6titQ2yXMFE+PH2Eo/0HTH2luSD7bJ4wHgS8DhFTL8kAVUDgLU74HD0AE/KhlGBpJ2flUpWsBbPF335lUrk+cIJsWjET4oy5kORcbXLdKJAPA54PAaGSHIAiobAKLPBA7jkGFioGnnV5WinRjbVj60MlmOYNL0QQuoFG1H3n9k4jgA+AxweN1WPSA6coCiQRaFgIjfA4fxyTAx0LTzq0r1AMC0lQ+tVJotmDxjnK30A02XqVYVbpKLRgHAx4DDW2T4IQuoDAoBIb8HDvMgw8RA086vKkU+ILqtfGil0izB5BnjbaUfaLpcjapoQ5Mo5sag+gBweJsMP2QBlU4lIOB04DBfMkwMNO38qlK0g+xzl2cJb9rGxizBlIRBC6gCraZknawe+RO3AA4bLZH5z+qQBVQqAyg+pwIigskwMdC086tK0TbcZl1oxeJMQfxdEwZaDlu/X6LTXHtdWj8cADYDDu/a2o491lApTKB4/jcgIpwMEwNKS6EQ8yuv2QwmxLtGJM4UThu8gCrVaa+/Kq2LvCHLJsDhPTL9QUqRQIMkNoXiftI/IooMEwNJS6FS8XkVV0m5PDQicYZw2l1o2z0oS7lOW/6ytC4CAN4BHN4nIwRZQAm5FKr7Cf/waDJMDCQthU4zzisrsXlBbrJQDaJ04fRZkwZSDjLfrjToKl+U1IYBwAbA4T9k2iILKAGPSnX7yS98JBkmBpKWymDo514vstllYAJUXUO6MGH24AWUXlfxYmMtWrasAxw+ItMf5ABFgSsOdKrrj37hyIdBumhwXEmjUBhMCsVmJ6O1TFCZTN3c0kKWtXTd66tq69KTZs4dtICq0GsrXmqsQ4B6E3D4hIwuyALqsiOd6nbcLzzWFiZUONb2XYs8P1ur9tISOBKIcXOn0M6lUuv86ayWGDabGsfhuYcymKF0CoWUJemLRzqbo5l9NY+Up19VW5uWNHPeZFt0YClNC26UXjVo6ov0WlUjZqCocYzKodBwHzqDmMJ0cItlcWyeJbqtoV4HHD6zlKe+6pEF1CU+je5y1D/U6sBomV5X+q5cwouNi6tZvmIFc+78+cH+AQFeiEm1Wq3Ky82ty0pPb0lKTDQW5OY6yuVyXzqOK13pdHkwg6WLY3F5k7i8KA6V6khGATQeVz2nKNfmOB76tqqmJi3prvl2AZSGwFW1Rn3dNYOmpVSvNdRgBod2HPdmcdhqX1+/5rgxY3VRw4cznBycqEqVEi8sKDBcuXLJTatoZ77t7INHMdho+29Vua7TlL0irR8GAK8CDl9YRdyrMllAXXSm0V2PWAkoA0HoVrfJSnJKS4M8vbzcLBWgob5empudLc7OyuooyM/HC3Jy+FqFgjqb69C2lO82kUGhWD110Xg81ZyiHJszDRDvHVVVacmzF9gEKIwgDAKtMjdR16GrIzAXjiPfGBE5TBkzajQxYeIk3tgx47xCQkP9qFTqbXeily9dLFr28GL2Rp47EcFgIXBYXEp1mrJXOwG1BnD4ymLCPiqSBdRlNzrd6Qe/UKviWMkaZfYhAqPXNDaO7s1Tu0KhpDMYVC6Xa1Enq9Vq9ScffJCze+tW1w/dffk+DEb3lOR+dcNwcFTOKswiZeU6KqtSk+csmNLvx3pVSNV15Gxvb/KMGj6ibsO7m3jz5y+ModFoNnvsr129WrNw6gTpThd/q1wY13Sastc6AfUS4LDdWjm61ycLqCvudDrvoF+oVWGH35VtaWdZdFZFQ0OPqXLRvHnCbIHAFaNQGD+dPYslzJzZlV6s0+l0Eomk2cvLy4XD4dyy5vl+z570t1580fmgf+gwa1JpGHy+YlZeBqngdkd5ZWryvIVWAarCoCvboGh0PvXrmaYZCf+Ts7/OPHbscPZXWz/TBYeGGr7f98MELpfbY7oeFuyXuY3qaJXXvptj8wXAYUd/PNzud3KAooHQi8pg7fMLsWpEtBmxptVyUUezShVMoVBMPJz9/feCfz2wmLnfP2RYgUZdspvQE7WNjabFfmtrm8LPP0DDYDA0Op3Oj8FgSufMmV15YP/e8Y6Ojl2WzMPJqXIlz7E1nuNoscVkuji33ZWTTio5sKO8MiV53sKp1nTEWy2ipLtXrSI+/OjT6WY6pVLZcfTo0eKff/5Zf/XqVRetVst54403pK+//rqp7cZGSVNURDB87Oqn/EbRJAqaMR0/eer3Gd3oVdHBAde/5XtbtaYt0Wmvv97pKV8NOOyyRo7edckCKtGbymDs9Quxest8uaM94zc2nRg1dqwWGZzfTp0Kfs3JTTGWw41FqbPLGqok12pq6D6+vp7Z2bnlc+fPI1rkTcMwDMPy8gqqPvjwQ1FOTg6vqrJ8jHmaQBauNTUdNnr4dCm5P+Uw3V1b7spMde2v3u1+V14vS0m5+16rALVMVtVQVd/o4OLiagJzcnLytYULF7p5e3vXLl68WDN9+nR+S0uLfsOGDfTq6mqUqwTvvvN20vmvt+ObnH1n6AhC/XRLnejQ8ZMaTy8vblZmhvy9TRsclxBM5Xwu36r+KNFpS1+X1qFox4ADKtmPxqB86xtilbk3dw5SylWtpkJHEMZhTJa/K53uaf5tTWN96iuffkJd+fzzkxoaGqSRkcMZKpWyR8c/9PBS4bw5c9jPPPO0yUK+/+67Sd9+/DHnG99gyy2Uu1vzXZkpFm8M+gKW8tr1lJSF91kMKCT3cnmNQaHUdU21gYGBhatWrWpfv349SsU1lV9++SX3ww8/1GRmZpranjB2dMoDkhbHODbX5PerN+hrdiqb6uWYkedMo6of5bo5mX+zZoB0Cw4POKBSA2lMYrdvsE2Aup3Qm5skwlEPPwS7v//eZG24XIeWtrYWByaT2eWLeu21tcLc3DzKlSuXTdPGscOHs1948knHQ/6hyHxbVNgenk0JGYmk8rmU10qTUxbe3wWE/j7chBkkr3U0aWTN7aGoLnKTBAUFSWQyWZh5CYD+vnPnzrTKykr91q1bTTpwc+XV73Ly4TlR6aQsam/+irSaa2/KTNkGAw6o9CA6y7jLJ8ji0dmfss2/I0CNXroEdn73nUmZ/gHB+cVFBWHOzvyuHdm2bdtTv/zqK0ZVZYVpUyC4cqVk8dy5rCMBYRZnP7C9vWQJqcIuy2gpf93rKa5eTU5btNhiQDUY9DVva5v10iaFaXt/7dq1mmXLlkny8/N7uB42bNiQOGXKFP6CBQtiCYIg+I4sOOYZilNJ5G71JV+hVnP1LVk9iscOOKAyQxks3dfeQRYr09IOWymuyfr4++8pjzz2mGn6io0bk3rh3NlIr25+q19//TX/ueeep4hE9abFe2Z6+vUF06dTD/mHosi5RYXt6yNNSL5icqjaWhQlV5PT7rEcUI1GY/1bWrm6UdZmsqRnzpwp2LZtm+LcuXNdC3T095UrVwpWr14dEBsbiwK34OzEbvnKxVfjRWP62crrnwCq5K3OBLsBB1RWBIOt+co7cJo9BSzQqos+VjQ7yhQKfzqdbsoECI+IzCosyIvu7p9Ci/VFixbpGhvFprBDVmZm2d3x8YQ1Ux7Hz1cyI+kPHzL8K4qKk9Lue8hiHcgwg/hNTXO7RNZmSvtBU9uZM2f0p0+f7rGZeOKJJwRPPfWUe0JCgkm+hx68T9hyJZF4w9krgQy/vWm7ZWwOMKCokBPFZHd87h3YY2SRERa5FJ6T1mkP//xzy4JFi0yWB/mggoJCrjc2insEoYuLi6tn3jVb0yRrNKXPZGdllS2YGm886B9icToNNyBAPF14kVQKc1thUVL6/UssBhSKy63VNLeIpa2mMMkHH3yQnJGRgZ06daoHoNavX5/I5XIpGzZsMLXd0tLcGhEeqNjA89QOZ7DsloOWr1UXr5c1INA+BzjsJtN/5NwGVMiLZnIUn3kHWLxNvx2zBAC+Ulqfu+nLL7EVzzzT5dtav2FjYmVlJX786JEeI7O8vLx+0uQpqmZ5k0m5CFD3xMdr9/mFWJz9wA0KFE2/coHUFNKWX5iUvvhhiwGlJLDWNdoWiUjSbAL+xo0bE3Nzc4nff/+fTwn9PS8vr2L58uXNRUVFXbrIyEgvvXtuAvtb1wBnHsU+h2tzNeriDU1/D0Dlx7A4bR972QdQyDeVGxmmu5yU1GXxCgsLq6ZNT6BWVVbw3dxcXboDsra2Vhw3dlwH8k+hv+dmZ5ffNzW+/Vu/YIvPyPGCg+un/XEugMyobMvLT0x/8BGLrbSeIDSrtPIqsaTZFAlYu3atsLi4GM6dO3fLwAwMDCz47rvvKHPnzu0aJC+8sEqYefgIZbOLr8XfvJ183U69DPiUVzSKxWn+yE6A+kIuFcDY0dTzV650KSohYWaiVqujpqen3rLwR/6p2NFxbc3yJtPiFq2hlk6f3rbTN9ji0AMvLKRu2sWzgWQA1ZqTl5ixZJnFnYss8TNa+bUGsdwEqNWrVwvLy8spFy9evKWNpKSkq/fdd5+DWCz2ZLPZpjwxhaKtPcjPs+OYZyipqdosc45GVbSx8xjVgE95xaNYHLm9AHWpoz3ziFHrIG5p6VoDSSQSaWh4BDNJKJSNGze2h3/p5pSnNgNKKBSWPDnv7o6dvoEWh4IcwsNr4y+cJnXRR1t2XmL6w5YDCgfAVuqbr9Y3NKFOhCeffFJQV1dHvXy505/WvaxYsULw22+/+dfW1vqYNyQoCDx1QhxxxDMkhMxAMNNmqVWF73Ye9BxwQF0dxeLJPvLys9cailghqi58ft269g2bNnWtSVatWi3Mysqm5+R0eoy7FJGVXTb/7rtx8xrq/NmzhasfeFCzwxpARUbUxJ/9jdQxsJbsHGHmw49ZrAMNgStfNipq6uqlJkA99dRTgqqqKtqVK1d6rMMUCkVHYGCgJjU1tWPEiBEm8CB/1PBhIdnD2pSq1Y4edtntpatVBZvlIrQBGnBAlY5m8Ro/sBOgkMLaMKx5jbRetPWbb3SPLV9uclgqlUpVcEhovRk4ZkBdvHy5cNkjyxjyJplpt/TLiRO5ax9fbrAGUI7DI6um/n7K5LG2tbRkZQszlz5uMaDQLm8d3iGtrWs0rYtefvllYV5eHjUxMbEHoLZt25Z6+vRpw4ULF7rafmrFcoHg5585X7sFjLcmq+J2snW722DAAVU2msUT2xNQSPB2zNiySiZSNSoUXuZQS3BoWGZNVWWPtdGPP/6U8+prr9Ma6mtMeVWHDx7MeufZVdgO30CLg6NOI6Irp/x20uQ4tLW0ZGQJM5c9YTGgJEZj/SboaKmt68ymQLu8K1euUJOTk3usE5cuXSp49tln3WfNmmXyQyUnJ117ZMFc3S63wOG2JBP+mXxCtTLnY7kEbWRWAQ57bNUDoiPrNqiIY/Hq/+PlZxfT212QZ0Q1OXt+PkE3+6ImTJgkzMxM79FpW7d+kfLt99/RSq+WmACEcqI+e+VV/AvvAItji/yYkRWTT52wOFTTl7Kb09KFWY/922JA1WL6qo8ITXt1ncQ0EPbs2ZO+f/9+LC0trceUvmDBAuH+/ftHenp6moLXocF++S8YGYxoJtuu11BeUrVnf97ciCISAw6o6jgWr/Y/dpzyzB32llSU9NwnH9FXPv+8Kb41btxEYXZ2Ro9Oe/75FwUVlZWU8+fOmP7+5datqfvf2YR95OVnsU/IeVRM+aT//mRxqKYvQMlT0oXZT1gOKJRc9zlNr6qqEZnSUi5dulT05ptvKnNycnoMhGXLlgm2bNkSHhYW5q/VajWe7k60ox4hFHQyiIwV6U17rkORua1Fiqz/gAOqLo7Fq7wTFmpNY13qq1u3Up997jmT9QkMCs6qq63pkRm66N77hNHR0ZRPPvrQtDv6YPPm5JMff4Zv8bLcP8MfHVs2+eRxq3Kwe3eIPDlNmL38SYstVIlee20H3aCrqhGZLFRjY2PTlClT6quqqnokxqFYXkJCAm/ZsmXjUXJdZHgQ47hnKKlkwL6AeFqlSN/ZLEV6HnBAicZweOVbPGzb5SWplNkX1Uo1FYCY7eDI655pubyhuuRSRjpnVFxcKFqUDxs2vFIiaejhAY+LG5vyww8HfEeOHGnaAa15/nlh+aEjxItulse6XMfGXZ/w01GL0136tFCJKYLsfz9l8bRfg+krP8BVavMuD7Xp6+t7tb6+PrJ7TjlaW9XV1eEHDhxI0Ov1endXB/yQRwjBpFC6UqClmEHchGGt/nSGtzOVZlNe1yllW/qeVtnfAlCNYzm8a+97WL+GeqdJnKgP8Ge89Mor1IqyMt3uHTvCnnRwbpjj4DRRheOKZ2QN7fKODtNpj0uXLxevXv28qux66UQcx/Hc3PzKvXu/F2dkZFFycjK7fDf3zp8vDM8tZM91cLLYD+UyflzpxOOHSMXF5InJgux/P20xoNpwrPn5drGyuUXV5a6YP3++MDAwkNi1a9c0M6i+/PLL1JMnT2Lm3V9IkE/B00YGjGVxTYv5D9skwmLCEBo9Iqbm+rVrPpOojAZbXAknlK2pe1ub0HQ74BaqaRyHV7LZSguVqFJmHaMDrbKhIc6cUFZVWSmaGD1Cucsn0PdnRUs+fe4s/Ifjx02dlJ+fX/n4E8sbW1vbuCqVis/lcDvip8W3fP31tlGeHh5dyWZ+bm4lW7jOVp18cZ044dqEowetPsvW3VLJBEJh7oqVFk95iPbRphpxZZ2Ya04Bbmpqapk2bVqlRCIJDgkJqYiJidE1NzdT3N3diYMHD5r0sOX9TUkntm6Fj1z9piXrlNlHGEArvloeiQ4qaLVabeSw4LKHDVTtLI6TxZEC1O6P7S0p+9vkaEMw4IBqHsfhFVkLqLelosT4fz1BfLVzZ49OGDNiRGp5WdloBoMhq5FI3Jz4/0um628RevTw4ay3nnqKsseK9F/UptvkSSXjD+8ntWuS/SEQ5D69ymILhb67oVWcGPvA/fj3ezvBYi4IWLm5uQ1qtdro5OTEnDx5cqj5ZAsCja+Xa8swGr38ml4bm5iS2RwbO7rL5fHrr7/kvb78ce1XrgFWnRE8rGhJOawwAWol4PBNf7q+3e9k3QZt4zi8vM1WTnlb5BIhf9JE+L2bw85WIa5fu1b73jvvVF/47Te/zz39eJ50hlXxLfepk0vG/bCPHKAuCwS5z1gHKLT2eblFRHlg8YPXt329a5yjo5ODJTpAoElPS1PGx0/nL1jYmd5jLtdLS2vmTRzTtNst0KpjbQfb5MnH2luQD2zAAaUcz+HlvGfllCcy6OtelTZwj5w40bDw3ntvOez5Z4ptlEiaLl24UHPh3DlVRmoqr7GxMQRwHB/Hdbj6grPHOA6NalGndG/ffVp88bgD39l8LwBqS3bpD0Hus6utslAmOtwoPalqLc0yap2ZTk4QHz+99b4HHnScM2duBJ/v7GQJwLrXeeuNtYkV+w4QTzu6WTX97m1rSjrR3opcLQMOKPV4Di/jPSstFFJCpV5f/oFc3BE0cqRq3caNDnPmzYsyR9PRwruuuroxJSVF9MelS6qM9HR2Q319IG40OrIo1AZ/BlM+gsUi4jgO7tEsdhSZEITHjPiisfu+M8XUbC3S85cEec+9YDWgun+v0WhoOK9WVmUbVEwZZohgsdhtwyIjJXPm3k0sWLjIKy5uTKg5e7UvPvfs2pH28Ya3qNudfMdY66f6trUp8RdlK9rcDDigdOM5vFRbAGVWikivr03WdNTVGo0Yy9nJQKNQCVlrK4tN4OBOo4MfncEMZrL5AXS6txPNvqc9EA8eCTMKx+7dY3FCXl+d2Xj+giD/uZdIAap7u+hcYo3RUFlo6JCW6LTGaoPeUU0BJyc+v93H318dFTXcyGaxKAaDgZBJxHjDtVJqnNpAf5DnPMWWwbWrVZb4m7LtbwEo40SOQ9K7Hr52U6atVsJWOq9ZdxXEfbvTpuuIzN9sPHdekL/65b9EByg5rw03tmIEBeNQKVxbfU/d9bW9VSo8q1SgaXLALRQ+keMgHMyA8pg7O3/s7q8tXsf1BVzx72eFhS++YtW6xdYBcCfoPm+WCi6pFGhADCigqEAFbCLHQTCYAeU1f25e3M5tppiaraXx93OC/BfX/CUWylYeb0e3tVkiuKxSDjig6EAFw3gOT0BmDXUnFGRNm94L7s4d/fUXVl0u0bv9xtNnBPkvvTpoAfWhXCJIUisTgALPAAbfWaO/3nXJ+KFYQAXtGA5PaGssjwzj9qL1XrQgd/S2z8kB6tffBflrXhu0gHpfLhakqTsQoJ4CDPaS0S0ZQHGBCqrRLJ7Q3gl2ZASyltbv/kXZMZ9/ZvHlGn3u8k79Ksh/5Y1BC6i3pSJhnk41AyjwJGCw31oddq9PBlCOQIX2GBZHaK9jVGQEsZXW7/57s2M+/4QUoMT//VVQ+OrgBdRrjfWJ1/Sa6UCBfwEGB23VJaIjAyhnoEJrNJOT+Jl3gMVHiMgweydofR98IGvUpx9aFarozYf45ClB4do3B62Fel5Sm1xt0MUDBZYDBj+Q0TMZQLkBFeRRTHaiPY+ikxHGFtqAJQ9ljvh4i1XR+d7fEf30s7DozbcHrdvgGXF1mshomAwUeBwwOGyLHs00ZADlAVSQRTDZSfa+LIOMQNbSBixdkjniw/dJAarh+Alh8boNgxZQy0VVWXLMOB4o8ChgcNRaHdprDeUNVJD40Rlp3/qGWJUuQYZhe9MGLluaEf2f9yxOyOvr+w3HfhIWr984aAG1rKEqT4Eb44ACjwAGx8nomIyF8gMqNLjR6Fk/WHkLMBmG7U0b8Pij6SM2v2Pxsas+AXX0uLD47XcHLaCWiCqKVRg+EijwMGDwExkdkwFUIFCh1pHFLBA++Rx6EdPigqmUDEyjIfUC1J99DDdgVEObwuKXEQIefbg6+KknSW0q6g4fE17duGnQAuqBhvLrOpyIBAo8BBj8bHFH9lGRDKBCgApVLi4uRc1NzaTSP8gI8Del1QBB6CzhjcAwJUGgB0VvXygEYcAMRsva1Ot1BIbh/bWJ4xiOaTQGt6hhXnqDIRQosBgw+KU/utv9TgZQ4UCFclc310K5VE4q/YOMAEO05DXA4XFqdDpdMFDgfsDgFJkWyQAqEqhQ6u7uXiBrlJFK/yAjwBAteQ2wuexavV4fBBS4FzD4jUyLZAAVDVQocXdzz5dJZaTSP8gIMERLXgNsLrtOr9cHAgXuAQxOk2mRDKBGAhWKPNw98qSNUlLpH2QEGKIlrwE2l12v1+sDgAILAYMzZFokA6hYoEK+p6dnbqO4kVS0nowAQ7TkNcDisOoNBkMAUOFuMMI5Mi2SAdQYoEKOt5d3rlgkHgIUmV4YYFomh9lgNBj9gQrzwAgXyLBDBlDjgQqZPt4+OaIGkcWXpJJhdoj2zmiAyWGKjQajL1BhDhjhEpmvkAHUpBuITvPx9skWNYhIpX+QEWCIlrwGGGyGGDNiCFCzwAh/kGmRDKCmAhWS/Xz9surr6kmlf5ARYIiWvAYYbIYEM2I+gMNM9GQOmRbJAGo6UEEY4B+QVVtTOwQoMr0wwLQMNqMRM2LegAMKHyWSYYcMoBKACleGAEVG/X8PWgaLIcUwzAtwQDHNJDJc2Q4oOswGHC4GBQZlVFdVk0r/ICPAEC15DdCZdBmO456AA7owI4VMi2QANR9wOBscFJxRVVk1BCgyvTDAtHQmvQnHcQ/AAV06lkaGHdsBRYNFQMBvISEh6ZXllaTyicgIMERLXgN0Jl2O47g74ID6MYNMi2QAdT8Q8Et4WHh62fWyIUCR6YUBpqUz6S04jrsCDigVOosMO2QA9SAQcGIYk530ZV8PMBJgJKjQ0RdzVBpdSaHc+mkKjaal0KjGW2hodIzKYOh7/51CoRI0HueWv6N6dEcHI4V2aw4fncPGqZyuO0/B++65HL+HHiSbU54hvXBRa21H0B0cCCqLZXsf9Pogg8+nUJl0q9uLXv9GJE4QaA2F/Ik51srRvb7VH+8ipsFSIODYXB5fuMbNa9BmKzqPjUuc9NNRUhmb6Q8uTWzLKyDVBplOJEv7sKiisAPDRwEOKISWR6Y9MoB6FAg4/LSLR+piRxeLXy4gw+ydoHWKGZE85dTPpN5MTrv3wSRFcYnFl+3fCTnItLmmsS6pTK+dBjigRMkiMm2RAdS/gID9L7l6Zc534JOaMsgIQJbWcVhEytRzv5F61T1l4f3JymulpEBJVg4y9BuaRMJcjWoG4IAeACgn0xYZQP0bCNi3zt0ndxrXcdBmG/BCQ9KmXTpL6hhYyvx7UpRl5aRASaYTydIRMytuAAAfAklEQVT+Ry4WpKDLMnBA96bXkmmPDKCWAwEHNrn7FU7g8gZtTjnH3y9jRuJlUn60pDkLUlWVVYN22v+0WSK4gu6HwgHdoCwZKEA9AQQcfMfdN38S12HQpgCzvL2yZqYKScUiE2fOTVPX1pGycmQ6kSxtNwuFHhFoJdMeGQv1GBBwaL27b24812HQTnlMd7e8uzJTSKUwCxPmpGvq6getL+7dJpEgS6NCFooHAOqBAtQjQMDRtW7eWXfxnEiNcDICkKVlOjsX3JWbTurUjiB+ZqZWLBm0G5P1UpEwH90PhQN6Nu1WP6AVSiZjoR4GAo6vdvNKX8TjD9rRyXRxKbgrJ40UoK5MmZGla5QO2kH1cmNdUrleOxVwoFmBnT6rkgHUEiDgx8f57smP8l0H7ZaZ6eaad1dWKqkp78qkaTk6WdOgTYNeIapOb8QMsYCDxUf4/wx4ZABlCr3c4+gsfM7Fc9B6yu2xhvpjwtQ8vbyZFCjJWgYy9DdvXwkBHFzItINoyQDqPiDgv9O4joJ17j52ub3NSBB6OoXCJCuUNfQsd/fcmZnJpDYVl8dOyje0tg3ane7ihvJSLU4433jA2sca3fVV13ZA0WHWjYSsSyNZnMRPvGy7EjFLo8o/qmhRSTCjH5XBwJh0ul6n1ztgRiODS6HIvOlMxWg2B8ZzeT4hDFaoLc9O9KcglqdHzsz0JFLT1R9jJhXo29pIrcNux2cLZpRWGHTi61qNshHDcIURo6L6PBoFH8Zk0ydzHIJ8GYyA/mT9s98X1pU1EQAtgAOphyjJWSiAsUCFbC8aI32fX4hVi3ICAF8nFaV0uPB5n2/fTrl70aKRDAaj62Fmg8FgqKqoECUlJUkvnjunycnMdGyWy725BMgiWRzFGDaHO47NC3Gm0zxsVaKZju3lmZ2Qlkjq1M6luIkFRoXCLoBq0OtqcnUaca5WbajR61zVOB5AZzIVwcHBoinx8YaEWbMcYmJi3NgcDvN6aan8q88/b00UCMb50OmFm9x9w1zpdE9rdGIgCN199eVMoEA6YKYEO1LFdgsFYLp9hUulXj3hHx5tDRfftTYJq3y9mbklJVY5A9Grn2kpKeIkoVCdnpbGlNbX81wwXHmPozNzJs/Rpl0Wy8c7a2aKwCZas8yXR08oNLS32xQtaMeMLb8q24oztGqGkkbjO/D5msjo6I5x48dTp06bxp8wcWKQs4sL/3b6baivly6cM6daUlXtdMA/xKrXueoN+rqVkppAIOAMELDQmn6075QH4A5UaKICSE8HDvOyhpEnGqqvnbh4AZ8xY0aPhw+RZaqprm708PBw6k+J5u8V5OVVPvHII01ejTLta1Y8Xt1loXx8MhNSrpDyIdkCKGSlv5RLE69zmPyNmzfrHlq6NJrvbP0bed31vuzBBwWjUrNc4zhci8Gdru7I3ywXo/XfEcDhMWv60d6AogAVNADA+G9ABMakULqmrP6YelRUXZl99So7NCzMz1y3taWlLSwgQEEYjVQPb29pWW3tLdMQAlz3qdFMSxAEERUcnP2YHmdM4PCsWhxzAvwzZggvkYrlXY6bUGRQtFt16doHcomw3d+PmVNUNKH7S+i30x2Sc2R4eKbRaKS++MorhhfWrOkxRb2xZo1Q+sMR6jK+q8WpNMfbW1IOdL43/DXg8GJ/fdff72SmPAAqVABA2F7fYJE3ndkFjv4++m6TWBi5aCFx8OhR0+4QKWr6pEnJoRXVsMTJZeK/RdU1Sbm5zOEjR5peDZ85c1ZicUmJG4vF1mu1aiaDzsSWLn249bPPPplqfpRw/969Ge+vfgF2+AZaBQ5ucFD69D/OW7UG7C3f5dHjCw3tSoutQovRKFvVWMeubGgwenh6dj3C/euvv+bt2LFDKRKJWCijNTY2Vr1jx46xfD7f9LrnoQMHst5ZuZJ40MmV2NMmDy+vqyO8vL3dzfzERkWlz21pp8yy4lX4T5slwisqJXL7vA84vNNf3/X3OzlAUeAyUOCu9z38isZyeBaP0A4cb18tqW3wDw9vGzdhgv7C2bPO7a2tTj/4BgfSKBT6D23yxI5JE4hTZ86Y/FshYeHZWz/9hLp48WLT9r60tLRm5szZ7YsWLWj59ttvTKCUiMXSyKAg9vGAMCeKFe4Qh4jw1Pjzp0ktRi+PHl9kaFdaLP+pjtaUZGc+vaisrAv8y5cvFwgEAteXXnpJOWvWLK+oqCi/yZMn53/88ce8efPmmcAa5OVVsIXl4OlBZ/hc7GjPuOTGx388edI3LCLCb++332a/uWaN7wHfYA8mhfK/HOd+EPBqY11iqV6Lsk1fBBy+7g8w/f1ODlBU2AcA/37GxSP1ASuzNjGCMCaqOnKv6zQaLwaDPovnONz8YmetQVf1vkapapDLTZ0UN2Zs6iPLHiHefP31rpwjiUQiix4xsr21pTncLKQjg6Ha6RPYjhTen+BdNFGRyVPPnCLl6b80ekKxsb3d4neLtzVLBYEPLabs/v5704ApKyurS0hI6Kivr4/sPv2Fh4fnHjhwgDN16tThMqm0eURAoOwH/5DhZt53NsuEV9RKBErCk8YoXOfu5eXPZJmsuqXlcVFVdgtmHHfjWoHZYITLltL9WT2ygHodAD6J5zoI17v72s1brsZx1b/FNXi7Xu+IGH/55TVCo9EIO3Z83eMbHp7eJfV1NWHmt4r5LFbT+x6+zcOYLIv9KfZIAbYWUBuk4sRHNq6nrX3rLdMAeffdd5NaW1vxbdu29ZDP19e35Pr168GOjo68b3btSt++dq3xU68AUuDvDYRFdWViHMAXcPAGAOnAAurm6WEvGiNjn1+IVWuX2zHehmHNq2QNxjaNxrR7vCIQFO/fd0B+4MC+Hh758GGRmZcvXvAPCgpCiWHgyuXWr3PxbI9hsXvsHm/3LecxoxMnnThG6oDBpdjxxUal0mILtbaxPuWDw4e49z7wgClcs3jxYsGjjz7q+NBDD/VwsIaHh2dXVFSYNifvrF+f9MtXX1HsCSi09Hi4oQIN2mbAgbRPD/FJzkLddB0wKJTaUwERQWTRbabP06gL9zEpevNOr7KysmH92xsrjx870mMED4uMyjh86JDL+PHjUC40uDs5Va1zdNWNYLG7poX+eHKdMD5xwrEf/mpAJR9OSfaJjYsLQ/yNHz8+Zfv27e6TJk2KNPOLNioxMTEZxcXFpg3Dnh070j987TXabt9gUj6z7vrI1aiKNjSJYoCAy0DA7P50ZcnvZAGFdnooBzngB9/QJjcrvbR9MYj8M6vENTmf7d9PXfLII6YRe+78+cIDBw62HD1yuIeFioyKzvju22+cpk2LNwEIAeodJzfDMCarq2P6U4J7/BThuIN7SU3Xl2LHlxiVSout4uvS+uT/FhQEh4WH+yP+RowYkfnLL794Dxs2LNDMr16v18fFxeWXlJSYfGTtCoUywNNTs8s7gHCl0a3y+/2ZDr5ulQnPKNuQ7JsBh3f705Ulv9sDUAcAYPkKF4/Uh6xcmPfF4DtN4kT2iGhKYnp6ly9l9px5ifHx8ZRN727s4V+Jih6RsWvnDt7MhATTdOPm4FC1xcULD2Ewuhbq/SnBI2G6cOzeb0gB6mLM2BJMpbIKUL8VFoYGh4WZpmq0+D579qxHREREj3hcSEhITnV1ddc0uGXTpqRdH37k+I1v0Ei0G+5Ptv5+v5m2gi6OmwtGuNhffUt+Jw+omwc+A+nM1N2+waS234fa5Il/AO5eLZGEsVgsFhKgpqZGPDw6xrG4KF8RFhZmGtHmEjMqNu3TTz/hzb+5rUaA+sTFk+7HYHaN9P6U4DV3tjBud8/Ffn80vX+3FlDrpKKkU1eLwwODgky70YCAgCKBQODSW76lS5cKVqxY4TJv3ryuOOGchIREY24B/qa7F6kMDxwAu6eurI0A4AMOyBemtFbuvuqTBxSAC3rmDAD0JwPCgU2h2pyktbS+svHMlSutU+M7pzAMw7DAwODikTExbefPdfqkupcxY8anvPfeO7x77rnH5B1HgPrCzZvnacWU4LPwbkHs9i9Idc6lmLFXjSqVxfHMt6XixP9eKx4WEBiIdlbg4+NTmpyc7BjWLXKA/i4Wi5vGjx8vKy8vD+ZyuSjfG1C0wMvZWfyei6cugskyrR1tKamajvwtTeLRQIFUwMBuR8DsASgAGiQBAfHPunik3e/oYlXA16wMNGKW1lfirRoNxez9rqqqEkWPiHGvqa5s9/b2vmUXMnlyfPIbb7zGe+DmbsmVx6vZ4+HLd6TSLE4U87l3kTD2y89ITXnWAgpN66eul0b6+Pqa1kLu7u5VmZmZrNDQ0FuiDZMnT07m8/nYuXPnunhcNG+e0JCWSbxCwkq9Ia1PLNZp0GbEbusnJIt9AEWFF24YiO2eNEbGfhLug2Wi6povdu2S/nvFii4XRELCzESj0UhJTk66JT41Y0ZC4lvr3nK+e/58kyfZjcer3+Huy3Wm0dwsHbV+Sx4Uxnz8H3KAGjnmqlGttthCbW6SCI+XFEWaLZSHh0dleno6q/eUp1arVUFBQeLTp09jEydO7PKtzZw6Ncnzahn+pIubTXyjjc89dWUyHAC9eUj6KunuurYPoADQ656iG+4S/Ef/MI0DleZsaYd2r3elQ5m5R9kSUNXQwHZ1czNZGYVCofT19dfn5+eqey9a586bL9zw9tse06dPM3WmK5cr+tLDl27NlBf4+DJh9GZyb91dihlzzahSW+yq2CKXCPfnZIeG31yEe3l5XT9//jxt9OjRPTYTK1euFFAoFMru3bu7gFNZUdEwbuRI+MY7gGeNJe6u52R1R+4H8pt3y+OA8qeabOmvO7WG6myXAqfR0w6P8F2TlvPdLY5292Zqe7NMIPLzZuVfvdo1dS5YuEg4cdJE6rsbe+7yFi66V/jepk2+48aNiUDtOHM44q88fAgvKwLVwU8uT4zauJ6UH+pizNhSTKWy2Dv/oVwi2JGcFDhy1KhQxDfyiB85coRIuLlbNevEz8+vpLS01OQpR3+TiMWyUZGRihd4zsqJXJ7Nacv/FlVnyDADmgWkNz3k9sKTnaY8xA4NTMeq2FRK6Un/CIuV25ckq8Q12Tt+/JG+8N57TYvtXbt2pwsSE7XHjx7psXi+7/7Fwo8/+iA4KirK5FR15nCkX7j76n2sSIcNXfl00rA319o8ANB3rQXUp81SwUcXz/uOnzDBtKgOCAgo3LZtm/GBBx7oAonRaDQGBgaWi8Xirg1KgIfH9buAKn/c2d3mAVCr19U811iL3BPoyNS3gMOzdkOT3dZQnRzRgQo1N5j02+LhVzTGiuyD3gIlq5U5Z9yc9eaMzpMnT+YePnqs/eeffuwBKGShdu/aERkQEGDaLaFY3pee/jofBqOHe+F2Cgt7YXVyxKsvkYqPWQuoz+VSwcbTpzynTZ9umqpDQkLyNm7cqF/Rbe2oVCpVU6dOLSosLDR5yn85cSL3xcceh+/8gm22TKidVZLalDqDrnNXZ4crEHvr1l5rqM52qSZv6yZ/OiP1G98Qm31SNQZd5fpmKbtFrTbteg4e/CEzOTlZ8803e3osQuPixiWnpSWP6xYcbtnm5a/1ojNMDkNLSsRra1LCnl9Fatt8cWRcKabWWGyVUbbBmuNHXefe3EygEMvy5cuNr3fLpkChl9jY2PTCwkLT1P/exo2Jmdu+xl+0ISvVrAexwVD3tKQa6ZQGBAiAMF10b9diX0B1Ls4rAYC9xydYEmCFg7G7VEU6bcn7TeJAc7bB6tXPC51dXSkfbHm/h6n39vYraGwUdTn9nJjMtt3egXprEvWj1r2RFvzMCptcHWaeL46Iu45pNBaHexCgVu77nn/f4sWm4PCsWbMSIyIiiO6Lb/T3qKiojNLSUtOOFwWHs3fswl4iAahurgK05iX9Nl5fSLQ3oJCV2nzDJ7nRm8ZI33ub0zAoOf+ySnmt0WAw+jGZjASuQ5Q5H+qsUpF2RKfybGpvNwVPJ0yYnLx27auchx9e0hWG+PXXX/NXP/8S0VBfY+oUFPty4/GIHwPCGNYctxq+aWN60PLHSGVsXogeXYZrtRY7Gb+QSwVLt37CWfHMMyawvPXWW4kFBQVw9uzZHgPGx8enRCKRmEI6e3bsSPv6jTew3tkGGHqLGAClYLNvZ2racaz1kYZKdOYRLfBLAAeUa9b/Y8dW2i/7Awq58jutlNvbHr4FUzkOtxwvytWoCz9tlbmuXbeuZvrMma4fbt7clCIUDj/iH+pCo1AYKN/acdJE+P3CBdMUFxAYknflj4vu4eHhAS0trW3btn9d9Omnn4af/OVn+bw5c0xJeNevXauJj43V/uAfavHUg+hGfrgl03/pQ6QOKVyMHl2OabWmnaYlZXuzVBD5xGOUz7/uDPmgZMFZs2ZV79u3jz9mzJgwc968j4/PtdLSUj+UApybnV0+e/JkypGAMJNrAWVkfN4qYwSEhrfQ6FSQVFZy1rp4cKKYfWdafCyXCIRqZeca1A6PVf+ZnHcCUMhKvQEAH7OolOsn/MLDegcyH62vrPhs585m8whFzI0fNSolXiqnzeM5TXpCVH1dkJ3NHBETE4J+mz13njAjPTPEaDTw6QxG2/DIqPq9e7/1GzlypOl38wg+sm69ztpTzDFbP8n2e+BeUufyLg4fVY7p9BYD6idFa3KmG5/RPQU4Pz+/4t5771W1trYOd3BwqIyMjJQXFRUFV1VV8RGgcHTvM48n+9zd1+DDYPg9Kaq+evDUKdy8DisqKKiaPnEi7YBPkFdva6XAjS2PNlRRCBQmo0AmYKb7yO1unTqxemcKF53ZQy6WOTy+8JVutwSj1N9HxTXtrRqNM5VKNZ2ARQWluEaFhKDn6Q1jJ06svygQ3LI1RgtV5OjrzbJOp9NFBgSUvM929LEm/Re1M3rHl3ned88ndS/BhejYClyrszjDQaTX166R1vtcSkqqmjhpUg+LioLhaWlposrKSq2npyfj2Wef7ZqO33jllcQfd+3iuNAYWhmb6SJqbu6R1Ddr2rTEuypq+WM53B6zwtrG+sSrelOYBQ120k+Y3Q4ydwpQiPHnAGDnjSWCdod3kCSEyeqyJssltaVipTLcHLOzFdMtzc2txw4fLv1oyxbOMmDoZzo4Wj11jf1uV4HHXTNJnfq9MDy2EtfpTOs9S8u+1mbhOXV79L5Dh+oXL1likSsADagdX32VplAo8Fdefz3OHDA2f/PRJUsEI5MzXMd0O5eXrlYVbJaL0LKACgScBgLusZRHW+rdOUAhvxQNUoGA8Q40avExv/BoKhIKAI4rWpJaJo7Dfzl9elp3K/VnAiAnX3lpaUNSUlJjemqqNj83l9VQX+9h1OmoI1ns+qed3SM8rXAVdP/O2P3fF3tMn2px+m5fPJ6PGlVF6PUmr7c1JVujLjiokKu1PB47PiFBMXvuXM7U+HivsIgIf2sHG9JRsJfX1Z1O7hHmUy8qHFc80lDRgQEgV4Hu5rXRZdbwaG3dOwkoxMsI9C4xALDuc3RJXOni0TWNoRBLFm70m79ooWhGQgLbw9OT5eruzm6oq1M11NfrCgsKDMWFhSxRQ4ObWq32o1OpMlcKTRbIZGliWWz2BA4v1Br3wJ8pZsLRg9dcJ06wOA7XVzsXokZV43p9lwW2thPQrTOZGlXRZZWyo0yn8dISRAiTxZJ4enrKRsfFqecvXMidNmOGX1BwsHdfh0JRfO+BhQsbxsvbjEv4Ll1O2ucktSm1ZicmwDs3LhR731rerK1/pwHVtUBHU98XXgH1kSxO1+K1Xq+rOdDeUlum1XrqCNyNAGBSANRcKrUpgMlSjGCyKbEcrnsYgxXKoFBMCXf2LpNPHi/jj461eMvfN6BianC9warjS7eTQ4VjbXk6dUWeWtNRZtCy5Bjma8RxlOpCZTCZElcXl2Y2l6tXq1RMRVsbn48Rzc+6enBHszldlvagollwTNFs3tVl37wIw2Bv/fVu784DCnllaZAIBExhUihVh/3CvHhUqinY+XcoU379udJp5Air1j+9+b4QObIGNxjtBqg/0ws6pdKMGeQagtChOnwKzcGLwfCldsblusrN5Dnkv0LXA3TcfHKD1IX2lvbVXwEoxEsguvoHADzQkau9fiETrDnda6kwttSLv3CmxiE8lBQYLkTG1OEGg8Vpx7bwaSmN2GCof0ZSzSUAOnPCKPAMYPCdpfRk6/1VgEJL9DnowUYUR/o7PTg0XXBRxA0MsPhehj6nvMiYetxgsPnCL7KdaKZXYXjHY+JKmZ4gzBuEQ4DDE/Zq35J2/jpAIW5uZnaiq4vfcvcpmM51JHVznCUC9ldnRvIVKcfXh9SxpPPDRjYQRqPFGQ798WTL7zgA/i9RVV4zZuzUaWeu+Cy0drWlPVtp/lpAdYIK7TQ2AIBqg4dv+RTOwL7CkJCR1Mz28LA4ZbgvRf8dANV113gngzU3U1NIHy23Flh/PaAQpChwEd3agizVg04uqU85/8+dYK0AZOvPys1QMJz5t70hrr9vXBg2UowbjRanzPTXnrW/f9nSmHKho92cgtMIOKCEQXTV0l9eBgJQSMgAoEIhSrJE/7nb0Vn44gBdTT27IEtJd3Q0XcphaxlIQO1slQlPd57+RQVdvIpcBaTevLNVD50z7UAVGqB7zn80TYIA+LMuHhm2HsEiI8LswuwOuoODA5k2zoePkBA4ZvEVQmS+ZaYlAIjNMnFqhrbDbJnaAYc5AJBpj/ZtbWPgAIU4/t8iHf3P8AjfNZ3MAQdblDC7IEtFv3kIwBZ6RHM+YkQjgWGmNOS/oqhwXLWmsbZQZDSYEwORZZpP9gFqe/A+sIBCEtDgKSBgtykn/cbNoehR7E+9AibcKc94b6XNKc5V07hcm087o/bOhkdLKZ2e7DteavS6mjXSOqOeIMzZDWjNNHcgp7nuQg88oDpBteDm9GfyoKM8qk88AyHCiltUbO3JuSX5KiqHTcpzfz58uIzACavuB7eF3987FFk7W6RRBIB5zYd2cwhMf4kX3BKe/x6A6uR0FFDhJLoE9ibjmkWO/JTnXLzusial1xKhu9eZU5KnonE4JAEV3UTguF0u7OqLfz1BaN+RNWQUdh4d7+wzAi4CActMl4X9jcrfCVBILSij8NCNrMIFZh250uhZX3kHBrjR6HdkjTKnJE9N43BITXnnwoa3AkFYfJ+CNf1foNWUvNvUwOnm/cZRNizgsBHdJ2JNW39F3b8boJDM6P5zlEL8wc0dIBqSzS+5elXMc+Db7dpFs3LnXM3X0Nhsi2/N7atTzoUNVwJBkHI99G63A8cV7zeJCop0GrSLMwd/G4ECKwAzhbD+luXvCKhORdHgbiBMQc0uhyE677fB3dc30Mqbbm+n+TkleRoah0MOUKHD1QAEKStn5hHdQnOgTZ56or1lBAGme5vM5SfAYSXZN4HvNAr/voDqlBydoPnkxlVJ3Y9LG0OYzOy3Xf2CfZkM0tOgXSxUaBTKM7L4JYk/61R0icXWFomDDie652e1AcCbN14s/+ZOg8Ee7f/dAWW2VguBgC8AoPvJEm0Mi5Pxkqt3qJ8Vdxn0Vtrs/Mx2upOT6aUCW8u5ULTxss1JjByUl1Xt2btbZQ5qHO+eOYraRNkCb6KTVrby9lfTDQ5AdWqFCVRYc8MB+jYAdAcA7k6jpz3r4kmN5zqgEyJWyZSQlihje3navOUnjJjx/LARVt93iREE/ltHW8HBNrmj9n8+pU5JKZACmGkdmfpXA4Ls96xSPtmP2Yne9SawXu4FLOS/Klvs6CJ92MltLItCsWhNM+3S2XpeaIjNuUyYRqO+OCLOom8h+WWYUXqgrelaoqojAgOiZx4WAZeAgP8AgMBOuvrLmxmMgDIrCd3t+RK6UATQTWw9S0cIg1WwlO/KRieXb3djLtmccq1M1iSYNP22PijkRxKqlIVHFM2EFDOgfKXuFo24ebwJASnjL0eAnT84mAFlVgUTaLDE9PgNAbe4FSgAbb50xrU5Dnx8OtcxxLvXcSuyR9GVZeU1KfPvuSWFWIEZWwTqjuunla0gMhrQubjeAWh06+6xGy8Y7ACAAjv364A19/8BUN2VFw1UePTGezzoX5/HmigATa40eo0PnaFxo9HxwPHjVH6TJprWZI6OjlRvH2+Gh5sHy9PTk+Pm5sZzcXHhoQOWzc3NHW1tbRqlUqlvbmnWy2Qy00GBtsqqjqqDh7jtOIa1Yka8XKdlSjBjAEYQfU2jOBCQCFQ4DBgct9dVzgOGnj4+/P8NUGYRkVwTgAoLgWLyZ6FpZqBk1d64h0kIFPj9xo0nP6Pbov9OALA3LwOlZHvL0V97nkCD+Btvmky7kS06FQhAtwbfkXN+N3xGmht3jWbdeDslGSiQDBgIAUDdH4P/X37/pwCqd3+hRXEU0GAUEICciGFAgZAbaTRocY/SUPpLuOswZUdSoA4I0zWQ1UCBYsBMmZIo8m/8/wIQa+X4pwKqPz2hy7tQOAa5A8yWDIEELaRV6H6z/hr4p/4+BKh/as/fIbmHAHWHFPtPbXYIUP/Unr9Dcg8B6g4p9p/a7BCg/qk9f4fkHgLUHVLsP7XZIUD9U3v+Dsk9BKg7pNh/arNDgPqn9vwdkvv/AHwU0hkqseD8AAAAAElFTkSuQmCC" x="0" y="0" width="148" height="176"/> 
                            </svg>`;
    
        let html;
        if (isO2 && idx == 0) {
            html = /*html*/`
                <div class="srbO" style="width:70px">
                    <div class="element" style="margin-top:10px;margin-left:-10px">
                        ${svgO2}
                    </div>
                    <p>SRB</p>
                </div>
    
                <span class="right-plate-text-display" style="margin:auto;"></span>
            `;
            document.querySelectorAll(".manyLeft")[2].textContent = 12;
            document.querySelectorAll(".manyLeft")[0].style.display = "none";
            document.querySelectorAll(".manyLeft")[1].style.display = "none";
            const rightInput = document.getElementById("text-input"); // used for right side or o2 mode
            
            rightInput.value = "";
    
        } else if(idx == 0){
            html = /*html*/`
                <div class="srbO" style="margin-right:20px">
                    <p>SRB</p>
                </div>
    
                <span class="left-plate-text-display" style="width:75px;"></span>
    
                <div class="element" style="margin-left:15px">
                    ${svgO2}
                    <p class="middle-plate-text-display"></p>
                </div>
    
                <span class="right-plate-text-display" style="margin-right:25px; margin:auto;"></span>
            `;
            document.querySelectorAll(".manyLeft")[2].textContent = 8;
            document.querySelectorAll(".manyLeft")[0].style.display = "inline";
            document.querySelectorAll(".manyLeft")[1].style.display = "inline";

            const leftInput = document.getElementById("left-input");
            const centerInput = document.getElementById("center-input");
            const rightInput = document.getElementById("text-input"); // used for right side or o2 mode
            
            leftInput.value = "";
            centerInput.value = "";
            rightInput.value = "";
    
        }
        if(isO2 && idx == 1){
            html = /*html*/`
                <div style="display: flex; align-items: center; justify-content: space-between;" class="motor1">
                                                <div class="srbO" style="width:70px">
                    <div class="element" style="margin-top:10px;margin-left:-10px">
                        ${svgO2}
                    </div>
                    <p>SRB</p>
                </div>
                                <span 
                                style="margin:auto;" class="middle-plate-text-display"></span>

                            </div>
                            <div style="border-top: 5px solid black; transition: 0.2s; display: flex; align-items: center;" id="sp" class="motor">
                                <span class="right-plate-text-display" style="margin-right: 10px;"></span>
                            </div>
            `;
            document.querySelectorAll(".manyLeft")[2].textContent = 8;
            document.querySelectorAll(".manyLeft")[1].style.display = "inline";
            document.querySelectorAll(".manyLeft")[0].style.display = "none";

            const centerInput = document.getElementById("center-input");
            const rightInput = document.getElementById("text-input"); // used for right side or o2 mode
            
            centerInput.value = "";
            rightInput.value = "";
    
        } else if(idx == 1){
            html = `
            <div style="display: flex; align-items: center; justify-content: space-between;" class="motor1">
                                <div class="srbO" style="padding-top: 30%;">    
                                    <p>SRB</p>
                                </div>
                                <span class="left-plate-text-display"></span>
                                <div class="element" class="div">
                                   ${svgO2}
                                    <p class="middle-plate-text-display"></p>
                                </div>
                                                      </div>
                            <div style="border-top: 5px solid black; transition: 0.2s; display: flex; align-items: center;" id="sp" class="motor">
                                <span class="right-plate-text-display" style="margin-right: 10px;"></span>
                            </div>
            `
            document.querySelectorAll(".manyLeft")[2].textContent = 8;
            document.querySelectorAll(".manyLeft")[1].style.display = "inline";
            document.querySelectorAll(".manyLeft")[0].style.display = "inline";
            const leftInput = document.getElementById("left-input");
            const centerInput = document.getElementById("center-input");
            const rightInput = document.getElementById("text-input"); // used for right side or o2 mode
            
            leftInput.value = "";
            centerInput.value = "";
            rightInput.value = "";
        } 
        if (idx == 2 && isO2){
            html = /*html*/`
             <div style="display: flex; align-items: center; justify-content: space-between;" class="motor1">
                              <div class="srbO">
                                                      <div class="element" style="margin-bottom:10px">
                        ${svgO2}
                    </div>
                                  <p style="margin-left:10px">SRB</p>
                              </div>
                              <span class="middle-plate-text-display" style="margin:auto"></span>
                          </div>
                          <div style="border-top: 5px solid black; transition: 0.2s; display: flex; align-items: center;" id="sp" class="motor">
                              <span class="right-plate-text-display" style="margin-right: 10px;"></span>
                          </div>
        `;
            document.querySelectorAll(".manyLeft")[2].textContent = 8;
            document.querySelectorAll(".manyLeft")[1].style.display = "inline";
            document.querySelectorAll(".manyLeft")[0].style.display = "none";

            const centerInput = document.getElementById("center-input");
            const rightInput = document.getElementById("text-input"); // used for right side or o2 mode
            
            centerInput.value = "";
            rightInput.value = "";
        } else if(idx == 2){
            html = `
            <div style="display: flex; align-items: center; justify-content: space-between;" class="motor1">
                              <div class="srbO" style="padding-top: 30%;">    
                                  <p>SRB</p>
                              </div>
                              <span class="left-plate-text-display"></span>
                              <div class="element" class="div">
                                  ${svgO2}
                                  <p class="middle-plate-text-display"></p>
                              </div>
                          </div>
                          <div style="border-top: 5px solid black; transition: 0.2s; display: flex; align-items: center;" id="sp" class="motor">
                              <span class="right-plate-text-display" style="margin-right: 10px;"></span>
                          </div>
            `
            document.querySelectorAll(".manyLeft")[2].textContent = 8;
            document.querySelectorAll(".manyLeft")[1].style.display = "inline";
            document.querySelectorAll(".manyLeft")[0].style.display = "inline";
            const leftInput = document.getElementById("left-input");
            const centerInput = document.getElementById("center-input");
            const rightInput = document.getElementById("text-input"); // used for right side or o2 mode
            
            leftInput.value = "";
            centerInput.value = "";
            rightInput.value = "";
        }
    
        /* --------- inject and refresh --------- */
        plates[idx].innerHTML = html;   // replace the plate’s internals
        write();
    }
    

    const addToCartBtn = document.querySelector("#add-to-cart-btn");
    const addToCartBtn2 = document.querySelector("#add-to-cart-btn2");
const cartNotification = document.getElementById("cart-notification");
const viewCartBtn = document.getElementById("view-cart-btn");
const cartPage = document.getElementById("cart-page");

// Klik na "Dodaj u korpu"
addToCartBtn.addEventListener("click", () => {
  cartNotification.classList.add("show");

  // Automatski nestane nakon 4 sekunde
  setTimeout(() => {
    cartNotification.classList.remove("show");
  }, 4000);
});

addToCartBtn2.addEventListener("click", () => {
    cartNotification.classList.add("show");
  
    // Automatski nestane nakon 4 sekunde
    setTimeout(() => {
      cartNotification.classList.remove("show");
    }, 4000);
  });
  

// Klik na "Pogledaj korpu" u notifikaciji
viewCartBtn.addEventListener("click", () => {
  cartNotification.classList.remove("show");
  cartPage.style.display = "inline";
    document.body.style.overflowY = "hidden"
});
