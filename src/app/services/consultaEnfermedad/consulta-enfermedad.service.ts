import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaEnfermedadService {
  private API_SERVER = "http://localhost:8090/api/consultaEnfermedad/";

  constructor(private httpClient: HttpClient) {}
  public crearConsultaEnfermedad(consultaEnfermedad:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,consultaEnfermedad);
  }
}
