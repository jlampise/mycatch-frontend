import L from 'leaflet';


const pokeIcon = pokemon => {

  return L.icon({
    iconUrl: `https://img.pokemondb.net/sprites/x-y/normal/${pokemon}.png`,
    iconSize: [80, 80],
    iconAnchor: [40, 40]
  });
};

const locationIcon = L.icon({
  iconUrl: 'images/pokeball.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export default {
  pokeIcon,
  locationIcon
};
