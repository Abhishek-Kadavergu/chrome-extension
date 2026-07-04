let inputBtn = document.getElementById("input-btn");
let inputEl = document.getElementById("input-el")
let deleteBtn = document.getElementById("delete-btn");
let tabBtn = document.getElementById("tab-btn");
let myLeads = [];
let unorderedLI = document.getElementById("unordered-list")


let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function saveInput() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

inputBtn.addEventListener("click", saveInput);

inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        saveInput();
    }
});

deleteBtn.addEventListener("click", function(){ 
    localStorage.clear();
    myLeads= [];
    render(myLeads);
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})
  
unorderedLI.addEventListener("click", function (e) {
    const copyBtn = e.target.closest(".copy-btn");
    const deleteItemBtn = e.target.closest(".delete-item-btn");

    if (copyBtn) {
        const index = copyBtn.dataset.index;
        navigator.clipboard.writeText(myLeads[index]);
        return;
    }

    if (deleteItemBtn) {
        const index = parseInt(deleteItemBtn.dataset.index, 10);
        myLeads.splice(index, 1);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li class="lead-item">
            <a href="${leads[i]}" target="_blank" class="lead-link">
                ${leads[i]}
            </a>
            <div class="lead-actions">
                <button class="copy-btn" data-index="${i}" title="Copy" aria-label="Copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <button class="delete-item-btn" data-index="${i}" title="Delete" aria-label="Delete">×</button>
            </div>
        </li>
        `;
    }
    unorderedLI.innerHTML = listItems;
}

