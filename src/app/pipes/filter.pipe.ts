import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(alltransaction:[],searchKey:string,propName:string): any [] {
    const result:any=[]
    if(!alltransaction || searchKey=='' || propName==''){
      return alltransaction
    }
    alltransaction.forEach((item:any)=>{
      if(item[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
