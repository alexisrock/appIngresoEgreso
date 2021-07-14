import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.models';

@Pipe({
  name: 'ordeningreso'
})
export class OrdeningresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]  ): IngresoEgreso[] {
    console.log(items)
    return items.sort((a, b) =>{
      if(a.tipo=='ingreso'){
        return -1
      }else{
          return  1
        }

    });
  }

}
