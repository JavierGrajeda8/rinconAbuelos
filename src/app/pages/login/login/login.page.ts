import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario-service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public data = {
    correo: '',
    password: '',
  };
  mensaje = '';
  constructor(
    private nav: NavController,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  registro() {
    this.nav.navigateRoot('registro');
  }
  loginRepartidor() {
    this.nav.navigateRoot('login');
  }

  private ingresar() {
    this.usuarioService
      .login(this.data.correo, this.data.password)
      .then((usuario: any) => {
        this.nav.navigateRoot('empresas');
        console.log('usuario', usuario.data());
      })
      .catch((error) => {
        console.log('error', error);
        this.mensaje = 'El nombre de usuario o contraseña no son correctos';
      });
  }
}
