// DOM Elements
let sideBar = document.getElementById('side-bar')
let widthBox = document.getElementById('fWidth')
let heightBox = document.getElementById('fHeight')
widthBox.textContent = window.screen.width;
heightBox.textContent = window.screen.height;

//create map
let myMap = L.map('map-box').setView([44.385, -73.22755], 13.1)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)


fetch



