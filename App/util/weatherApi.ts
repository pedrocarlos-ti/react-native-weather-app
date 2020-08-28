const API_KEY = '792d0fa5a88c6ede74859bd80ff495d5';

export interface Weather {
  coords: Coords;
  zipcode: String;
}

interface Coords {
  latitude: Number;
  longitude: Number;
}

export const weatherApi = (path: String, { zipcode, coords }: Weather) => {
  let suffix = '';

  if (zipcode) {
    suffix = `zip=${zipcode}`;
  } else if (coords) {
    suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
  }

  console.log('oi');

  console.log(
    `http://api.openweathermap.org/data/2.5${path}?APPID=${API_KEY}&lang=pt_br&units=metric&${suffix}`
  );

  return fetch(
    `http://api.openweathermap.org/data/2.5${path}?APPID=${API_KEY}&lang=pt_br&units=metric&${suffix}`
  ).then((response) => response.json());
};
