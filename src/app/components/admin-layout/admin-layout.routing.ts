import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PacienteComponent } from 'app/components/paciente/paciente.component';
import { TableListComponent } from '../listadoPacientes/listadoPacientes.component';
import { HistoriaClinicaComponent } from '../historia-clinica/historia-clinica.component';
import {ConsultaComponent} from '../consulta/consulta.component';
import { ConsultaEnfermedadComponent } from '../consulta-enfermedad/consulta-enfermedad.component';
import { ConsultaCompletaComponent } from '../consulta-completa/consulta-completa.component';
import { ListadoTratamientosComponent } from '../listado-tratamientos/listado-tratamientos.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'paciente', component: PacienteComponent },
    { path: 'table-list', component: TableListComponent },   
    {path: 'historia-clinica', component:HistoriaClinicaComponent},
    {path: 'consulta', component:ConsultaComponent},
    {path:'consulta-enfermedad', component:ConsultaEnfermedadComponent},
    {path:'consulta-completa',component:ConsultaCompletaComponent},
    {path:'listado-tratamientos',component:ListadoTratamientosComponent},
];
