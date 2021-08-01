import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input/';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableListComponent } from './components/listadoPacientes/listadoPacientes.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { PacienteComponent } from './components/paciente/paciente.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,MatOptionModule, MatSelectModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PacienteComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
