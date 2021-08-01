import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/services/paciente/paciente.service';

@Component({
  selector: 'editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {
  paciente:any;
  constructor(
    public pacienteService: PacienteService,
  ) { }

  ngOnInit(): void {
   this.editar();
  }
  
  editar(){
    let codigo =localStorage.getItem("codigo");
    this.pacienteService.obtenerPorCodigo(+codigo).subscribe(data=>{
    this.paciente = data;

    })
   
  }

}
