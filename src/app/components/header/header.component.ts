import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name:any;

  constructor(public authService: AuthService, private router: Router,private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.obtenerNombre();
  }

  obtenerNombre(){
    const token:any = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.name=decodedToken.name;
  }
  cerrarsesion(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
