function showNamesList() {
    document.getElementById("input-name").innerHTML = document.getElementById('prompt-input').value;
    var namesList = document.getElementById("names-wrapper");
    var whoForm = document.getElementById("prompt-wrapper")
    if (namesList.classList.contains("hide")) {
        namesList.classList.remove("hide");
        whoForm.classList.add("hide");
    } else {
        namesList.classList.add("hide");
        whoForm.classList.remove("hide");
    }
}
