
// const bodyScrollLock = require('body-scroll-lock')
// const disableBodyScroll = bodyScrollLock.disableBodyScroll;
// const enableBodyScroll = bodyScrollLock.enableBodyScroll;

// const mapBox = document.getElementById('map-box')
// disableBodyScroll(myMap)

let myMap = L.map('map-box').setView([44.3807, -73.22755], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

let markerOne = L.marker([44.3807, -73.22755]).addTo(myMap)
markerOne.bindPopup('Right Here!')



fetch('restaurants')
    .then(res => res.json())
    .then(restListArray => {
        restListArray.forEach(restaurant => {
            let id = restaurant
           
            fetch("restaurants/" + id)
                .then(res => res.json())
                .then(restData => {
                console.log(restData.displayName)
            })
            

        });
    })
