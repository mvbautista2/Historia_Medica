import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaEnfermedadService } from 'app/services/consultaEnfermedad/consulta-enfermedad.service';
import { EnfermedadService } from 'app/services/enfermedad/enfermedad.service';

@Component({
  selector: 'consulta-enfermedad',
  templateUrl: './consulta-enfermedad.component.html',
  styleUrls: ['./consulta-enfermedad.component.css']
})
export class ConsultaEnfermedadComponent implements OnInit {
  
  consultaEnfermedadForm: FormGroup;
  enfermedades:any;

  constructor(
    public consultaEnfermedadService : ConsultaEnfermedadService,
    public enfermedService: EnfermedadService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.consultaEnfermedadForm = this.fb.group({
      
      codigoConsulta:[''],
      codigoEnfermedad:[''],
      diagnostico:[''],
      fechaDiagnostico:[''],
      observacion:[''],

    });;
    this.enfermedService.listarTodos().subscribe(resp=>{
      this.enfermedades=resp;
      console.log(resp);
    },
    error=>{console.error(error)}
    );
  }
  guardarConsultaEnfermedad():void{
    this.consultaEnfermedadService.crearConsultaEnfermedad(this.consultaEnfermedadForm.value).subscribe(resp=>{

    },
    error=>{console.error(error)}
    )
  }
  

}
