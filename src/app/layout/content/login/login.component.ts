import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from 'src/app/core/services/utilizador/utilizador.service';
import { Router } from '@angular/router';
import { EncriptPackage } from 'src/app/core/models/EncriptPackage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  statusMessage: String;

  constructor(private userSrv: UtilizadorService, private router: Router) { }

  ngOnInit() {
  }

  signIn(email: string, password: string) {
    if (email === '' || password === '') {
      alert("Preencha todos os campos!");
      return
    }

    this.userSrv.signIn(new EncriptPackage(email, password)).subscribe(
      data => {
        console.log(data);
        localStorage.setItem(data.message, data.token);
        localStorage.setItem('UserLogged', email);
        this.router.navigate(['/sessao']);
      },
      error => { alert("Email ou palavra-passe erradas!") });
  }

}
