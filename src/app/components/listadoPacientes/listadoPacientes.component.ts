import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/services/paciente/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Paciente } from 'app/modelo/Paciente';
import { Router } from '@angular/router';
import { PacienteComponent } from '../paciente/paciente.component';
import { EditarPacienteComponent } from '../editar-paciente/editar-paciente.component';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/paciente', title: 'Agregar Paciente',  icon:'person', class: '' },
];
@Component({
  selector: 'listadoPacientes',
  templateUrl: './listadoPacientes.component.html',
  styleUrls: ['./listadoPacientes.component.css']
})
export class TableListComponent implements OnInit {
  
  paciente:any;
  pacientes:any;
  menuItems: any[];
  constructor(
    
    public pacienteService: PacienteService,
    private dialog: MatDialog,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   
    this.pacienteService.listarTodos().subscribe(resp => {
      this.pacientes = resp;

    },
      error => { console.error(error) }

    );
  }
  
  editar(item){
    localStorage.setItem("codigo", item.codigo.toString());
    
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "50%";
  this.dialog.open(EditarPacienteComponent, dialogConfig);  

  }
  eliminar(pacientes){
    this.pacienteService.eliminarPaciente(pacientes.codigo).subscribe(resp=>{
      console.log(resp)
      if(resp){
        this.pacientes.pop(pacientes);
        
      }
    })
  }

}
