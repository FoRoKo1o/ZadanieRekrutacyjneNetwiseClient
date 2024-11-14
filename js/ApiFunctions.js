var ApiUrl = "https://localhost:7129/api/Cat/";
var pageSize = 10;

async function GetSavedPage(page, amount) {
    console.log("GetSavedPage", page, amount);
    const url = `${ApiUrl}GetSavedCatsPage?page=${page}&pageSize=${amount}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        AddFactBox(data);
    } catch (error) {
        console.error("Błąd podczas pobierania strony faktów:", error);
    }
}
async function GetSavedAmount() {
    const url = `${ApiUrl}GetSavedFactsAmount`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Błąd podczas pobierania liczby zapisanych faktów:", error);
        return 0; 
    }
}
function AddFactBox(data){
    let boxContainer = document.getElementById('boxContainer');
    boxContainer.innerHTML = '';

    data.forEach(element => {
        boxContainer.appendChild(CreateBox(element));
    });
}
function CreateBox(element){
    let box = document.createElement('div');
        box.className = 'box';

        let factDiv = document.createElement('div');
        factDiv.className = 'Fact';
        factDiv.textContent = "Fact:" + element.fact;
        box.appendChild(factDiv);

        let LengthDiv = document.createElement('div');
        LengthDiv.className = 'Lengt';
        LengthDiv.textContent = "length:" + element.length;
        box.appendChild(LengthDiv);

        let DownloadDateDiv = document.createElement('div');
        DownloadDateDiv.className = 'DownloadDate';
        DownloadDateDiv.textContent = "downloadDate:" + element.downloadDate;
        box.appendChild(DownloadDateDiv);

        return box;
}
function UpdatePageCounter(savedAmount){
    var page = document.getElementById('page');
    page.innerHTML = '';
    var pagenumers = savedAmount / pageSize;
    
    for(let i=0; i<pagenumers; i++){
        page.innerHTML += `<option value="${i}">${i+1}</option>`;
    }
    page.addEventListener('change', function(){
        const selectedPage = parseInt(page.value);
        GetSavedPage(selectedPage, pageSize);
    });
}
async function showCatFacts(page) {
    try {
        const savedAmount = await GetSavedAmount();
        UpdatePageCounter(savedAmount);
        GetSavedPage(1, pageSize);
    } catch (error) {
        console.error("Błąd podczas wyświetlania faktów o kotach:", error);
    }
}