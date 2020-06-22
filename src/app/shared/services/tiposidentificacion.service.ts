import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiposIdentificacion } from '../../models/tiposidentificacion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposidentificacionService {

  constructor(private http: HttpClient) { }

  obtenerTiposIdentificaciones(){
    return this.http.get<TiposIdentificacion[]>(`${environment.baseUrl}TiposIdentificacion/List`);
  }
  
}
