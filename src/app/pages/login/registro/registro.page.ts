import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario-service/usuario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public data = {
    nombre: '',
    telefono: null,
    correo: '',
    correoValido: false,
    password: '',
    rePassword: '',
  };
  mensaje = '';
  constructor(
    private nav: NavController,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  validarCorreo() {
    const regex = new RegExp(environment.ReExMail);
    this.data.correoValido = regex.test(this.data.correo);
  }

  login() {
    this.nav.navigateRoot('');
  }

  registrar() {
    const usr: Usuario = {
      idUsuario: this.data.correo,
      nombre: this.data.nombre,
      alias: this.data.nombre,
      telefono: this.data.telefono,
      correo: this.data.correo,
      password: this.data.password,
      tipo: 0,
      estado: ConstStatus.activo,
    };
    this.usuarioService
      .registrar(usr)
      .then(() => {
        setTimeout(() => {
          this.nav.navigateRoot('empresas');
        }, 500);
      })
      .catch((error) => {
        this.mensaje = error;
      });
  }
}
