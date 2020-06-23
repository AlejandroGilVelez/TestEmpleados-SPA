import { Injectable } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  
  recordsEmpleados: Array<Empleado> = [];
  empleadoSeleccionado: Empleado;
  
  constructor(private http: HttpClient) { }

  obtenerEmpleados(){
    return this.http.get<Empleado[]>(`${environment.baseUrl}Empleado/List`);
  }

  obtenerEmpleado(id: string){
    return this.http.get<Empleado>(`${environment.baseUrl}Empleado/Get/${id}`);
  }

  eliminarEmpleado(id: string){
    return this.http.delete(`${environment.baseUrl}Empleado/Delete/${id}`);
  }

  crearEmpleado(empleadoSeleccionado: Empleado){
    return this.http.post(`${environment.baseUrl}Empleado/Create`, empleadoSeleccionado);
  }

  editarEmpleado(empleadoSeleccionado: Empleado){
    return this.http.put(`${environment.baseUrl}Empleado/Update`, empleadoSeleccionado)
  }

  buscarEmpleado(empleado: string){
    return this.http.get<Empleado[]>(`${environment.baseUrl}Empleado/Buscar?empleado=${empleado}`);
  }

}
