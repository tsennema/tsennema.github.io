let params = new URLSearchParams(location.search);
let wheelSelect = params.get('wheelSelect')

function loadSpinPage() {
    if (wheelSelect !== null) {
        loadWheel()
        loadFilterList("included", true)
        loadFilterList("allowMultiple", true)
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

function loadFilterList(filterName, defaultChecked) {
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

function randomSpin() {
    // For reference, wheels["name"][0] is the list of objects
    // wheels["name"][1-3] are the object keys, if they exist

    // Get count value from page
    let count = document.getElementById("count").value;
    if (Number.isInteger(parseInt(count)) === false || count < 1 || count > 4) { count = 1; }
    else { count = parseInt(count); }
    // this is where any edits to candidates should happen
    let candidates = filterCandidates("included", wheels[wheelSelect][0])
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

