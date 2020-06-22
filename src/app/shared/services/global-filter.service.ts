import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Empleado } from '../../models/empleado';
import { Area } from '../../models/area';
import { SubArea } from '../../models/subarea';

@Injectable({
  providedIn: 'root'
})
export class GlobalFilterService {

  usuarioSeleccionado : Usuario;

  empleadoSeleccionado : Empleado;

  areaSeleccionada: Area;

  subAreaSeleccionada: SubArea;

  constructor() { }
}
