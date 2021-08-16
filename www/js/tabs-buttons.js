document.getElementById("home-tab-button").addEventListener("click",
    function () { showTab("home-tab"); });
document.getElementById("view-circuits-tab-button").addEventListener("click",
    function () { showTab("view-circuits-tab"); });
document.getElementById("settings-tab-button").addEventListener("click",
    function () { showTab("settings-tab"); });


function showTab(tabName) {
    console.log("Showing tab " + tabName);

    hideAllTabs();
    document.getElementById(tabName).style.display = "block";
}

function hideAllTabs() {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
}

showTab("home-tab");