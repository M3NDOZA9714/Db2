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

    if (Object.values(filters).some((val: any) => { return val.length })) {
      return arr;
    }

    console.log("hola")
    const newArr = arr.filter(item => {
      return Object.keys(filters).every(key => {
        return item[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });

    const lengthArr = newArr.length;

    return { newArr, lengthArr };
  }
}
