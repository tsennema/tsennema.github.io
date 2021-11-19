let params = new URLSearchParams(location.search);
let wheelSelect = params.get('wheelManageSelect')

function loadWheelManagePage() {
    if (wheelSelect === "NewWheel") {
        loadNewWheel();
    }
    else if (wheelSelect !== null) {
        loadManageWheel();
    }
    else {
        window.location.replace("../")
    }
}


// TODO: Move Management to be a pane in the main window, and the whole thing will just be one page
// Will be able to 'live-edit' the existing things, and build an example 3rd one by adding/changing elements
// Will be able to spin the new/edited things, but will all reset upon refresh, due to non-serverness
// Fix add functionality


function loadManageWheel() {
    // This page will essentially have a heading with the wheel name + edit name
    // tag names + edit tag name, add new tags, delete tags with warning
    // list of entries (scrollable?), editable, deletable, and spot to add new ones
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
    // let wheelNameEdit = document.createElement("button");
    // wheelNameEdit.className += "editButton";
    // wheelNameEdit.innerHTML = "Edit"
    // wheelNameEdit.onclick = function () { editWheelName("button") };
    // document.getElementById("wheelNameEdit").appendChild(wheelNameEdit)
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
