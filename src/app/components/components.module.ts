import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatInputModule} from '@angular/material/input/';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,MatOptionModule, MatSelectModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    EditarPacienteComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  
})
export class ComponentsModule { }
