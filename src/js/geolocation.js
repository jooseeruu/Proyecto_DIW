
document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([39.568415, 2.667446], 13);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    function onMapClick(e) {
        var popup = L.popup()
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);

    var db;
    var request = window.indexedDB.open("locationsDB", 1);

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
    };

    request.onsuccess = function (event) {
        db = event.target.result;

        getAllLocations(function (locations) {
            locations.forEach(function (location) {
                L.marker([location.lat, location.lng])
                    .addTo(map)
                    .bindPopup(location.description);
            });
        });
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        var objectStore = db.createObjectStore("locations", { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("description", "description", { unique: false });
    };

    function addLocation(locationData) {
        var transaction = db.transaction(["locations"], "readwrite");
        var locationStore = transaction.objectStore("locations");

        var request = locationStore.add(locationData);

        request.onsuccess = function (event) {
            console.log("Location added to database");
        };

        request.onerror = function (event) {
            console.error("Error adding location:", event.target.error);
        };
    }

    function getAllLocations(callback) {
        var transaction = db.transaction(["locations"], "readonly");
        var locationStore = transaction.objectStore("locations");
        var request = locationStore.getAll();

        request.onsuccess = function (event) {
            var locations = event.target.result;
            callback(locations);
        };

        request.onerror = function (event) {
            console.error("Error retrieving locations:", event.target.error);
        };
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
                    map.setView(userLatLng, 13);

                    var marker = L.marker(userLatLng).addTo(map);
                    marker.bindPopup("Actualmente estás aquí").openPopup();


                    addLocation({
                        lat: userLatLng.lat,
                        lng: userLatLng.lng,
                        description: "Ubicación actual del usuario"
                    });
                },
                function (error) {
                    console.error('Error getting user location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }


    getUserLocation();
});
