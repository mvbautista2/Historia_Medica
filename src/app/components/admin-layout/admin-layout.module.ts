import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TableListComponent } from '../listadoPacientes/listadoPacientes.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { HistoriaClinicaComponent } from '../historia-clinica/historia-clinica.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RepresentanteComponent } from '../representante/representante.component';
import { EditarPacienteComponent } from '../editar-paciente/editar-paciente.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  declarations: [
    DashboardComponent,
    TableListComponent, 
    HistoriaClinicaComponent,
    RepresentanteComponent,    
    EditarPacienteComponent,
  ],
  exports:[
    MatDialogModule,
  ],
  entryComponents:[EditarPacienteComponent]

})

export class AdminLayoutModule {}
