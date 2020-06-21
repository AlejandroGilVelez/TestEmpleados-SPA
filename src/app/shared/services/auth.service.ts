import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../dto/loginDto';
import { AuthDto } from '../../dto/authDto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nombreUsuario: string;

  constructor(private http: HttpClient) { }

  loginToken(objLogin: LoginDto){
    return this.http.post<AuthDto>(`${environment.baseUrl}Auth/login`, objLogin);
  }

  estaLogueado(): boolean{
    return localStorage.getItem("autkey")!= null && localStorage.getItem("autkey").length > 1;
  }

  deleteKey(){
    localStorage.removeItem("autkey");
  }

}
