// let params = new URLSearchParams(location.search);
// let wheelSelect = params.get('wheelSelect')
let wheelSelect = "Restaurants"
let select = document.getElementById('wheelSelect')
select.addEventListener('change', changeSelect, false)

function loadSpinPage() {
    populateWheelSelect()
    loadWheel()
    loadFilterList("included", true)
    loadFilterList("allowMultiple", true)
    loadManageWheel()
}

function populateWheelSelect() {
    // Populate options in select menu
    if (!document.getElementById("wheelSelect").firstChild) {
        let choose = document.getElementById('wheelSelect');
        for (const wheel in wheels) {
            let option = document.createElement("option");
            option.value = wheel;
            option.text = wheel;
            choose.appendChild(option);
        }
    }
}

function changeSelect() {
    wheelSelect = this.value
    if (document.contains(document.getElementById("winList"))) {
        document.getElementById("winList").remove()
    }
    loadSpinPage()
}

function loadWheel() {
    if (document.contains(document.getElementById("wheelTitle"))) {
        document.getElementById("wheelTitle").remove()
    }
    let heading = document.createElement("h2");
    heading.innerHTML = wheelSelect;
    heading.id = "wheelTitle"
    document.getElementById("winnerSpot").appendChild(heading)
}

function loadFilterList(filterName, defaultChecked) {
    // Clear Tables if new wheel selected
    const body = document.getElementById(filterName + "Body")
    if (body.firstChild) {
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
    }

    let filterList = [];
    // loop through all headings other than name (should only be 2-3)
    for (let i = 2; i < wheels[wheelSelect].length; i++) {
        // loop through items in the selected wheel
        for (item of wheels[wheelSelect][0]) {
            let temp = item[wheels[wheelSelect][i]];
            if (filterList.indexOf(temp) === -1) {
                filterList.push(item[wheels[wheelSelect][i]])
            }
        }
    }
    // Having collected all unique identifiers beyond name
    for (heading of filterList) {
        let newRow = document.createElement("tr");
        let newCell = document.createElement("td");

        let listCheck = document.createElement("input");
        listCheck.type = "checkbox";
        listCheck.checked = defaultChecked;
        listCheck.id = filterName + heading;
        listCheck.className = filterName;

        let listItem = document.createElement("label");
        listItem.setAttribute("for", filterName + heading);
        listItem.innerHTML = heading;

        document.getElementById(filterName + "Body").appendChild(newRow).appendChild(newCell).append(listCheck, listItem);
    }
}

function loadManageWheel() {
    // This page will essentially have a heading with the wheel name + edit name
    // tag names + edit tag name, add new tags, delete tags with warning
    // list of entries (scrollable?), editable, deletable, and spot to add new ones

    // Clear Things if new wheel Selected
    const tableHead = document.getElementById("wheelManageHead")
    if (tableHead.firstChild) {
        while (tableHead.firstChild) {
            tableHead.removeChild(tableHead.lastChild);
        }
    }
    const tableBody = document.getElementById("wheelManageBody")
    if (tableBody.firstChild) {
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }
    }

    let wheelName = document.getElementById("wheelName")
    wheelName.innerHTML = wheelSelect;
    let itemList = wheels[wheelSelect][0]
    let headings = []
    for (let i = 1; i < wheels[wheelSelect].length; i++) {
        headings.push(wheels[wheelSelect][i])
    }
    let headingRow = document.createElement("tr")
    document.getElementById("wheelManageHead").appendChild(headingRow)
    for (h of headings) {
        let heading = document.createElement("th")
        heading.innerHTML = h
        headingRow.appendChild(heading)
    }
    for (item of itemList) {
        let newRow = document.createElement("tr")
        newRow.className += 'entry'
        for (h of headings) {
            let cell = document.createElement("td")
            cell.innerHTML = item[h]
            cell.id = "cell" + item[h]
            newRow.appendChild(cell)
        }
        let delCell = document.createElement("td")
        let delButton = document.createElement("button")
        delButton.innerHTML = "Delete"
        delButton.className += "editButton"
        let nameString = item["name"]
        delButton.onclick = function () { deleteItem(nameString) }
        newRow.appendChild(delCell).appendChild(delButton)
        document.getElementById("wheelManageBody").appendChild(newRow)
    }
    let addRow = document.createElement("tr")
    let addCell = document.createElement("td")
    let addButton = document.createElement("button")
    addButton.innerHTML = "Add Entry"
    addButton.type = "button"
    addButton.className += "editButton"
    addButton.onclick = function () {
        addCell.hidden = true;
        let addForm = document.createElement("form")
        addForm.id = "addEntryForm"

        for (h of headings) {
            let inputCell = document.createElement("td")
            let addInput = document.createElement("input")
            addInput.form = "addEntryForm"
            addRow.appendChild(inputCell).appendChild(addInput)
        }
    };
    document.getElementById("wheelManageBody").appendChild(addRow).appendChild(addCell).appendChild(addButton)
}

