import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenMedicoService {
  private API_SERVER = "http://35.199.125.143:8090/api/examen/";

  constructor(private httpClient: HttpClient) { }
  
  public listarTodos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }  
}
