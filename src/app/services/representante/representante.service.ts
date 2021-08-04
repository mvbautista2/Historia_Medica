import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  private API_SERVER = "http://35.199.125.143:8090/api/representante/";

  constructor(private httpClient: HttpClient) { }

  /**
   * name
   */
   
  public crearRepresentante(representante:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,representante);
  }
  public modificarRepresentante(representante:any):Observable<any>{
    return this.httpClient.put(this.API_SERVER, representante)
  }
  public obtenerRepresentantePorCodPaciente(codigo:any):Observable<any>{
    return this.httpClient.get(this.API_SERVER + 'paciente/'+codigo);
  }
}
