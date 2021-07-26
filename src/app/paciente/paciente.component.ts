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
    })
  }
  guardar(): void {
  }
}
