let params = new URLSearchParams(location.search);
let wheelSelect = params.get('wheelSelect')

function populateWheelSelect() {
    // Create select menu
    let choose = document.createElement("select");
    choose.name = "wheelSelect";
    choose.id = "wheelSelect";
    choose.classList.add("selectMenu");
    // Populate options in select menu
    for (const wheel in wheels) {
        let option = document.createElement("option");
        option.value = wheel;
        option.text = wheel.charAt(0).toUpperCase() + wheel.slice(1);
        choose.appendChild(option);
    }
    // Place select menu onto webpage
    let label = document.createElement("label");
    label.innerHTML = "";
    label.htmlFor = "wheelSelect";
    document.getElementById("selectSpot").appendChild(label).appendChild(choose);
}

function loadSpinPage() {
    if (wheelSelect !== null) {
        loadWheel()
        loadIncludeList()
        // etc
    }
    else {
        window.location.replace("../")
    }
}

function loadWheel() {
    let heading = document.createElement("h2");
    heading.innerHTML = wheelSelect.charAt(0).toUpperCase() + wheelSelect.slice(1);
    document.getElementById("winnerSpot").appendChild(heading)
}

function loadWinner(winners) {
    if (document.contains(document.getElementById("winList"))) {
        document.getElementById("winList").remove()
    }
    let winList = document.createElement("ul");
    winList.id = "winList";
    for (let i = 0; i < winners.length; i++) {
        let winItem = document.createElement("li");
        winItem.innerHTML = winners[i]["name"];
        winList.appendChild(winItem)
    }
    document.getElementById("winnerSpot").appendChild(winList);
}

function loadIncludeList() {
    let includeList = [];
    // loop through all headings other than name (should only be 2-3)
    for (let i = 2; i < wheels[wheelSelect].length; i++) {
        // loop through items in the selected wheel
        for (item of wheels[wheelSelect][0]) {
            let temp = item[wheels[wheelSelect][i]];
            if (includeList.indexOf(temp) === -1) {
                includeList.push(item[wheels[wheelSelect][i]])
            }
        }
    }
    // Having collected all unique identifiers beyond name
    for (heading of includeList) {
        let newRow = document.createElement("tr");
        let newCell = document.createElement("td");

        let listCheck = document.createElement("input");
        listCheck.type = "checkbox";
        listCheck.checked = true;
        listCheck.id = heading;

        let listItem = document.createElement("label");
        listItem.setAttribute("for", heading);
        listItem.innerHTML = heading;

        document.getElementById("includeBody").appendChild(newRow).appendChild(newCell).append(listCheck, listItem);
    }
}

function randomSpin() {
    // For reference, wheels["name"][0] is the list of objects
    // wheels["name"][1-3] are the object keys, if they exist

    // Get count value from page
    let count = document.getElementById("count").value;
    if (Number.isInteger(parseInt(count)) === false || count < 1 || count > 4) { count = 1; }
    else { count = parseInt(count); }
    let candidates = wheels[wheelSelect][0];



    // this is where any edits to candidates should happen



    let winners = []
    let escape = 0;
    while (winners.length < count) {
        let temp = Math.floor(Math.random() * candidates.length)
        if (winners.indexOf(candidates[temp]) === -1) {
            winners.push(candidates[temp]);
        }
        escape += 1;
        if (escape > 50) { break; }
    }
    loadWinner(winners);
}



