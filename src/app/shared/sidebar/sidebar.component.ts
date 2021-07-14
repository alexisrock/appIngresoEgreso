import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  public nombre: string = "";
  userSubs!: Subscription;
  constructor(private authservice: AuthService,private rouer: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe( filter(({user})=> user != null))
    .subscribe(({user})=> this.nombre = user.nombre)

  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

  logout(){
    this.authservice.logout().then(
      ()=>{
        this.rouer.navigate(['/login'])
      });


  }
}
