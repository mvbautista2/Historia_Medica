import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'app/services/paciente/paciente.service';
@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  tipoIdentificacion: any;
  constructor(
    public fb: FormBuilder,
    public pacienteService: PacienteService,
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      tipoIdentificacion: ['',],
      identificacion: ['',],
      seguroSocial: ['',],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      nacionalidad: ['', Validators.required],
      tipoSangre: ['', Validators.required],
    });;
    this.pacienteService.getAllPacientes().subscribe(resp => {
      this.tipoIdentificacion = resp;
      
    },
      error => { console.error(error) }

    )
  }
  guardar(): void {
    this.pacienteService.crearPaciente(this.pacienteForm.value).subscribe(resp=>{

    },
    error=>{console.error(error)}
    )
  }
}
