import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/services/paciente/paciente.service';
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
  
  pacientes:any;
  menuItems: any[];
  constructor(
    
    public pacienteService: PacienteService,
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   
    this.pacienteService.listarTodos().subscribe(resp => {
      this.pacientes = resp;

    },
      error => { console.error(error) }

    );
  }

}
