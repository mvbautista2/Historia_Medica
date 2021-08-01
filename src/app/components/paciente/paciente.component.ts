import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'app/services/paciente/paciente.service';
import {Router} from '@angular/router';
import { HistoriaClinicaService } from 'app/services/historiaClinica/historia-clinica.service';



declare var $: any;

@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  paciente:any;
  constructor(
    public fb: FormBuilder,
    public pacienteService: PacienteService,
    public historiaClinicaService: HistoriaClinicaService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    
    this.pacienteForm = this.fb.group({
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
    
  }
  guardar(): void {
    this.pacienteService.crearPaciente(this.pacienteForm.value).subscribe(resp=>{
      this.pacienteForm.reset();
      this.showNotification('top','center');
      this.router.navigate(['historia-clinica']);
      
    },
    error=>{console.error(error)}
    )
  }
 
  showNotification(from, align){

    const color = 'info';
    $.notify({
        icon: "notifications",
        message: "El paciente ha sido creado con éxito"

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
