import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,  private AuthService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){

    delete ingresoEgreso.uid;
    return this.firestore.doc(`${this.AuthService.user.uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso })

  }

  initIngresosEgresosListener(uid:string){
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot=>{
        return snapshot.map(doc=>{
          const data: any = doc.payload.doc.data()
          return {
            uid: doc.payload.doc.id,
            ...data


          }
        })
      })
    )

  }

  borrarIngresoEgreso( uidItem?: string){
    return this.firestore.doc(`${this.AuthService.user.uid }/ingresos-egresos/items/${uidItem}`).delete();

  }


}
