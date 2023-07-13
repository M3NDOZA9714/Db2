import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterTable',
  pure: false
})
export class FilterTablePipe implements PipeTransform {

  transform(arr: any[], filters: any): any[] {
    if (!arr) {
      return [];
    }
    
    if (!Object.values(filters).some((val: any) => { return val.length })) {
      return arr;
    }

    return arr.filter(item => {
      return Object.keys(filters).every(key => {
        return item[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });
  }


}
