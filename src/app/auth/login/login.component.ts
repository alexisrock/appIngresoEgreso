import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
import { isLoading, stopLoading } from '../../shared/ui.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({});
  cargando: boolean = false;
  uiSubscriptio!: Subscription


  constructor(private fb: FormBuilder, private authservices: AuthService, private router: Router, private store: Store<AppState>){

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }
    );

    this.uiSubscriptio = this.store.select('ui').subscribe(ui=>{
                        this.cargando = ui.isLoading;

                      })

  }

  ngOnDestroy(){
    this.uiSubscriptio.unsubscribe();

  }


  loginUsuario(){
    if (this.loginForm.valid) {
      this.store.dispatch(isLoading())
      // swal.fire({
      //   title: "Espere por favor"
      // })
      // swal.showLoading()


      const { email, password} = this.loginForm.value;
      this.authservices.loginUsuario( email, password)
      .then(credenciales=>{
        console.log(credenciales)
        this.router.navigate(['/']);
        this.store.dispatch(stopLoading())
       // swal.close();
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
