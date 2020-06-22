import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../shared/services/usuario.service';
import { MessageService } from 'primeng/api';
import { GlobalFilterService } from '../shared/services/global-filter.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  recordsUsuarios: Array<Usuario> = [];
  usuarioSeleccionado: Usuario;

  constructor(private route: Router,
              private usuarioService: UsuarioService,
              private messageService: MessageService,
              private globalFilterService: GlobalFilterService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        this.recordsUsuarios = [...response];
      },
      (error) => {
        this.onReject();
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar lista de usuarios."
        });
      }
    )
  }

  agregarUsuario(){    
    // localStorage.removeItem("idUsuarioEditar");
    this.globalFilterService.usuarioSeleccionado = null;    
    this.route.navigate(["/usuario-editar"]);
  }

  editar(row: Usuario){
    // localStorage.setItem("idUsuarioEditar", row.id);
    this.globalFilterService.usuarioSeleccionado = row;    
    this.route.navigate(["/usuario-editar"]);
  }

  eliminar(row: Usuario){
    this.usuarioSeleccionado = row;
    this.messageService.clear();
    this.messageService.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Eliminar el Usuario?",
      detail: "Esta seguro que desea eliminar el usuario"
    });
  }

  onConfirm(){
    this.usuarioService.eliminarUsuario(this.usuarioSeleccionado).subscribe(
      (response) => {
        this.onReject();
        this.obtenerUsuarios();
      },
      (error) => {
        this.onReject();
        this.messageService.add({
          severity: "error",
          summary: "Error al guardar",
          detail: "Ocurrió un error al momento de guardar"
        });
      }
    );
  }

  onReject(){
    this.messageService.clear("c");
  }

  cambioEstado(e, row: Usuario){
    let isChecked = e.checked;
    this.usuarioSeleccionado = row;
    this.usuarioService.cambioEstado(this.usuarioSeleccionado).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Guadado exitoso",
          detail: `El usuario se ${isChecked?"activo":"inactivo"} correctamente`
        });
        this.obtenerUsuarios();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al guardar",
          detail: `Ocurrió un error al momento de guardar. Detalle error: ${error.error}`
        });
      }
    );
  }
}
