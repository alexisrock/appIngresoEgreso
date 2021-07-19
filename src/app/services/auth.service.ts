import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import {map} from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { AppState } from 'src/app/app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: Usuario;
  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore, private store: Store<AppState>) { }

 get user(){
   return this._user;
 }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{

      if (fuser) {
       this.userSubscription =  this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe(firestoreUser=>{
          const user = Usuario.fromFirebase(firestoreUser);
          this._user = user;
         this.store.dispatch(setUser({ user}));

        })

      } else {
        this._user =  new Usuario('','','');
        this.store.dispatch(unSetUser());
        this.userSubscription?.unsubscribe();
        this.store.dispatch( unSetItems());
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
