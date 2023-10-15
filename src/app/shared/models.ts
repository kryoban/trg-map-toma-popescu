export interface Location {
  id: string;
  name: string;
  address: string;
  lat: string;
  lng: string;
  createdDate: string;
}

export enum Languages {
  EN = 'en',
  ES = 'es',
  RO = 'ro',
}

export interface NestedDictionary<T> {
  [key: string]: T | NestedDictionary<T>;
}

export interface LanguageListItem {
  code: string;
  label: string;
}
