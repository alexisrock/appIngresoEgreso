import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;
  estadisticaSubs!: Subscription;
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[ ]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.estadisticaSubs = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(){
    this.estadisticaSubs.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    for (const item of items) {
      if(item.tipo=='ingreso'){
      this.totalIngresos += item.monto;
      this.ingresos++;
      }else{
        this.totalEgresos +=  item.monto;
        this.egresos++;
      }
    }


    this.doughnutChartData = [  [this.totalIngresos,this.totalEgresos]  ]
  }
}
