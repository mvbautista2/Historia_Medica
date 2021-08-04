import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConsultaService } from 'app/services/consulta/consulta.service';
import { TratamientoComponent } from '../tratamiento/tratamiento.component';
declare interface RouteInfo {
  path: string;
  title: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/consulta-enfermedad', title: 'Agregar Enfermedad' },
  { path: '/consulta-examen', title: 'Agregar Examen'},
];
@Component({
  selector: 'consulta-completa',
  templateUrl: './consulta-completa.component.html',
  styleUrls: ['./consulta-completa.component.css']
})
export class ConsultaCompletaComponent implements OnInit {
  examenes:any;
  enfermedades:any;
  consultas:any;
  consultaForm: FormGroup;
  menuItems: any[];

  constructor(
    public fb: FormBuilder,
    public consultaService: ConsultaService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.consultaForm = this.fb.group({
      codigo:[''],
      codigoMedico:[''],
      altura:[''],
      peso:[''],
      imc:[''],
      temperatura:[''],
      presionSistolica:[''],
      presionDiastolica:[''],

    });;
    this.mostrar();

  }
  mostrar(){
    let item = localStorage.getItem("codConsulta");
    this.consultaService.obtenerPorCodigo(+item).subscribe(resp=>{
      this.consultas = resp;
      this.enfermedades = this.consultas.consultaEnfermedad;
      this.examenes=this.consultas.consultaExamen;
      this.consultaForm.setValue({
        codigo:this.consultas.codigo,
        codigoMedico:this.consultas.medico.apellidos,
        altura:this.consultas.altura,
        peso:this.consultas.peso,
        imc:this.consultas.imc,
        temperatura:this.consultas.temperatura,
        presionSistolica: this.consultas.presionSistolica,
        presionDiastolica:this.consultas.presionDiastolica,
      })     
  
      });
  }
  agregarTratamientos(item){
    localStorage.setItem("item", item.codigo.toString());
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(TratamientoComponent, dialogConfig);
  }
  verTratamientos(item){
    localStorage.setItem("codConsultaEnfermedad", item.codigo.toString());
    this.router.navigate(['listado-tratamientos']);
  }
  
  
  

}
