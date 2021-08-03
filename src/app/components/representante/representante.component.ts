import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepresentanteService } from 'app/services/representante/representante.service';
import { PacienteService } from 'app/services/paciente/paciente.service';
import {Router} from '@angular/router';
declare var $: any;


@Component({
  selector: 'representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.css']
})
export class RepresentanteComponent implements OnInit {
  representanteEmpty: any;
  representante: any;
  isButtonAdd: boolean = true;
  isButtonEdit: boolean = true;
  codPaciente: any;
  paciente: any;
  representanteForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public representanteService: RepresentanteService,
    public pacienteService: PacienteService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.representanteForm = this.fb.group({
      codigoPaciente:[''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      genero: ['',],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      parentesco: ['', Validators.required],

    });
    this.datosRepresentante();
    
  }
  guardar(): void {
    this.representanteService.crearRepresentante(this.representanteForm.value).subscribe(resp => {
      //this.representanteForm.disable();
      this.showNotification('top', 'center');
      this.router.navigate(['historia-clinica']).then(() => {
        window.location.reload();
      });
    },
      error => { console.error(error);

      this.showNotificationError('top', 'center') }
    )
  }

  datosRepresentante() {
    let codigo = localStorage.getItem("codigo");
      this.representanteForm.setValue({
        codigoPaciente: codigo,
        tipoIdentificacion:'',
        identificacion: '',
        apellidos: '',
        nombres:'',
        genero:'',
        direccion:'',
        telefono:'',
        parentesco:''
      });
  }

  showNotification(from, align) {

    const color = 'info';
    $.notify({
      icon: "notifications",
      message: "El representante del paciente ha sido creado con éxito"

    }, {
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


}
