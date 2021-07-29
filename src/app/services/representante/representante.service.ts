import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  private API_SERVER = "http://localhost:8090/api/representante/";

  constructor(private httpClient: HttpClient) { }

  /**
   * name
   */
   
  public crearRepresentante(paciente:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,paciente);
  }
}
