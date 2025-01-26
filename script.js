

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let rate = toCurr.value;
// for creating new element for in out html 
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
// adding function for updating flag 
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Adding Date
const today = new Date();
    
    // Format the date (e.g., January 26, 2025)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    // Display the date on the page
    document.getElementById('date').textContent = ` ${formattedDate}`;

    //Adding time
    function updateTime() {
      const clock = document.getElementById("clock");
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      clock.innerText = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update the clock every second
    setInterval(updateTime, 1000);
    
    // Initialize the clock immediately
    updateTime();
    // Function for fetching data from api
    const fetchdata = async () => {
      let baseurl = "https://open.er-api.com/v6/latest";
      let amount = document.querySelector(".amount input");
      let amtVal = amount.value;
    
      if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
      }
    
      const URL = `${baseurl}/${fromCurr.value}`;
      let response = await fetch(URL);
      let data = await response.json();
    
      let rate = data.rates[toCurr.value];
      console.log(rate);
    
      let finalAmount = (amtVal * rate).toFixed(2); // Calculate and format to 2 decimal places
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    };
    // adding event on button
    btn.addEventListener("click", (evt) => {
      evt.preventDefault();
      fetchdata();
    });
    // adding event for window change
    window.addEventListener("load", () => {
      fetchdata();
    });

    


  
    
  