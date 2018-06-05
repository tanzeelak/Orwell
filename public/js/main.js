function showNamesList() {
    document.getElementById("input-name").innerHTML = document.getElementById('prompt-input').value;
    var namesList = document.getElementById("names-list");
    var whoForm = document.getElementById("who-form")
    if (namesList.classList.contains("hide")) {
        namesList.classList.remove("hide");
        whoForm.classList.add("hide");
    } else {
        namesList.classList.add("hide");
        whoForm.classList.remove("hide");
    }
}