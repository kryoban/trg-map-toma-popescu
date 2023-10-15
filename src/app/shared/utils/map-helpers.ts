import { icon, PointExpression } from 'leaflet';

const iconRetinaUrl = 'assets/images/blue-marker-32.png';
const iconUrl = 'assets/images/blue-marker-32.png';
const shadowUrl = 'assets/marker-shadow.png';

const redIconRetinaUrl = 'assets/images/red-marker-32.png';
const redIconUrl = 'assets/images/red-marker-32.png';

const iconOptions: { [key: string]: PointExpression } = {
  iconSize: [32, 32],
  iconAnchor: [16, 34],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
};

export const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  ...iconOptions,
});

export const iconRed = icon({
  iconRetinaUrl: redIconRetinaUrl,
  iconUrl: redIconUrl,
  shadowUrl,
  ...iconOptions,
  // iconSize: [41, 41],
});
