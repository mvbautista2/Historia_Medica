import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicamentoService } from 'app/services/medicamento/medicamento.service';
import { TratamientoService } from 'app/services/tratamiento/tratamiento.service';

@Component({
  selector: 'tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {
   tratamientoForm: FormGroup;
   medicamentos:any;

  constructor(
    public medicamentoService: MedicamentoService,
    public tratamientoService: TratamientoService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.tratamientoForm = this.fb.group({
      
      codigoHistoriaClinica:[''],
      codigoMedico:[''],
      fechaConsulta:[''],
      altura:[''],
      peso:[''],
      temperatura:[''],
      presionSistolica:[''],
      presionDiastolica:[''],

    });;
    this.medicamentoService.listarTodos().subscribe(resp=>{
      this.medicamentos=resp;
      console.log(resp);
    },
    error=>{console.error(error)}
    );
  }
  guardarTratamiento():void{
    this.tratamientoService.crearTratamiento(this.tratamientoForm.value).subscribe(resp=>{

    },
    error=>{console.error(error)}
    )

  }

}
