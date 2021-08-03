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
  validador:any;
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
      identificacion: ['',Validators.pattern("^[0-9]*$")],
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
    this.pacienteForm.get("tipoIdentificacion").valueChanges.subscribe(valor=>{
      let identificacion = this.pacienteForm.get("identificacion");
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
    this.pacienteService.crearPaciente(this.pacienteForm.value).subscribe(resp=>{
      this.pacienteForm.reset();
      this.showNotification('top','center');
      this.router.navigate(['table-list']);
      
    },
    error=>{
      console.error(error);
      this.showNotificationError('top','center')
    }
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
showNotificationError(from, align){

  const color = 'danger';
  $.notify({
      icon: "notifications",
      message: "Ha existido un error en la creación del paciente, inténtelo de nuevo. No olvide completar los campos obligatorios"

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
validadorDeCedula(cedula: String) {
  let cedulaCorrecta = false;
  if (cedula.length == 10)
  {    
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
          // El ultimo digito se lo considera dígito verificador
          let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
          let verificador = parseInt(cedula.substring(9, 10));
          let suma:number = 0;
          let digito:number = 0;
          for (let i = 0; i < (cedula.length - 1); i++) {
              digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
              suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
        //      console.log(suma+" suma"+coefValCedula[i]); 
          }
          suma= Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
          if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
              cedulaCorrecta = true;
          } else if ((10 - (Math.round(suma % 10))) == verificador) {
              cedulaCorrecta = true;
          } else {
              cedulaCorrecta = false;
          }
      } else {
          cedulaCorrecta = false;
      }
  } else {
      cedulaCorrecta = false;
  }
this.validador= cedulaCorrecta;

}
}
