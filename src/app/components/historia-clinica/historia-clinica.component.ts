import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { HistoriaClinicaService } from 'app/services/historiaClinica/historia-clinica.service';
import { RepresentanteComponent } from '../representante/representante.component';
import { PacienteService } from 'app/services/paciente/paciente.service';
import { Router } from '@angular/router';

declare var $: any;
declare interface RouteInfo {
  path: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/consulta', },
];

@Component({
  selector: 'historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})

export class HistoriaClinicaComponent implements OnInit {
  paciente: any;
  historiaForm: FormGroup;
  historia: any;
  codigoPaciente: any;
  menuItems: any[];
  constructor(
    private dialog: MatDialog,
    public pacienteService: PacienteService,
    public fb: FormBuilder,
    public historiaClinicaService: HistoriaClinicaService,
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.historiaForm = this.fb.group({
      codPaciente: ['', Validators.required],
      alturaNacimiento: ['',],
      pesoNacimiento: ['',],
      Antecedentes: ['',],
      Observaciones: ['',],
    });
    this.obtenerCodigo();
    this.editarHistorial();
  }

  obtenerCodigo() {
    let codigo = localStorage.getItem("codigo");
    this.codigoPaciente = codigo;
    this.pacienteService.obtenerPorCodigo(codigo).subscribe(resp => {
      this.paciente = resp;
    })
  }

  editarHistorial() {
    this.historiaClinicaService.obtenerHistoriaPorCodPaciente(this.codigoPaciente).subscribe(resp => {
      this.historia = resp;
      this.historiaForm.setValue({
        codPaciente: this.historia.codigo,
        alturaNacimiento: this.historia.alturaNacimiento,
        pesoNacimiento: this.historia.pesoNacimiento,
        antecedentes: this.historia.antecedentes,
        observacion: this.historia.observacion,
      })
    })
  }

  

  guardarHistoria(): void {

    this.historiaClinicaService.modificarHistoria(this.historiaForm.value).subscribe(resp => {
      this.showNotification('top', 'center');
    },
      error => { console.error(error) }
    )
  }

  representante() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(RepresentanteComponent, dialogConfig);
  }


  showNotification(from, align) {

    const color = 'info';
    $.notify({
      icon: "notifications",
      message: "La historia clinica ha sido creada con éxito"

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


