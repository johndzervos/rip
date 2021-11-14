const copy = '© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const osm = L.tileLayer(url, { attribution: copy })
const map = L.map('map', { layers: [osm], minZoom: 3 })
map.setView([38, 23], 6)
render_markers();

async function load_markers() {
  const markers_url = `/api/markers/?in_bbox=${map.getBounds().toBBoxString()}`
  const response = await fetch(markers_url)
  const geojson = await response.json()
  return geojson
}
async function render_markers() {
  const markers = await load_markers()
  L.geoJson(markers, {
    onEachFeature: function onEachFeature(feature, layer) {
      let props = feature.properties;
      let name = props.name;
      let content = `
        <img width="300" src="${props.picture_url}"/>
        <h3>${name}</h3>
        <p>${props.description}</p>
        <button type="button" onclick="markerOnClick('${name}')">Click</button>
      `;
      layer.bindPopup(content);
  }}).addTo(map);
}
map.on('moveend', render_markers)

function markerOnClick(name) {
  alert(`hi. you clicked the ${name} marker`);
}
