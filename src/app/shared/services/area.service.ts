import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../../models/area';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  obtenerAreas(){
    return this.http.get<Area[]>(`${environment.baseUrl}Areas/List`);
  }

}
