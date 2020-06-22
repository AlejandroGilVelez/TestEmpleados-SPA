import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SubArea } from '../../models/subarea';

@Injectable({
  providedIn: 'root'
})
export class SubareaService {

  constructor(private http: HttpClient) { }

  obtenerSubAreas(id: string){
    return this.http.get<SubArea[]>(`${environment.baseUrl}SubAreas/Get/${id}`);
  }

}
