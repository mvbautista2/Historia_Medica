import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicamentoService } from 'app/services/medicamento/medicamento.service';
import { TratamientoService } from 'app/services/tratamiento/tratamiento.service';
declare var $: any;

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
      
      codigoConsulta:[''],
      codigoMedicamento:[''],
      fechaInicio:[''],
      fechaFin:[''],
      dosis:[''],

    });;
    this.medicamentoService.listarTodos().subscribe(resp=>{
      this.medicamentos=resp;
    },
    error=>{console.error(error)}
    );
    this.editar();
  }
  guardarTratamiento():void{
    this.tratamientoService.crearTratamiento(this.tratamientoForm.value).subscribe(resp=>{

      this.showNotification('top','center');
    },
    error=>{console.error(error)}
    )

  }
  editar(){
    let item = localStorage.getItem("item");
    this.tratamientoForm.setValue({
      
      codigoConsulta:item,
      codigoMedicamento:'',
      fechaInicio:'',
      fechaFin:'',
      dosis:'',

    });
  }
  showNotification(from, align){

    const color = 'info';
    $.notify({
        icon: "notifications",
        message: "El tratamiento de la enfermedad se agregó con éxito"

    },{
        type: color,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

}
