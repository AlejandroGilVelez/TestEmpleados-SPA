import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadoEditarComponent } from './empleado/empleado-editar/empleado-editar.component';


const routes: Routes = [    
  { path:"empleado-editar", component: EmpleadoEditarComponent},
  { path:"empleado", component: EmpleadoComponent},
  { path:"usuario-editar", component: UsuarioEditarComponent},
  { path:"usuario", component: UsuarioComponent},
  { path:"home", component: HomeComponent},
  { path:"**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
