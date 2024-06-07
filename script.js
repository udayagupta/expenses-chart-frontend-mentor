let weeklyStatsDiv = document.querySelector(".weekly-stats");
let totalAmount = 0

let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

fetch("data.json")
.then(response => response.json())
.then(data => {
    for (let index = 0; index < data.length; index++) {
        const day = data[index]["day"];
        const amount = data[index]["amount"];
        totalAmount += amount;
        renderData(amount, day);
    }
    
    
    console.log(totalAmount)
    document.querySelector(".month-balance").innerText = `$${totalAmount.toFixed(2)}`
})
.catch(error => {
    console.log("ERROR: ", error)
})


function renderData(statAmount, statDay) {
    let date = new Date()
    const dayName = days[date.getDay()];
    // console.log(dayName);

    let statBar = document.createElement("div");
    statBar.classList.add("stat-bar");
    const maxHeight = 200;

    let amount = document.createElement("div");
    amount.classList.add("stat-amount");
    amount.innerText = `$${statAmount}`
    

    let bar = document.createElement("div");
    bar.classList.add("bar");
    let height = parseInt(statAmount*2);
    if (height > maxHeight) {
        height = maxHeight;
    }
    bar.style.height = `${height}px`;
    amount.style.bottom = `${height+32}px`
    amount.style.right = "-6px"

    console.log(height)

    let day = document.createElement("div");
    day.classList.add("day");
    day.innerText = `${statDay}`
    console.log(day)

    if (day.innerText === dayName) {
        bar.style.backgroundColor = "hsl(186, 34%, 60%)";
        amount.style.opacity = "1";
    } else {
        bar.style.backgroundColor = "hsl(10, 79%, 65%)";
    }
    
    statBar.appendChild(amount);
    statBar.appendChild(bar);
    statBar.appendChild(day);

    weeklyStatsDiv.appendChild(statBar);

}
