import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { HistoriaClinicaService } from 'app/services/historiaClinica/historia-clinica.service';
import { RepresentanteComponent } from '../representante/representante.component';
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
  historiaForm: FormGroup;
  historia:any;
  menuItems: any[];
  constructor(
    private dialog: MatDialog,
    public fb: FormBuilder,
    public historiaClinicaService: HistoriaClinicaService,
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.historiaForm = this.fb.group({
      //codigoPaciente: ['',Validators.required],
      alturaNacimiento: ['',],
      pesoNacimiento: ['', ],
      Antecedentes: ['', ],
      Observaciones: ['', ],
      
    });;
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

