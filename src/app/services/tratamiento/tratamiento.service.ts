import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private API_SERVER = "http://35.199.125.143:8090/api/tratamiento/";

  constructor(private httpClient: HttpClient) { 
    
  }
  public crearTratamiento(tratamiento:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER, tratamiento);
  }
  public obtenerPorConsultaEnfermedad(consultaenfermedad:any):Observable<any>{
    return this.httpClient.get(this.API_SERVER+"codigoConsultaEnfermedad/"+consultaenfermedad)
  }
}
