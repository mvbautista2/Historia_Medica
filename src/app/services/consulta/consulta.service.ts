import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private API_SERVER = "http://localhost:8090/api/consulta/";

  constructor(private httpClient: HttpClient) { }

   
  public crearConsulta(consulta:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,consulta);
  }
  public modificarConsulta(consulta:any):Observable<any>{
    return this.httpClient.put(this.API_SERVER + consulta.codigo, consulta)
  }
}
