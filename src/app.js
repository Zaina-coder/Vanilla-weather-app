function formatDate(timestamp){
    //timestamp calucalte the seconds since 1970
    debugger;
     let date= new Date (timestamp);
 let hours= date.getHours();
  if (hours<10) {
     hours=`0${hours}`;
 }
 let mintues=date.getMinutes();
 if (mintues <10) {
     mintues=`0${mintues}`; 
 }

 let days =["Monday" ,"Tuesday", "Wednesday" ,"Thurday", "Friday","Saturday" ,"Sunday"];
 let day = days[date.getDay()];
 
 return`${day} ${hours}:${mintues}`;


}



function displayweather(response) {
   let temperatureElement = document.querySelector("#temperature");
   let cityElement= document.querySelector("#city");
   let descriptionElement=document.querySelector("#description");
   let humidityElement=document.querySelector("#humidity");
   let windElement=document.querySelector("#wind");
   let dateElement=document.querySelector("#date");
   //forgot ; in date
    let iconElement=document.querySelector("#icon")

   temperatureElement.innerHTML= Math.round(response.data.main.temp);
   cityElement.innerHTML=response.data.name; 
   descriptionElement.innerHTML=response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
   windElement.innerHTML=Math.round(response.data.wind.speed);
   dateElement.innerHTML=formatDate(response.data.dt *1000);
   iconElement.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    // made space in src and forgot , btw src and http
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

   
// making ajax call
function search (city){ 
    //has to end with C 
let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayweather);
 }

function formSubmit(event) {
    event.preventDefault();
     let cityInputElement = document.querySelector("#city-input");
     //to make the acutual search and fetch the data
     search(cityInputElement.value);
   
}

  search("New York")
 // calling the function onload


let form = document.querySelector("#search-form");
form.addEventListener("submit", formSubmit);


 