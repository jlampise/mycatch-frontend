import L from 'leaflet';


const pokeIcon = (pokemon, size = 80) => {

  return L.icon({
    iconUrl: `https://img.pokemondb.net/sprites/x-y/normal/${pokemon}.png`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
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
