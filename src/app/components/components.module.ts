import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input/';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ListarHistoriaClinicaComponent } from './listar-historia-clinica/listar-historia-clinica.component';
import { ConsultaEnfermedadComponent } from './consulta-enfermedad/consulta-enfermedad.component';
import { ConsultaExamenComponent } from './consulta-examen/consulta-examen.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { ConsultaCompletaComponent } from './consulta-completa/consulta-completa.component';
import { ListadoTratamientosComponent } from './listado-tratamientos/listado-tratamientos.component';
import { EditarRepresentanteComponent } from './editar-representante/editar-representante.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatOptionModule, MatSelectModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ListarHistoriaClinicaComponent,
    ConsultaEnfermedadComponent,
    ConsultaExamenComponent,
    TratamientoComponent,
    ConsultaCompletaComponent,
    ListadoTratamientosComponent,
    EditarRepresentanteComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  
})
export class ComponentsModule { }
