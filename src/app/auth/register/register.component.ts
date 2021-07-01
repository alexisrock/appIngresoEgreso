import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  myform: FormGroup = new  FormGroup({});
  cargando: boolean = false;
  unSubscription!: Subscription;
  constructor(private fb: FormBuilder, private authservices: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.myform  = this.fb.group({
      nombre: ['',  Validators.required],
      correo:  ['',   [Validators.required, Validators.email]],
      password: ['',  Validators.required]
    });
    this.unSubscription = this.store.select('ui')
    .subscribe(ui=>{
      this.cargando = ui.isLoading;
    });

  }

  ngOnDestroy(){
this.unSubscription.unsubscribe();

  }

  crearusuario(){

    if (this.myform.valid) {
      this.store.dispatch(isLoading())
      const { nombre, correo, password} = this.myform.value;
      this.authservices.crearUsuario(nombre, correo, password)
      .then(credenciales=>{
        console.log(credenciales)

        this.store.dispatch(stopLoading())
        this.router.navigate(['/']);
      }).catch(error=>{
        this.store.dispatch(stopLoading())
        swal.fire({
          title: "ooppps...",
          text: error.message,
          icon: "error"
        });
      });



    } else {
      return;
    }

  }

}
