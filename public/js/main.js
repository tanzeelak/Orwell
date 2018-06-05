function showNamesList() {
    var x = document.getElementById("names-list");
    if (x.classList.contains("hide")) {
        x.classList.remove("hide")
    } else {
        x.classList.add("hide");
    }
}