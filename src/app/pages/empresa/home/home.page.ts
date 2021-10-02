import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Empresa } from 'src/app/core/interfaces/Empresa';
import { Sucursal } from 'src/app/core/interfaces/Sucursal';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { UsuarioService } from 'src/app/core/services/usuario-service/usuario.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: Usuario;
  public empresa: Empresa;
  public sucursal: Sucursal;
  constructor(
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.usuarioService.getEmpresasAcceso(this.usuario).then((accesos) => {
        if (accesos.exists) {
          const accesosAux = accesos.data().accesos;
          console.log('accesos', accesosAux);
          //FOR EACH PARA MÁS ADELANTE
          this.usuarioService.getEmpresas(accesosAux[0]).then((empresa) => {
            this.empresa = empresa.data() as Empresa;
            console.log('empresa', this.empresa);
            this.storage.set(
              ConstStrings.str.storage.empresa,
              JSON.stringify(this.empresa)
            );
            this.usuarioService
              .getSucursalesAcceso(this.usuario, this.empresa.idEmpresa)
              .then((accesosSucursal) => {
                console.log('accesosSucursal', accesosSucursal);
                if (accesosSucursal.exists) {
                  const accesosSucursalAux = accesosSucursal.data();
                  console.log(accesosSucursalAux.accesos[0]);
                  this.usuarioService
                    .getSucursal(
                      this.empresa.idEmpresa,
                      accesosSucursalAux.accesos[0]
                    )
                    .then((sucursal) => {
                      console.log('sucursal', sucursal);
                      if (sucursal.exists) {
                        this.sucursal = sucursal.data() as Sucursal;
                        this.usuario.sucursal = this.sucursal;
                        this.usuario.idSucursal = this.sucursal.idSucursal;
                        this.storage.set(
                          ConstStrings.str.storage.user,
                          JSON.stringify(this.usuario)
                        );
                        this.nav.navigateForward('empresas/sucursal');
                      }
                    });
                }
              });
          });
        }
      });
    });
  }
}