function deleteItem(name) {
    let wheelList = wheels[wheelSelect][0]
    for (let i = 0; i < wheelList.length; i++) {
        if (wheelList[i]["name"] === name) {
            wheelList.splice(i, 1)
            break;
        }
    }
    document.getElementById("cell" + name).parentElement.remove()
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

function randomSpin() {
    // For reference, wheels["name"][0] is the list of objects
    // wheels["name"][1-3] are the object keys, if they exist

    // Get count value from page
    let count = document.getElementById("count").value;
    if (Number.isInteger(parseInt(count)) === false || count < 1 || count > 4) { count = 1; }
    else { count = parseInt(count); }
    // Get candidate list from Manage Table
    let candidates = generateCandidates();
    // this is where any edits to candidates should happen
    candidates = filterCandidates("included", wheels[wheelSelect][0])
    let winners = []
    let escape = 0;
    while (winners.length < count) {
        let temp = Math.floor(Math.random() * candidates.length)
        if (winners.indexOf(candidates[temp]) === -1) {
            winners.push(candidates[temp]);
            winners = filterCandidates("allowMultiple", winners);
        }
        escape += 1;
        if (escape > 50) {
            let noAnswer = { name: "No More Valid Winners" }
            winners.push(noAnswer)
            break;
        }
    }
    loadWinner(winners);
}

function generateCandidates() {
    // Get array of heading texts
    let headings = []
    let headingElements = document.getElementById("wheelManageHead").firstChild.children
    for (let i = 0; i < headingElements.length; i++) {
        headings.push(headingElements[i].textContent)
    }
    // Turn each element into an object
    let candidates = []
    for (entry of document.getElementsByClassName("entry")) {
        // Get array of texts from table
        let info = []
        let infoElements = entry.children
        for (let i = 0; i < infoElements.length - 1; i++) {
            info.push(infoElements[i].textContent)
        }
        // Add candidate to array
        let cand = {}
        for (let i = 0; i < headings.length; i++) {
            cand[headings[i]] = info[i]
        }
        candidates.push(cand)
    }
    return candidates
}

function filterCandidates(filter, candidates) {

    // find all elements with class and convert to array filterHeadings
    const filterHeadings = []
    const filterHTML = document.getElementsByClassName(filter);
    for (let i = 0; i < filterHTML.length; i++) {
        if (filterHTML.item(i).checked === true) {
            filterHeadings.push(filterHTML[i].id);
        }
    }
    // check if candidate should be added to filtered list
    const filtered = []
    if (filter === "included") {

        for (let cand = 0; cand < candidates.length; cand++) {
            // It's easy enough to remove candidates before the random selection
            let checkIfIncluded = true;
            for (let i = 2; i < wheels[wheelSelect].length; i++) {
                let heading = wheels[wheelSelect][i];
                if (filterHeadings.includes(filter + candidates[cand][heading]) === false) {
                    checkIfIncluded = false;
                }
            }
            if (checkIfIncluded) {
                filtered.push(candidates[cand]);
            }
        }

        return filtered;
    }
    // I don't want the original order to matter, so this filter should be called during the random selection process
    if (filter === "allowMultiple") {
        for (let cand = 0; cand < candidates.length; cand++) {
            // First only do stuff if it's not the last item, since of course the last item will match with itself
            if (cand !== candidates.length - 1) {
                // Checks every candidate to see if there's matching tags with the last candidate
                for (let i = 2; i < wheels[wheelSelect].length; i++) {
                    let heading = wheels[wheelSelect][i];
                    // If it finds any match
                    if (candidates[cand][heading] === candidates[candidates.length - 1][heading]) {
                        // Check if particular heading is allowed to be duplicated or not
                        if (!filterHeadings.includes(filter + candidates[cand][heading])) {
                            // If not allowed, remove the most recent candidate, and send it back to try again
                            let popped = candidates.pop(candidates.length - 1);
                            return candidates;
                        }
                    }
                }
            }
        }
        // If no issues found, return full list unaltered
        return candidates;
    }


}

