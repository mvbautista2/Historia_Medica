import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaExamenService {
  private API_SERVER = "http://localhost:8090/api/consultaExamen/";

  constructor(private httpClient: HttpClient) {}
  public crearConsultaExamen(consultaExamen:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,consultaExamen);
  }
}
