function appendOnWebPage(data) {

    let container = document.getElementById("list");
    container.innerHTML = "";

    for(let i=0; i<data.length; i++) {
        let obj = data[i];

        let listItem = document.createElement("tr");
        // inner content
        let td1 = `<td><img src="${obj.image}"> ${obj.name}</td>`;
        let td2 = `<td>${obj.symbol}</td>`;
        let td3 = `<td>$${obj.current_price}</td>`;
        let td4 = `<td>$${obj.market_cap}</td>`;
        let td5 = `<td class="green">${obj.price_change_percentage_24h}%</td>`;
        if(obj.price_change_percentage_24h < 0) {
            td5 = `<td class="red">${obj.price_change_percentage_24h}%</td>`;
        }
        let td6 = `<td>Mkt Cap : $${obj.market_cap}</td>`;

        listItem.innerHTML = td1 + td2 + td3 + td4 + td5 + td6;
        //Adding to web-page
        container.append(listItem);
    }
}


let allData;

function sortByMktCap() {
    appendOnWebPage(allData.sort((a, b) => {return a.market_cap - b.market_cap}));
}

function sortByPercentage() {
    appendOnWebPage(allData.sort((a, b) => {return a.price_change_percentage_24h - b.price_change_percentage_24h}));
}

//Action listener for search bar

let searchBar = document.getElementById("search_input");
searchBar.addEventListener('change', search());

function search() {
    let str = searchBar.value;
    console.log(str);
}



let response = fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);


response.then((data) => {
    let prom = data.json();

    prom.then((arr) => {
        // console.log(arr);
        appendOnWebPage(arr);
        allData = arr;//making it available in global context
        // console.log("after");
    });

    prom.catch((message) => {
        console.log(message);
    });
});
