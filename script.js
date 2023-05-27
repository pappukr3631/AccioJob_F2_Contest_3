// 
function appendOnWebPage(data) {
    console.log(data.length);
    let container = document.getElementById("list");

    for(let i=0; i<data.length; i++) {
        let obj = data[i];

        // console.log(obj);
        let listItem = document.createElement("tr");
        console.log(listItem);
        //        
        let td1 = `<td><img src="${obj.image}"> ${obj.name}</td>`;
        let td2 = `<td>${obj.symbol}</td>`;
        let td3 = `<td>$${obj.current_price}</td>`;
        let td4 = `<td>$${obj.market_cap}</td>`;
        let td5 = `<td>${obj.price_change_percentage_24h}%</td>`;
        let td6 = `<td>Mkt Cap : $${obj.market_cap}</td>`;
        listItem.innerHTML = td1 + td2 + td3 + td4 + td5 + td6;
        //Adding to web-page
        container.append(listItem);
    }
}



let response = fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);


// console.log(response);
response.then((data) => {
    let prom = data.json();

    prom.then((arr) => {
        console.log(arr);
        appendOnWebPage(arr);
        console.log("after");
    });

    prom.catch((message) => {
        console.log(message);
    });
});

// response.catch((message) => {
//     console.log("catch method");
//     console.log(message);
// });