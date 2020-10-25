// get DOM Elements
let sideBar = document.getElementById('side-bar')
let widthBox = document.getElementById('fWidth')
let heightBox = document.getElementById('fHeight')
let displayName = document.getElementById('displayName')
let tagLine = document.getElementById('tagLine')
let address = document.getElementById('address')
let phone = document.getElementById('phone')
let hours = document.getElementById('hours')
let notes = document.getElementById('notes')
let footer = document.getElementById('footer-box')

widthBox.textContent = window.screen.width;
heightBox.textContent = window.screen.height;

//create map
let myMap = L.map('map-box').setView([44.385, -73.22755], 13.1)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(myMap)

// extract single restaurant from url
let thisRestaurant = document.location.pathname.split('/').splice(-1)

// fetch single resaurant data file
fetch('/restaurants/' + thisRestaurant)
    .then((res) => res.json())
    .then(restData)

  

function restData(data) {
    console.log('data = ', data)
    // reset map center and zoom to single restaurant location
    myMap.setView([data.lat, data.lng], 17)
    markName = L.marker([data.lat, data.lng])
        .addTo(myMap)
        .bindTooltip(displayName)

    // assign values from data file to DOM elements
    displayName.textContent = data.displayName
    tagLine.textContent = data.tagLine
    address.textContent = data.address
    phone.textContent = data.phoneNumber
    // display hours from array of hours
    let hoursOpen = data.hours
    hoursOpen.forEach(entry => {
        let detail = entry
        let hoursDetail = document.createElement('p')
        hoursDetail.textContent = detail
        sideBar.appendChild(hoursDetail)
    });
    // display comments in footer from array of comments
    let comments = data.notes
    comments.forEach(comment => {
        let eachComment = comment
        let commentDetail = document.createElement('p')
        commentDetail.textContent = eachComment
        footer.appendChild(commentDetail)
    });
  

}

