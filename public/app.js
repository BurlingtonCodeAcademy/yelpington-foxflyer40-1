
// DOM Elements
let sideBar = document.getElementById('side-bar')
let widthBox = document.getElementById('fWidth')
let heightBox = document.getElementById('fHeight')
widthBox.textContent = window.screen.width;
heightBox.textContent = window.screen.height;


//create map
let myMap = L.map('map-box').setView([44.385, -73.22755], 13.1)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(myMap)



// let markerOne = L.marker([44.383, -73.22755]).addTo(myMap)
// markerOne.bindPopup('Right Here!')

// get list of restaurants index file as an array
fetch('restaurants')
    .then(res => res.json())
    .then(restListArray => {

        // iterate over restautrant array and do the following for each one
        restListArray.forEach(restaurant => {
            let id = restaurant
            // add restaurant display name to sidebar
            fetch("restaurants/" + id)  //use id to get correct restaurant data file
                .then(res => res.json())
                .then(restData => {     //extract displayname lat and long
                    let dispName = restData.displayName
                    let latLng = [restData.lat, restData.lng]
                    let markName = (id + 'mark')

                    //put marker on map for each with a toolTip (label) that says restaurant name on hover
                    markName = L.marker(latLng, { riseOnHover: true })
                        .addTo(myMap)
                        .bindTooltip(dispName)
                        .on("click", () => {
                            window.location = `/oneRestPage/${id}`
                        })


                    // add display name as a child list element in the sidebar
                    //create DOM elements needed
                    let anchor = document.createElement('a')
                    let nameTag = document.createElement('p')
                    // create entry for sidebar
                    anchor.appendChild(nameTag)
                    anchor.href = `/oneRestPage/${id}`
                    nameTag.textContent = dispName
                    sideBar.appendChild(anchor)
                })
        });
    })
