
// import DOM Elements
let sideBar = document.getElementById('side-bar')

//create map
let myMap = L.map('map-box').setView([44.385, -73.22755], 13.1)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(myMap)

// reset map for mobil landscape view - zoom out and re-center
window.addEventListener('orientationchange', orientationChanged);
function orientationChanged() {
    if (window.screen.height < 420) {
        myMap.setView([44.388, -73.22755], 12)
    } else {
        myMap.setView([44.385, -73.22755], 13.1)
    }
}

// reset map for large screens
if (window.screen.width > 1000) {
    myMap.setView([44.388, -73.22755], 14)
}

// get list of restaurants index file as an array
fetch('restaurants')
    .then(res => res.json())
    .then(restListArray => {

        // iterate over restautrant array and do the following for each one
        restListArray.forEach(restaurant => {
            let id = restaurant
            // add restaurant display name to sidebar
            fetch("restaurants/" + id)  //use id to get correct single restaurant data file
                .then(res => res.json())
                .then(restData => {
                    let dispName = restData.displayName  //extract displayname 
                    let latLng = [restData.lat, restData.lng]  // extrext lat and long into latLng array
                    let markName = (id + 'mark') //  create individual marker name

                    //put marker on map for each restaurant
                    markName = L.marker(latLng, { riseOnHover: true })
                        .addTo(myMap)
                        .bindTooltip(dispName) // add popup on hover with restaurant name
                        .on("click", () => { // add click event redirect to single restaurant page via server
                            window.location = `/oneRestPage/${id}`
                        })

                    // add display name as a child list element in the sidebar
                    //create DOM elements needed
                    let anchor = document.createElement('a')
                    anchor.style.color = 'rgb(128, 37, 37)'
                    let nameTag = document.createElement('h5')
                    nameTag.className = 'smHeading'
                    // create entry for sidebar
                    anchor.appendChild(nameTag)
                    anchor.href = `/oneRestPage/${id}` // href redirect to single restaurant page via server
                    nameTag.textContent = dispName
                    sideBar.appendChild(anchor)
                })
        });
    })
