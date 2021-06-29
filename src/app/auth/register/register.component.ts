import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myform: FormGroup = new  FormGroup({});
  constructor(private fb: FormBuilder, private authservices: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.myform  = this.fb.group({
      nombre: ['',  Validators.required],
      correo:  ['',   [Validators.required, Validators.email]],
      password: ['',  Validators.required]


    })
  }

  crearusuario(){

    if (this.myform.valid) {
      const { nombre, correo, password} = this.myform.value;
      this.authservices.crearUsuario(nombre, correo, password)
      .then(credenciales=>{
        console.log(credenciales)
        this.router.navigate(['/']);
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
