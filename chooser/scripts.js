let params = new URLSearchParams(location.search);
let wheelSelect = params.get('wheelSelect')

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

function loadWheel() {
    let heading = document.createElement("h2");
    heading.innerHTML = wheelSelect.charAt(0).toUpperCase() + wheelSelect.slice(1);
    document.getElementById("winnerSpot").appendChild(heading)
}

function loadWinner(winner) {
    let winList = document.createElement("ul");
    for (let i = 0; i < winner.length; i++) {
        let winItem = document.createElement("li");
        winItem.innerHTML = winner[i];
        winList.appendChild(winItem)
    }
    document.getElementById("winnerSpot").appendChild(winList);
}
// function randomSpin() { }
// if (wheelSelect === null) {
//     // window.location.href = "index.html"
// }
// else {

