var location_info = document.getElementById("location");

// if(!navigator.geolocation) {
//   console.log('Geolocation is not supported by your browser...');
// } else {
//   navigator.geolocation.getCurrentPosition(success, decline);
// }

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(position) {
	const latitude  = position.coords.latitude;
	const longitude = position.coords.longitude;
	location_info.innerHTML = latitude + ", " + longitude;
}

function decline() {
  location_info.innerHTML = 'declined';
  axios.get('https://api.ipify.org')
  	.then(function (response) {
//  		console.log(response.data);
  		axios.get('https://geolocation-db.com/json/' + response.data)
  			.then(function (res){
  				// console.log(res.data.latitude + ", " + res.data.longitude);
  				// console.log(res.data.city + ", " + res.data.country_name);
  				location_info.innerHTML =  res.data.latitude +", " +res.data.longitude +
															"<br />" + res.data.city + ", " + res.data.country_name;
  			}); 
  	});
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, decline, options);



//location_info.innerHTML = latitude + ",  " + longitude;