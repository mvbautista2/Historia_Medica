import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'app/services/paciente/paciente.service';

@Component({
  selector: 'editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {
  paciente:any;
  
  editarPacienteForm: FormGroup;
  constructor(
    public pacienteService: PacienteService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
   this.editar();
   
  }
  
  editar(){
    let codigo =localStorage.getItem("codigo");
    this.pacienteService.obtenerPorCodigo(+codigo).subscribe(resp=>{
    this.paciente = resp;     

    })
   
  }
  guardar(){

  }

}
