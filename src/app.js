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
function formatday(timestamp){
    let date = new Date (timestamp *1000);
    let day = date.getDay();
    let days =["Mon", "Tue", "wed", "Thur", "Fri", "Sat", "Sun"];
     return days[day] ;
}

function displayForecast(response){// response is for receving the apicall
    //selecing the element 
      // creating an array that goes into each day 
   let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    // to repeat the days of the week forecast we will use loop
    // creat variable which stores the hTML OF The forecast
     let forecastHTML = `<div class="row">`;
   
   //generating the loop
     forecast.forEach(function(forecastday,index) {
         if (index <6){
     forecastHTML= forecastHTML +` <div class="col-2">
                <div class="weather-forcast-date" >
            
                ${formatday(forecastday.dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="" class="" width="42"/>
                <div class="weather-forcast-temperature">
                <span class="weather-forcast-temperature-max">${Math.round (forecastday.temp.max)}°</span>
                 <span class="weather-forcast-temperature-min"> ${Math.round(forecastday.temp.min)}°</span>
              
           </div>
              </div>
            
         `;  }
         
          //displaying acutal real data from the Api (forecastday(parameter) weather array)
          // don't forget to close the array
     });
          forecastHTML=  forecastHTML + `</div>`  
          forecastElement.innerHTML= forecastHTML;
     }
    
         
function  getForecast(coordinates){
    console.log(coordinates);
    //making the api call
    let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    //hey axios get api url and then display the function (dispaly forecast) 
    axios.get(apiUrl).then(displayForecast);
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
    celsiusTemp = response.data.main.temp;

   temperatureElement.innerHTML= Math.round(celsiusTemp);
   cityElement.innerHTML=response.data.name; 
   descriptionElement.innerHTML=response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
   windElement.innerHTML=Math.round(response.data.wind.speed);
   dateElement.innerHTML=formatDate(response.data.dt *1000);
   iconElement.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    // made space in src and forgot , btw src and http
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
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

// form and fr are global variable  cz they arent created inside a function and you can access to it 
let form = document.querySelector("#search-form");
form.addEventListener("submit", formSubmit);




 