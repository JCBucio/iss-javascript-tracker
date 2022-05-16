// Making a map and tiles
const mymap = L.map('issMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

// Custom iss icon
const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

const iss_url = 'https://iss-api.herokuapp.com/iss-location';

let firstTime = true;

async function getISS() {
    const response = await fetch(iss_url);
    const data = await response.json();
    const latitude = data['iss_position']['latitude'];
    const longitude = data['iss_position']['longitude'];

    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
        mymap.setView([latitude, longitude], 3);
        firstTime = false;
    };
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;            
};

const astros_url = 'https://iss-api.herokuapp.com/astronauts';
async function getAstros() {
    const response = await fetch(astros_url);
    const astros = await response.json();
    const number = astros['number'];
    const astronauts = [];
    const crafts = [];
    const astropluscraft = [];

    astros['people'].forEach(val => {
        astronauts.push(val['name']);
        crafts.push(val['craft']);
        astropluscraft.push(val['name'] + ' in ' + val['craft']);
    });

    // console.log(astronauts);
    // console.log(crafts);
    document.getElementById('num').textContent = number;

    // for (let i=0; i < astronauts.length; i++) {
    //     console.log(astronauts[i]);
    // };

    let list = document.getElementById("astroList");
    
    astropluscraft.forEach(astro => {
        let li = document.createElement("li");
        li.innerText = astro;
        list.appendChild(li);
    });
    // document.getElementById('astro').textContent = astronauts;
    // document.getElementById('craft').textContent = crafts; 

};

getISS();
getAstros();
setInterval(getISS, 3000);
