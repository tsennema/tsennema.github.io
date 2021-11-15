let params = new URLSearchParams(location.search);
let wheelSelect = params.get('wheelManageSelect')

function loadWheelManagePage() {
    if (wheelSelect === "NewWheel") {
        loadNewWheel();
    }
    if (wheelSelect !== null) {
        loadManageWheel();
    }
    else {
        window.location.replace("../")
    }
}

function loadManageWheel() {
    // This page will essentially have a heading with the wheel name + edit name
    // tag names + edit tag name, add new tags, delete tags with warning
    // list of entries (scrollable?), editable, deletable, and spot to add new ones
    let wheelName = document.getElementById("wheelName")
    wheelName.innerHTML = wheelSelect.charAt(0).toUpperCase() + wheelSelect.slice(1);

}

function loadNewWheel() {
    // this function will allow creation of new wheel, set name, tags, and add entries
    // Todo
}