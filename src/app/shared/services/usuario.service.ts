import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  recordsUsuarios: Array<Usuario> = [];
  usuarioSeleccionado: Usuario;

  constructor(private http: HttpClient) { }

  obtenerUsuarios(){
    return this.http.get<Usuario[]>(`${environment.baseUrl}Usuario/List`);
  }

  obtenerUsuario(id: string){
    return this.http.get<Usuario>(`${environment.baseUrl}Usuario/Get/${id}`);
  }

  eliminarUsuario(usuarioSeleccionado : Usuario){
    return this.http.delete(`${environment.baseUrl}Usuario/Delete/${usuarioSeleccionado.id}`);
  }

  crearUsuario(usuarioSeleccionado: Usuario){
    return this.http.post(`${environment.baseUrl}Usuario/Create`, usuarioSeleccionado);
  }

  editarUsuario(usuarioSeleccionado : Usuario){
    return this.http.put(`${environment.baseUrl}Usuario/Update`, usuarioSeleccionado);
  }

  cambioEstado(usuarioSeleccionado: Usuario){
    return this.http.post(`${environment.baseUrl}Usuario/CambioEstado`, usuarioSeleccionado);
  }

}
