
// import DOM Elements
let sideBar = document.getElementById('side-bar')
let widthBox = document.getElementById('fWidth')
let heightBox = document.getElementById('fHeight')
widthBox.textContent = window.screen.width;
heightBox.textContent = window.screen.height;

//create map
let myMap = L.map('map-box').setView([44.385, -73.22755], 13.1)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(myMap)

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
                    let nameTag = document.createElement('p')
                    // create entry for sidebar
                    anchor.appendChild(nameTag)
                    anchor.href = `/oneRestPage/${id}` // href redirect to single restaurant page via server
                    nameTag.textContent = dispName
                    sideBar.appendChild(anchor)
                })
        });
    })
