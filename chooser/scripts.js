function populateWheelSelect() {
    let choose = document.createElement("select");
    choose.name = "wheelSelect";
    choose.id = "wheelSelect";
    choose.classList.add("selectMenu");

    for (const wheel of wheels) {
        let option = document.createElement("option");
        option.value = wheel;
        option.text = wheel.charAt(0).toUpperCase() + wheel.slice(1);
        choose.appendChild(option);
    }

    let label = document.createElement("label");
    label.innerHTML = "";
    label.htmlFor = "wheelSelect";

    document.getElementById("selectSpot").appendChild(label).appendChild(choose);
}

function randomSpin() {
    if (wheelSelect === null) {

    }
    else {
        window.location.href = "index.html"
    }
}