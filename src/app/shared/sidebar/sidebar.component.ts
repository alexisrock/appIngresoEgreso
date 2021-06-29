import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authservice: AuthService,private rouer: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logout().then(
      ()=>{
        this.rouer.navigate(['/login'])
      });


  }
}
