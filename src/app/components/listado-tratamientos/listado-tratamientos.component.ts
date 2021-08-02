import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TratamientoService } from 'app/services/tratamiento/tratamiento.service';

@Component({
  selector: 'listado-tratamientos',
  templateUrl: './listado-tratamientos.component.html',
  styleUrls: ['./listado-tratamientos.component.css']
})
export class ListadoTratamientosComponent implements OnInit {
  tratamientos:any;

  constructor(
   
    public tratamientoService: TratamientoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let item = localStorage.getItem("codConsultaEnfermedad");
    this.tratamientoService.obtenerPorConsultaEnfermedad (+item).subscribe(resp=>{
      this.tratamientos = resp; 
  
      });
  }

}
