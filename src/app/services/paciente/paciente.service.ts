import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private API_SERVER = "http://localhost:8090/api/paciente/";

  constructor(private httpClient: HttpClient) { }

  /**
   * name
   */
  public listarTodos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }  
  public crearPaciente(paciente:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,paciente);
  }
}
