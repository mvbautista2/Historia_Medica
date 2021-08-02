import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaExamenService } from 'app/services/consultaExamen/consulta-examen.service';
import { ExamenMedicoService } from 'app/services/examenMedico/examen-medico.service';
declare var $: any;

@Component({
  selector: 'consulta-examen',
  templateUrl: './consulta-examen.component.html',
  styleUrls: ['./consulta-examen.component.css']
})
export class ConsultaExamenComponent implements OnInit {
  
  consultaExamenForm: FormGroup;
  examenes:any;

  constructor(
    public consultaExamenService : ConsultaExamenService,
    public examenMedicoService: ExamenMedicoService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.consultaExamenForm = this.fb.group({
      
      codigoConsulta:[''],
      codigoExamenMedico:[''],
      motivo:['', Validators.required],
      fechaExamen:['', Validators.required],
      urlResultadoInforme:[''],
      urlResultadoImagen:[''],

    });;
    this.examenMedicoService.listarTodos().subscribe(resp=>{
      this.examenes=resp;
      console.log(resp);
    },
    error=>{console.error(error)}
    );
    this.editar();
  }
  guardarConsultaExamen():void{
    this.consultaExamenService.crearConsultaExamen(this.consultaExamenForm.value).subscribe(resp=>{
      this.consultaExamenForm.reset();
      this.showNotification('top','center');
    },
    error=>{console.error(error)}
    )
  }
  editar(){
    let item = localStorage.getItem("item");
    this.consultaExamenForm.setValue({

      codigoConsulta:item,
      codigoExamenMedico:'',
      motivo:'',
      fechaExamen:'',
      urlResultadoInforme:'',
      urlResultadoImagen:'',



    });
  }
  showNotification(from, align){

    const color = 'info';
    $.notify({
        icon: "notifications",
        message: "El examen fue agregado a la consulta con éxito"

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
