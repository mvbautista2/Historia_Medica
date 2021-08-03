import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepresentanteService } from 'app/services/representante/representante.service';
import { PacienteService } from 'app/services/paciente/paciente.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css']
})
export class EditarRepresentanteComponent implements OnInit {
  representanteEditarForm: FormGroup;
  codPaciente: any;
  representante: any;
  paciente: any;
  constructor(
    public fb: FormBuilder,
    public representanteService: RepresentanteService,
    public pacienteService: PacienteService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.representanteEditarForm = this.fb.group({
      codigo: ['',],
      codigoPaciente: [''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      genero: ['',],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      parentesco: ['', Validators.required],

    });;

    this.obtenerCodigo();
    this.editarRepresentante();
    
  }


  obtenerCodigo() {
    let codigo = localStorage.getItem("codigo");
    this.codPaciente = codigo;
    this.pacienteService.obtenerPorCodigo(codigo).subscribe(resp => {
      this.paciente = resp;

    })
  }

  editarRepresentante() {
    let codigo = localStorage.getItem("codigo");
    this.representanteService.obtenerRepresentantePorCodPaciente(+codigo).subscribe(data => {
      this.representante = data;
      this.representanteEditarForm.setValue({
        codigo: this.representante.codigo,
        codigoPaciente: this.representante.codigoPaciente,
        tipoIdentificacion: this.representante.tipoIdentificacion,
        identificacion: this.representante.identificacion,
        apellidos: this.representante.apellidos,
        nombres: this.representante.nombres,
        genero: this.representante.genero,
        direccion: this.representante.direccion,
        telefono: this.representante.telefono,
        parentesco: this.representante.parentesco
      })
    })
  }
  
  guardar(): void {

    this.representanteService.modificarRepresentante(this.representanteEditarForm.value).subscribe(resp => {
      this.showNotification('top', 'center');
      this.router.navigate(['historia-clinica']).then(() => {
        window.location.reload();
      });
    },
      error => { console.error(error);
      this.showNotificationError('top','center') }
    )
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

  showNotification(from, align) {

    const color = 'info';
    $.notify({
      icon: "notifications",
      message: "El representante del paciente no se pudo modificar"

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

}
