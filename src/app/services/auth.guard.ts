import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private AuthService: AuthService, private Router: Router){}
  canActivate( ):Observable<boolean>  {
      return this.AuthService.isAuth().pipe(
        tap(estado =>{
          if(!estado){
            this.Router.navigate(['/login'])
          }
        }), take(1)
      );
  }

  canLoad():Observable<boolean> {
    return this.AuthService.isAuth().pipe(
      tap(estado =>{
        if(!estado){
          this.Router.navigate(['/login'])
        }
      })
    );
  }



}
