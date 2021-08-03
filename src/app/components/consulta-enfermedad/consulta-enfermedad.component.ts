import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultaEnfermedadService } from 'app/services/consultaEnfermedad/consulta-enfermedad.service';
import { EnfermedadService } from 'app/services/enfermedad/enfermedad.service';
declare var $: any;

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
    private router:Router,
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
    this.editar();
  }
  guardarConsultaEnfermedad():void{
    this.consultaEnfermedadService.crearConsultaEnfermedad(this.consultaEnfermedadForm.value).subscribe(resp=>{
      this.showNotification('top','center');
      this.router.navigate(['consulta-completa']);
    },
    error=>{console.error(error)
    this.showNotificationError('top','center')}
    )
  }
  editar(){
    let item = localStorage.getItem("item");
    this.consultaEnfermedadForm.setValue({
      
      codigoConsulta: item,
      codigoEnfermedad:'',
      diagnostico:'',
      fechaDiagnostico:'',
      observacion:'',



    });
  }
  showNotificationError(from, align){

    const color = 'danger';
    $.notify({
        icon: "notifications",
        message: "Ha existido un error en la operación, inténtelo de nuevo."
  
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
  showNotification(from, align){

    const color = 'info';
    $.notify({
        icon: "notifications",
        message: "La enfermedad fue agregada a la consulta con éxito"

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
