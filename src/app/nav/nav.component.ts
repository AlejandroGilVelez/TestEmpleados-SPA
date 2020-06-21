import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoginDto } from '../dto/loginDto';
import { MessageService } from "primeng/api";
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  objLogin = new LoginDto();
  nombreUsuario : string;
 


  constructor(private authService: AuthService,
              private messageService: MessageService,
              private route: Router) { }

  ngOnInit(): void {
  }

  estaLogueado(){
    return this.authService.estaLogueado();
  }

  login(){
    this.authService.loginToken(this.objLogin).subscribe(
      (response) =>{
        localStorage.setItem("autkey", response.token);
        const tokenDecode = jwt_decode(response.token);
        this.nombreUsuario = tokenDecode.unique_name;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al login",
          detail: "Las credenciales ingresadas no son válidas"
        });
      }
    );
  }

  logout(){
    this.authService.deleteKey();
    this.route.navigateByUrl("/");
  }

}
