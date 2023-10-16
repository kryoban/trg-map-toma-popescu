import { Location } from '../models';
import { MatSort } from '@angular/material/sort';

export const tableColumns: string[] = [
  'name',
  'address',
  'lat',
  'lng',
  'createdDate',
  'edit',
];

export const customGetRangeLabel = (
  page: number,
  pageSize: number,
  length: number
): string => {
  if (length == 0 || pageSize == 0) {
    return `0 / ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
  return `${startIndex + 1} – ${endIndex} / ${length}`;
};

export const sortData = (): ((
  items: Location[],
  sort: MatSort
) => Location[]) => {
  const sortFunction = (items: Location[], sort: MatSort): Location[] => {
    if (!sort.active || sort.direction === '') {
      return items;
    }
    return items.sort((a: Location, b: Location) => {
      let comparatorResult = 0;
      switch (sort.active) {
        case 'name':
          comparatorResult = a.name
            .toLowerCase()
            .localeCompare(b.name.toLowerCase());
          break;
        case 'address':
          comparatorResult = a.address
            .toLowerCase()
            .localeCompare(b.address.toLowerCase());
          break;
        case 'lat':
          comparatorResult = parseFloat(a.lat) > parseFloat(b.lat) ? 1 : -1;
          break;
        case 'lng':
          comparatorResult = parseFloat(a.lng) > parseFloat(b.lng) ? 1 : -1;
          break;
        case 'createdDate':
          comparatorResult = a.createdDate.localeCompare(b.createdDate);
          break;
      }
      return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
    });
  };
  return sortFunction;
};

export const filterByNameOrAddress: () => (
  data: Location,
  filter: string
) => boolean = () => {
  const filterFunction = (data: Location, filter: string): boolean => {
    if (filter) {
      const { name, address } = data;
      return (
        name.toLowerCase().indexOf(filter) != -1 ||
        address.toLowerCase().indexOf(filter) != -1
      );
    }
    return true;
  };
  return filterFunction;
};
