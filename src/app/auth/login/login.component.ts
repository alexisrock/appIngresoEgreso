import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder, private authservices: AuthService, private router: Router){

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }
    );
  }


  loginUsuario(){
    if (this.loginForm.valid) {
      swal.fire({
        title: "Espere por favor"
      })
      swal.showLoading()


      const { email, password} = this.loginForm.value;
      this.authservices.loginUsuario( email, password)
      .then(credenciales=>{
        console.log(credenciales)
        this.router.navigate(['/']);
        swal.close();
      }).catch(error=>{
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
