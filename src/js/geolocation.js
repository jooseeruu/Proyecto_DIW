var map = L.map("map").setView([39.568415, 2.667446], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 15,
  attribution:
    '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var db;
var request = window.indexedDB.open("locationsDB", 1);

request.onerror = function (event) {
  console.error("Error opening database:", event.target.error);
};

request.onsuccess = function (event) {
  db = event.target.result;
  getAllLocationsAndAddOffices();
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("locations", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("description", "description", {
    unique: false,
  });
};

function addLocationToIndexedDB(locationData) {
  var transaction = db.transaction(["locations"], "readwrite");
  var locationStore = transaction.objectStore("locations");

  var request = locationStore.add(locationData);

  request.onsuccess = function (event) {
    console.log("Location added to IndexedDB");
  };

  request.onerror = function (event) {
    console.error("Error adding location to IndexedDB:", event.target.error);
  };
}

function getAllLocationsAndAddOffices() {
  var transaction = db.transaction(["locations"], "readonly");
  var locationStore = transaction.objectStore("locations");
  var request = locationStore.getAll();

  request.onsuccess = function (event) {
    var locations = event.target.result;

    locations.forEach(function (location) {
      L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(location.description);
    });

    getUserLocation();

    var officeLocations = [
      { lat: 39.57119, lng: 2.646634, description: "Oficina 1" },
      { lat: 39.569668, lng: 2.650267, description: "Oficina 2" },
      { lat: 39.574984, lng: 2.654316, description: "Oficina 3" },
    ];

    officeLocations.forEach(function (officeLocation) {
      var exists = locations.some(function (location) {
        return location.description === officeLocation.description;
      });

      if (!exists) {
        addLocationToIndexedDB(officeLocation);
      }
    });
  };

  request.onerror = function (event) {
    console.error(
      "Error retrieving locations from IndexedDB:",
      event.target.error
    );
  };
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setView(userLatLng, 13);

        var userMarker = L.marker(userLatLng, {
          icon: L.divIcon({
            className: "bi bi-person-fill text-primary display-6", // Agregar clase display-4 para hacer el ícono más grande
            iconSize: [24, 24],
            iconAnchor: [12, 24],
          }),
        }).addTo(map);
        userMarker.bindPopup("Actualmente estás aquí").openPopup();

        // Guardar la ubicación del usuario en Local Storage
        localStorage.setItem("userLocation", JSON.stringify(userLatLng));
      },
      function (error) {
        console.error("Error getting user location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
