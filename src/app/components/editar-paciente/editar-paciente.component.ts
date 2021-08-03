import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'app/services/paciente/paciente.service';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {
  paciente:any;
  
  editarPacienteForm: FormGroup;
  constructor(
    public pacienteService: PacienteService,
    public fb: FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.editarPacienteForm = this.fb.group({
      codigo:[''],
      tipoIdentificacion: ['',Validators.required],
      identificacion: ['',],
      seguroSocial: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      nacionalidad: ['', Validators.required],
      tipoSangre: ['', Validators.required],
    });;
    this.editar();
    
   
  }
  
  editar(){
    let codigo =localStorage.getItem("codigo");
    this.pacienteService.obtenerPorCodigo(+codigo).subscribe(resp=>{
    this.paciente = resp;   
    this.editarPacienteForm.setValue({
      codigo:this.paciente.codigo,
      tipoIdentificacion: this.paciente.tipoIdentificacion,
      identificacion: this.paciente.identificacion,
      seguroSocial: this.paciente.seguroSocial,
      apellidos: this.paciente.apellidos,
      nombres: this.paciente.nombres,
      genero: this.paciente.genero,
      fechaNacimiento: this.paciente.fechaNacimiento,
      direccion: this.paciente.direccion,
      telefono: this.paciente.telefono,
      nacionalidad: this.paciente.nacionalidad,
      tipoSangre: this.paciente.tipoSangre,
    })      

    });
    this.editarPacienteForm.get("tipoIdentificacion").valueChanges.subscribe(valor=>{
      let identificacion = this.editarPacienteForm.get("identificacion");
      switch(valor){
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
  
  guardar(): void {
    this.pacienteService.modificarPaciente(this.editarPacienteForm.value).subscribe(resp=>{
    this.showNotification('top','center');
      this.router.navigate(['table-list']).then(() => {
        window.location.reload();
      });
      
    },
    error=>{console.error(error)
    this.showNotificationError('top','center')}
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
  showNotification(from, align){

    const color = 'info';
    $.notify({
        icon: "notifications",
        message: "El paciente ha sido editado con éxito"

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
