import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs!: Subscription;
  constructor(private fb: FormBuilder, private ingresoEgresoServices: IngresoEgresoService, private store: Store<AppState>) {



  }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui')
    .subscribe(ui=>{
      this.cargando = ui.isLoading;
    })
    this.ingresoForm = this.fb.group({
        descripcion: ['', Validators.required],
        monto: ['', Validators.required]
    })
  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
  guardar(){

    if (this.ingresoForm.valid) {
      this.store.dispatch(isLoading())
      const {descripcion,monto } =  this.ingresoForm.value;
      const ingrespEgreso =  new IngresoEgreso(descripcion, monto, this.tipo)
      this.ingresoEgresoServices.crearIngresoEgreso(ingrespEgreso)
      .then(()=>{
        this.store.dispatch(stopLoading());
        swal.fire('Registro creado',descripcion,'success' );
      this.ingresoForm.reset()
    })
      .catch(err=> {
        this.store.dispatch(stopLoading());
        swal.fire('Error',err.message,'error' )});

    } else {

    }

  }

}
