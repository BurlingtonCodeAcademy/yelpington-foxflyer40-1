// DOM Elements
let sideBar = document.getElementById('side-bar')
let widthBox = document.getElementById('fWidth')
let heightBox = document.getElementById('fHeight')
let displayName = document.getElementById('displayName')
let tagLine = document.getElementById('tagLine')
let address = document.getElementById('address')
let phone = document.getElementById('phone')
let hours = document.getElementById('hours')
let notes = document.getElementById('notes')

widthBox.textContent = window.screen.width;
heightBox.textContent = window.screen.height;

//create map
let myMap = L.map('map-box').setView([44.385, -73.22755], 13.1)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(myMap)

let thisRestaurant = document.location.pathname.split('/').splice(-1)

console.log(thisRestaurant)

fetch('/restaurants/' + thisRestaurant)
    .then((res) => res.json())
    .then(restData)

function restData(data) {

    displayName.textContent = data.displayName
    tagLine.textContent = data.tagLine
    address.textContent = data.address
    phone.textContent = data.phoneNumber
    hours.textContent = data.hours
    notes.textContent = data.notes

    myMap.setView([data.lat, data.lng], 17)
    markName = L.marker([data.lat, data.lng])
        .addTo(myMap)
        .bindTooltip(dispName)
}

