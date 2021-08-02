import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private API_SERVER = "http://localhost:8090/api/historiaClinica/";

  constructor(private httpClient: HttpClient) { }
  
public obtenerHistoriaPorCodPaciente(codigo:any):Observable<any>{
  return this.httpClient.get(this.API_SERVER + 'paciente/'+codigo);
}
public modificarHistoria(historia:any):Observable<any>{
  return this.httpClient.put(this.API_SERVER+ historia.codigo, historia);
}
public crearHistoria(historia:any):Observable<any>{
return this.httpClient.post(this.API_SERVER, historia);
}
public listarTodos(): Observable<any>{
  return this.httpClient.get(this.API_SERVER);
} 
}
