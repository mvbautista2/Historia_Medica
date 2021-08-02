import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicoService } from 'app/services/medico/medico.service';
import { ConsultaService } from 'app/services/consulta/consulta.service';

@Component({
  selector: 'consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
   consultaForm: FormGroup;
   medicos:any;
   

  constructor(
    public medicoService: MedicoService,
    public consultaService: ConsultaService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    
    //alert(historia);
    this.consultaForm = this.fb.group({
      
      codigoHistoriaClinica:[''],
      codigoMedico:[''],
      fechaConsulta:[''],
      altura:[''],
      peso:[''],
      temperatura:[''],
      presionSistolica:[''],
      presionDiastolica:[''],

    });;
    this.medicoService.listarTodos().subscribe(resp=>{
      this.medicos=resp;
      console.log(resp);
    },
    error=>{console.error(error)}
    );
    this.editar();


  }
  guardar():void{
    this.consultaService.crearConsulta(this.consultaForm.value).subscribe(resp=>{

    },
    error=>{console.error(error)}
    )

  }
  editar(){
    let historia = localStorage.getItem("historia");
    this.consultaForm.setValue({
      
      codigoHistoriaClinica: historia,
      codigoMedico:'',
      fechaConsulta:'',
      altura:'',
      peso:'',
      temperatura:'',
      presionSistolica:'',
      presionDiastolica:'',



    });
  }



}
