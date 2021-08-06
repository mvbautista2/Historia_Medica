import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConsultaService } from 'app/services/consulta/consulta.service';
import { TratamientoComponent } from '../tratamiento/tratamiento.component';
declare var $: any;
declare interface RouteInfo {
  path: string;
  title: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/consulta-enfermedad', title: 'Agregar Enfermedad' },
  { path: '/consulta-examen', title: 'Agregar Examen'},
];
@Component({
  selector: 'consulta-completa',
  templateUrl: './consulta-completa.component.html',
  styleUrls: ['./consulta-completa.component.css']
})
export class ConsultaCompletaComponent implements OnInit {
  examenes:any;
  enfermedades:any;
  consultas:any;
  consultaForm: FormGroup;
  menuItems: any[];

  constructor(
    public fb: FormBuilder,
    public consultaService: ConsultaService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.consultaForm = this.fb.group({
      codigo:[''],
      codigoHistoriaClinica:[''],
      codigoMedico:[''],
      medico:[''],
      altura:[''],
      peso:[''],
      imc:[''],
      temperatura:[''],
      presionSistolica:[''],
      presionDiastolica:[''],

    });;
    this.mostrar();
    //this.consultaForm.get("medico").value();
      let medico = this.consultaForm.get("medico");
      medico.disable();
      let imc = this.consultaForm.get("imc");
      imc.disable();

  }
  mostrar(){
    let item = localStorage.getItem("codConsulta");
    let codigoHistoriaClinica = localStorage.getItem("codigoHistoriaClinica");
    this.consultaService.obtenerPorCodigo(+item).subscribe(resp=>{
      this.consultas = resp;
      this.enfermedades = this.consultas.consultaEnfermedad;
      this.examenes=this.consultas.consultaExamen;
      this.consultaForm.setValue({
        codigo:this.consultas.codigo,
        codigoHistoriaClinica : codigoHistoriaClinica,
        codigoMedico:this.consultas.codigoMedico,
        medico:this.consultas.medico.apellidos+" "+ this.consultas.medico.nombres,
        altura:this.consultas.altura,
        peso:this.consultas.peso,
        imc:this.consultas.imc,
        temperatura:this.consultas.temperatura,
        presionSistolica: this.consultas.presionSistolica,
        presionDiastolica:this.consultas.presionDiastolica,
      })     
  
      });
  }
  agregarTratamientos(item){
    localStorage.setItem("item", item.codigo.toString());
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(TratamientoComponent, dialogConfig);
  }
  verTratamientos(item){
    localStorage.setItem("codConsultaEnfermedad", item.codigo.toString());
    this.router.navigate(['listado-tratamientos']);
  }
  guardar(): void {

    this.consultaService.modificarConsulta(this.consultaForm.value).subscribe(resp => {
      this.showNotification('top', 'center');
      this.router.navigate(['consulta-completa']).then(() => {
        window.location.reload();
      });
    },
      error => { 
        console.error(error)
        this.showNotificationError('top', 'center');
       }
    )
  }
  
  showNotification(from, align) {

    const color = 'info';
    $.notify({
      icon: "notifications",
      message: "La consulta ha sido actualizada con éxito"

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


