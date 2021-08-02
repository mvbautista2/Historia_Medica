import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepresentanteService } from 'app/services/representante/representante.service';
import { PacienteService } from 'app/services/paciente/paciente.service';
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
  ) { }

  ngOnInit(): void {

    this.representanteForm = this.fb.group({
      codigo: ['',],
      codigoPaciente: [''],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      genero: ['',],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      parentesco: ['', Validators.required],

    });;

    this.obtenerCodigo();
    this.editarHistoria();
    this.verificarTipoIden();
    this.verificarForm();
    
  }
  verificarForm() {
    this.representanteEmpty = this.representanteForm.value;
    if (this.representanteEmpty === '') {
      this.isButtonAdd = true;
      this.isButtonEdit = false;
    } else {
      this.isButtonAdd = false;
      this.isButtonEdit = true;
    }
  }

  verificarTipoIden() {
    this.representanteForm.get("tipoIdentificacion").valueChanges.subscribe(valor => {
      let identificacion = this.representanteForm.get("identificacion");
      console.log(valor);
      alert(valor);
      switch (valor) {
        case "NIN":
          identificacion.reset();
          identificacion.disable();
          break;
        case "CED":
          identificacion.enable();
          break;
        case "PAS":
          identificacion.enable();
          break;
      }
    });
  }

  obtenerCodigo() {
    let codigo = localStorage.getItem("codigo");
    this.codPaciente = codigo;
    this.pacienteService.obtenerPorCodigo(codigo).subscribe(resp => {
      this.paciente = resp;

    })
  }

  editarHistoria() {
    let codigoP = localStorage.getItem("codigo");
    alert(codigoP);
    this.representanteService.obtenerRepresentantePorCodPaciente(+codigoP).subscribe(data => {
      this.representante = data;
      this.representanteForm.setValue({
        codigoPaciente: codigoP,
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
    this.representanteEmpty = this.representanteForm.value;
    if (this.representanteEmpty === '') {
      this.agregar();
    } else {
      this.editar();
    }
  }
  editar(): void {

    this.representanteService.modificarRepresentante(this.representanteForm.value).subscribe(resp => {
      this.showNotification('top', 'center');
    },
      error => { console.error(error) }
    )
  }
  agregar(): void {
    this.representanteService.crearRepresentante(this.representanteForm.value).subscribe(resp => {
      this.representanteForm.disable();
      this.showNotification('top', 'center');


    },
      error => { console.error(error) }
    )
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


}
