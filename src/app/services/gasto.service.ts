import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class GastoService {
  private URL = environment.ruta;
  decodedToken:any;
  token:any;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  guardarGasto(gasto: any){
    this.token = localStorage.getItem('token');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.token);
    return this.http.post(`${this.URL}/gasto/create`,gasto, { headers });
  }

  obtenerGastoUsuario(){
    this.token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(this.token);
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.token);
    return this.http.get(`${this.URL}/gasto/usuario/${this.decodedToken.id}`, { headers });
  }

  eliminarGasto(id:any){
    this.token = localStorage.getItem('token');
    const params = new HttpParams()
    .set('gastoID', id);
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+this.token);
    return this.http.delete(`${this.URL}/gasto/delete`, { params,headers });
  }

 
}
