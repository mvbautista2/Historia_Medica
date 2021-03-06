import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { HistoriaClinicaService } from 'app/services/historiaClinica/historia-clinica.service';
import { RepresentanteComponent } from '../representante/representante.component';
import { EditarRepresentanteComponent } from '../editar-representante/editar-representante.component';
import { PacienteService } from 'app/services/paciente/paciente.service';
import { RepresentanteService } from 'app/services/representante/representante.service';
import { Router } from '@angular/router';
import { ConsultaComponent } from '../consulta/consulta.component';
import { ConsultaService } from '../../services/consulta/consulta.service';
import { isNgTemplate } from '@angular/compiler';
import { ConsultaExamenComponent } from '../consulta-examen/consulta-examen.component';
import { ConsultaEnfermedadComponent } from '../consulta-enfermedad/consulta-enfermedad.component';

declare var $: any;
declare interface RouteInfo {
  path: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/consulta' },
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
  consultas: any;
  
  
  constructor(
    private dialog: MatDialog,
    public pacienteService: PacienteService,
    public representanteService: RepresentanteService,
    public fb: FormBuilder,
    public historiaClinicaService: HistoriaClinicaService,
    public consultaService: ConsultaService,
    private router: Router,
  ) { }

  
  ngOnInit(): void {
    
    
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.historiaForm = this.fb.group({
      codigo: [''],
      codPaciente: [''],
      alturaNacimiento: [''],
      pesoNacimiento: ['',],
      antecedentes: ['',],
      observacion: ['',],
      fechaCreacion: [''],
    });;
    this.obtenerCodigo();
    //localStorage.clear()
    this.editarHistoria();
  }

  listarConsulta() {
    this.consultaService.listarPorCodigoHistoria(this.historia.codigo).subscribe(resp => {
      this.consultas = resp;
      console.log(resp);
    },
      error => { console.error(error) }

    );
  }

  obtenerCodigo() {
    let codigo = localStorage.getItem("codigo");
    this.codigoPaciente = codigo;
    this.pacienteService.obtenerPorCodigo(codigo).subscribe(resp => {
      this.paciente = resp;

    })
  }

  editarHistoria() {
    let codigo = localStorage.getItem("codigo");
    this.historiaClinicaService.obtenerHistoriaPorCodPaciente(+codigo).subscribe(data => {
      this.historia = data;
      this.consultas = this.historia.consultas;
      this.historiaForm.setValue({
        codigo: this.historia.codigo,
        codPaciente: this.historia.codPaciente,
        alturaNacimiento: this.historia.alturaNacimiento,
        pesoNacimiento: this.historia.pesoNacimiento,
        antecedentes: this.historia.antecedentes,
        observacion: this.historia.observacion,
        fechaCreacion: this.historia.fechaCreacion,
      })
      localStorage.setItem("codigoHistoriaClinica", this.historia.codigo);
    })
    
    
  }



  guardar(): void {

    this.historiaClinicaService.modificarHistoria(this.historiaForm.value).subscribe(resp => {
      this.showNotification('top', 'center');
    },
      error => { 
        console.error(error)
        this.showNotificationError('top', 'center');
       }
    )
  }

  representanteAgregar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(RepresentanteComponent, dialogConfig);
  }

  representateEditar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EditarRepresentanteComponent, dialogConfig);
  }

  buscarRepresentante(): void {
    let codigo = localStorage.getItem("codigo");
    this.representanteService.obtenerRepresentantePorCodPaciente(codigo).subscribe(data => {
      console.log(data);
      this.representateEditar();
    },
      error=>this.representanteAgregar()
    );
  }

  showNotification(from, align) {

    const color = 'info';
    $.notify({
      icon: "notifications",
      message: "La historia clinica ha sido actualizada con ??xito"

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
        message: "Ha existido un error en la operaci??n, int??ntelo de nuevo."
  
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
  agregarConsulta(historia) {
    localStorage.setItem("historia", historia.codigo.toString());
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(ConsultaComponent, dialogConfig);

  }
  verConsulta(item) {
    localStorage.setItem("codConsulta", item.codigo.toString());
    this.router.navigate(['consulta-completa']);
  }
  verHistorial(item) {

  }
  agregarEnfermedades(item) {
    localStorage.setItem("codConsulta", item.codigo.toString());
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(ConsultaEnfermedadComponent, dialogConfig);
  }
  agregarExamenes(item) {
    localStorage.setItem("codConsulta", item.codigo.toString());
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(ConsultaExamenComponent, dialogConfig);
  }

}


