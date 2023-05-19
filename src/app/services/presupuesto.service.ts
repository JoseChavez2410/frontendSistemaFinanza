import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  private URL = environment.ruta;
  decodedToken:any;
  token:any;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  obtenerPresupuesto() {
    this.token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(this.token);
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.token);
    return this.http.get(`${this.URL}/presupuesto/usuario/${this.decodedToken.id}`,{ headers });
  }

  modificarPresupuesto(presupuesto: any,id:any) {
    this.token = localStorage.getItem('token');
    const params = new HttpParams()
    .set('presupuestoID', id);
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.token);
    return this.http.put(`${this.URL}/presupuesto/update`, presupuesto,{ params,headers });
  }

 
}
