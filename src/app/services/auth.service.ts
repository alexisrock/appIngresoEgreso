import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      console.log(fuser);
    })
  }
  crearUsuario(nombre: string, correo: string, password: string){
    return this.auth.createUserWithEmailAndPassword(correo, password)
    .then(({user})=>{
      const newUser = new Usuario(user!.uid, nombre, correo);
     return  this.firestore.doc(`${user!.uid}/usuario`).set({...newUser })

    });
  }


  loginUsuario(email: string, password: string){
   return  this.auth.signInWithEmailAndPassword(email, password);

  }


  logout(){
   return this.auth.signOut();
  }


  isAuth(){
    return this.auth.authState.pipe(
      map(fbuswer=> fbuswer!= null)
    )
  }
}