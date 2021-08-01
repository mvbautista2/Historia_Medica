import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { HistoriaClinicaService } from 'app/services/historiaClinica/historia-clinica.service';
import { RepresentanteComponent } from '../representante/representante.component';
import { PacienteService } from 'app/services/paciente/paciente.service';
import { Router } from '@angular/router';
declare interface RouteInfo {
  path: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/consulta', },
];
@Component({
  selector: 'historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  paciente:any;
  historiaForm: FormGroup;
  historia:any;
  crear:boolean=false;
  codigoPaciente: any;
  historias:any;
  menuItems: any[];
  constructor(
    private dialog: MatDialog,
    public pacienteService: PacienteService,
    public fb: FormBuilder,
    public historiaClinicaService: HistoriaClinicaService,
  ) { }

  /*ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.historiaForm = this.fb.group({
      //codigoPaciente: ['',Validators.required],
      alturaNacimiento: ['',],
      pesoNacimiento: ['', ],
      Antecedentes: ['', ],
      Observaciones: ['', ],
      
    });;
  }*/

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.historiaForm = this.fb.group({
      //codigoPaciente: ['',Validators.required],
    alturaNacimiento: ['',],
    pesoNacimiento: ['', ],
    Antecedentes: ['', ],
    Observaciones: ['', ],
    });
    this.obtenerCodigo();
    this.verHistorial();
  }
   
  obtenerCodigo(){
    let codigo =localStorage.getItem("codigo");
    this.codigoPaciente=codigo;
    this.pacienteService.obtenerPorCodigo(codigo).subscribe(resp=>{
    this.paciente = resp;     
     })
  }

  verHistorial(){
    this.historiaClinicaService.obtenerHistoriaPorCodPaciente(this.codigoPaciente).subscribe(historia=>{
      this.historia=historia;
    })
    if(this.historia != null)
    this.crear = true;
  }

  verificar(historia :any){
    this.historiaClinicaService.obtenerHistoriaPorCodPaciente(this.codigoPaciente).subscribe(historia=>{
      this.historia=historia;
    })
  }

 representante(){
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = false;
   dialogConfig.autoFocus = true;
   dialogConfig.width = "50%";
  this.dialog.open(RepresentanteComponent, dialogConfig);
 }
 guardar(): void {
  this.historiaClinicaService.crearHistoria(this.historiaForm.value).subscribe(resp=>{
        
  },
  error=>{console.error(error)}
  )
}

}

