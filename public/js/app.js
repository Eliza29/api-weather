var mapObj = document.getElementById('map');

let inputSearch = $('#input-search');
let btnGetWeather = $('#btn-get-weather');
let weather = $('#weather');
let wind = $('#wind');
let summary = $('#summary');
let humidity = $('#humidity');
let pressure = $('#pressure');
let btnGetWeatherWeek = $('#btn-weather-week');
let btnBack = $('#btn-back');
let monday = $('#1');
let tuesday = $('#2');
let wednesday = $('#3');
let thursday = $('#4');
let friday = $('#5');
let saturday = $('#6');
let sunday = $('#7');
let view1 = $('#view-1');
let view2 = $('#view-2');
let view3 = $('#view-3');
let monday2 = $('#8');
let icons = $('#icons');

let latitude;
let longitude;

function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;

  if (navigator.geolocation) {
    // funcionalidad para obtener la locación actual y añadir mapa
    let success = (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      var googlePos = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        zoom: 15,
        center: googlePos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var googleMap = new google.maps.Map(mapObj, mapOptions);
      var markerOpt = {
        map: googleMap,
        position: googlePos,
        title: 'Hi , I am here',
        animation: google.maps.Animation.DROP
      };
      var googleMarker = new google.maps.Marker(markerOpt);
    };

    let error = () => {
      alert('We have a problem finding your location');
    };

    navigator.geolocation.getCurrentPosition(success, error);

    // funcionalidad para obtener la información del clima 

    let showViewWeather = () => {
      view1.addClass('d-none');
      view1.removeClass('d-block');
      view2.addClass('d-block');
      view2.removeClass('d-none');
      view3.addClass('d-none');
      inputSearch.addClass('d-block');
      inputSearch.removeClass('d-none');
      mapObj.classList.add('d-block');
      mapObj.classList.remove('d-none');
      
    };

    let showViewWeatherWeek = () => {
      view1.addClass('d-none');
      view2.addClass('d-none');
      view2.removeClass('d-block');
      view3.addClass('d-block');
      view3.removeClass('d-none');
    };

    let createView3 = (arr) => {
      arr.forEach((element, index) => {
        let idElement = `span#${index + 1}`;
        $(idElement).text(element.apparentTemperatureMax);
      });
    };

    let showWeather = (data) => {
      console.log(data);

      let currently = data.currently;
      let daily = data.daily;
      weather.text(currently.apparentTemperature);
      icons.text(currently.icon);
      wind.text(currently.windSpeed);
      summary.text(currently.summary);
      humidity.text(currently.humidity);
      pressure.text(currently.pressure);
      icons.attr('src', 'assets/images/' + currently.icon + '.png');
      // icons.text(currently.icon);

      let arrDaily = daily.data;
      showViewWeather();
      createView3(arrDaily);
    };

    let handleError = () => {
      console.log('Se ha presentado un error al obtener el clima');
    };

    let getWeather = (event) => {
      event.preventDefault();
      let proxy = 'https://cors-anywhere.herokuapp.com/';
      let apiLink = `https://api.darksky.net/forecast/0262438812257f35f3a075cf970b60da/${latitude},${longitude}?lang=es&units=si`;
      $.ajax({
        url: proxy + apiLink,
      })
        .done(showWeather)
        .fail(handleError);
    };

    // Funcionalidad para regresar a la vista anterior

    let backPage = () => {
      view1.addClass('d-none');
      view2.addClass('d-block');
      view2.removeClass('d-none');
      view3.addClass('d-none');
      view3.removeClass('d-block');
    };

    btnGetWeather.on('click', getWeather);
    btnGetWeatherWeek.on('click', showViewWeatherWeek);
    btnBack.on('click', backPage);
  } else {
    alert('We have a problem finding your location');
  }
};