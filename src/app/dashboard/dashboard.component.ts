import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Usuario } from '../models/usuario.models';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
userSubs!: Subscription;
ingresosSubs!: Subscription;
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
   this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user!== null )
    ).pipe(
      filter(auth => auth.user.uid!== "" )
    )
    .subscribe(({user})=>{
      console.log(user.uid)
     this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener( user!.uid)
      .subscribe(ingresosEgresosFB=>{
        this.store.dispatch(setItems({items: ingresosEgresosFB}))
      });
      console.log(user)
    });
  }

  ngOnDestroy(){
    this.userSubs?.unsubscribe();
    this.ingresosSubs?.unsubscribe();
  }

}
