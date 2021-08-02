import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicoService } from 'app/services/medico/medico.service';
import { ConsultaService } from 'app/services/consulta/consulta.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
   consultaForm: FormGroup;
   medicos:any;
   

  constructor(
    public medicoService: MedicoService,
    public consultaService: ConsultaService,
    public fb: FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {

    
    //alert(historia);
    this.consultaForm = this.fb.group({
      
      codigoHistoriaClinica:[''],
      codigoMedico:[''],
      fechaConsulta:[''],
      altura:[''],
      peso:[''],
      temperatura:[''],
      presionSistolica:[''],
      presionDiastolica:[''],

    });;
    this.medicoService.listarTodos().subscribe(resp=>{
      this.medicos=resp;
      console.log(resp);
    },
    error=>{console.error(error)}
    );
    this.editar();


  }
  guardar():void{
    this.consultaService.crearConsulta(this.consultaForm.value).subscribe(resp=>{
      this.showNotification('top','center');
      this.router.navigate(['historia-clinica']).then(() => {
        window.location.reload();
      });

    },
    error=>{console.error(error)}
    )

  }
  editar(){
    let historia = localStorage.getItem("historia");
    this.consultaForm.setValue({
      
      codigoHistoriaClinica: historia,
      codigoMedico:'',
      fechaConsulta:'',
      altura:'',
      peso:'',
      temperatura:'',
      presionSistolica:'',
      presionDiastolica:'',



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
