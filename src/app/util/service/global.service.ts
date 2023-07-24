import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  filterTable = (arr: any[], filters: any): any => {
    if (!arr) {
      return [];
    }
    const newArr = arr.filter(item => {
      return Object.keys(filters).every(key => {
        return item[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase());
      });
    });

    const lengthArr = newArr.length;

    return { newArr, lengthArr };
  }

  addLine = (set: Set<any>, row: any) => {
    if (set.has(row)) {
      set.delete(row);
    } else {
      set.add(row);
    }
  }

  valLine = (set: Set<any>, row: any) => {
    return set.has(row);
  }

  selectAll = (arr: any, set: Set<any>) => {
    if (set.size == arr.length) {
      set.clear();
    } else {
      set.clear();
      arr.forEach((element: any) => {
        set.add(element);
      });
    }
  }
}
