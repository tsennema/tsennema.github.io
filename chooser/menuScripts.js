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

    // Second Select Menu
    let wheelManage = document.createElement("select");
    wheelManage.name = "wheelManageSelect";
    wheelManage.id = "wheelManageSelect";
    wheelManage.classList.add("selectMenu");
    // Populate options in second select menu
    for (const wheel in wheels) {
        let option = document.createElement("option");
        option.value = wheel;
        option.text = wheel.charAt(0).toUpperCase() + wheel.slice(1);
        wheelManage.appendChild(option);
    }
    let newWheel = document.createElement("option");
    newWheel.value = "NewWheel";
    newWheel.text = "+ New Wheel"
    wheelManage.appendChild(newWheel);
    // Place second select menu
    let label2 = document.createElement("label");
    label2.innerHTML = "";
    label2.htmlFor = "wheelManageSelect";
    document.getElementById("selectSpot2").appendChild(label2).appendChild(wheelManage);

}