import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import {map} from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { AppState } from 'src/app/app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription
  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore, private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{

      if (fuser) {
       this.userSubscription =  this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe(firestoreUser=>{
          const user = Usuario.fromFirebase(firestoreUser)
         this.store.dispatch(setUser({ user}));
        })

      } else {
        this.store.dispatch(unSetUser());
        this.userSubscription.unsubscribe();
      }

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
