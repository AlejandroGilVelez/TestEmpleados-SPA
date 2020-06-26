import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from "primeng/button";
// import { TableModule } from 'primeng/table';
// import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';
import { EmpleadoEditarComponent } from './empleado/empleado-editar/empleado-editar.component';
import { EmpleadoComponent } from './empleado/empleado.component';
// import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    UsuarioComponent,
    UsuarioEditarComponent,
    EmpleadoComponent,
    EmpleadoEditarComponent    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InputSwitchModule,
    // TableModule,    
    ButtonModule,
    // ScrollingModule,
    // DropdownModule,
    ToastModule    
  ],
  providers: [
    MessageService,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
