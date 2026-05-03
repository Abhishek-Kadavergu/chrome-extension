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

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log("clicked")
    render(myLeads);
    console.log(JSON.parse(localStorage.getItem("myLeads")))
   
})

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
  
function render(leads) {
    let listItems = "";
    for(let i = 0; i < leads.length; i++) {
        listItems += `
        <li> 
            <a href="${leads[i]}" target="_blank"> 
                ${leads[i]} 
            </a>
        </li>
        `
    }  
    unorderedLI.innerHTML = listItems;
}

