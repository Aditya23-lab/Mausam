const getWeather = (q) => {
  cityname.innerHTML = q;

  const apiKey = window.API_KEY;

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}`)
    .then(response => response.json())
    .then((data) => {
      temp_c.innerHTML = data.current.temp_c + "°C";
      temp_c2.innerHTML = data.current.temp_c + "°C";
      feelslike_c.innerHTML = data.current.feelslike_c + "°C";
      humidity.innerHTML = data.current.humidity + " %";
      wind_mph.innerHTML = data.current.wind_mph + " mph";
      wind_dir.innerHTML = data.current.wind_dir;
      cloud.innerHTML = data.current.cloud + " %";
      cloud2.innerHTML = data.current.cloud + " %";
      region.innerHTML = data.location.region;
      region2.innerHTML = data.location.region;
      country.innerHTML = data.location.country;
      localtime.innerHTML = data.location.localtime;

      const googleQuery = encodeURIComponent(`${q} weather details`);
      const googleUrl = `https://www.google.com/search?q=${googleQuery}`;
      document.querySelectorAll(".more-btn").forEach(btn => {
        btn.onclick = () => window.open(googleUrl, "_blank");
      });
    })
    .catch(err => console.error("Error fetching weather:", err));
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(q.value);
});

// Other Cities Section
const updateOtherCities = () => {
  const apiKey = window.API_KEY;

  const cities = [
    { name: "Patna", id: "patna" },
    { name: "Goa", id: "goa" },
    { name: "Japan", id: "japan" },
    { name: "Australia", id: "australia" }
  ];

  cities.forEach(city => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.name}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById(`${city.id}-country`).innerText = data.location.country;
        document.getElementById(`${city.id}-temp`).innerText = data.current.temp_c + "°C";
        document.getElementById(`${city.id}-humidity`).innerText = data.current.humidity + " %";
        document.getElementById(`${city.id}-cloud`).innerText = data.current.cloud + " %";
      })
      .catch(err => console.error(`Error loading weather for ${city.name}:`, err));
  });
};

getWeather("New York");
updateOtherCities();
setInterval(updateOtherCities, 30000); // Update every 30 seconds instead of 3s
