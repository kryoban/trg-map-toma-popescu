import {
  Icon,
  icon,
  IconOptions,
  latLng,
  LatLngBounds,
  latLngBounds,
  LatLngExpression,
  PointExpression,
} from 'leaflet';

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

export const mapCenter: LatLngExpression = [44.43333333333333, 26.1];

export const maxBounds: LatLngBounds = latLngBounds(
  latLng(-90, -180),
  latLng(90, 180)
);

export const iconDefault: Icon<IconOptions> = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  ...iconOptions,
});

export const iconRed: Icon<IconOptions> = icon({
  iconRetinaUrl: redIconRetinaUrl,
  iconUrl: redIconUrl,
  shadowUrl,
  ...iconOptions,
});
