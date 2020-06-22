import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { MessageService } from "primeng/api";
import { UsuarioService } from '../../shared/services/usuario.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {

  usuarioSeleccionado : Usuario;
  esNuevoUsuario: boolean;

  constructor(private route: Router,
              private usuarioService: UsuarioService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.esNuevoUsuario = true;
    this.usuarioSeleccionado = new Usuario();

    const idUsuario = localStorage.getItem("idUsuarioEditar");
    if (idUsuario != null) {
      // Editando
      this.usuarioAntiguo(idUsuario);
      this.esNuevoUsuario = false;      
    }
  }

  guardar(){
    if (this.esNuevoUsuario) {
      this.usuarioService.crearUsuario(this.usuarioSeleccionado).subscribe(
        (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Guadado exitoso",
            detail: "El usuario se creo correctamente"
          });
          this.route.navigate(["/usuario"]);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar."
          });
        }
      );
    } else {
      this.usuarioService.editarUsuario(this.usuarioSeleccionado).subscribe(
        (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Guadado exitoso",
            detail: "El usuario se actualizó correctamente"
          });
          this.route.navigate(["/usuario"]);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar"
          });
        }
      );      
    }
  }

  cancelar(){    
    this.route.navigate(["/usuario"]);
  }

  usuarioAntiguo(id: string){
    this.usuarioService.obtenerUsuario(id).subscribe(
      (response) => {
        this.usuarioSeleccionado = response;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al consultar",
          detail: "Erro al consultar el usuario"
        });
      }
    );
  }
}
