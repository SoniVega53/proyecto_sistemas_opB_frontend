import { UserRequest } from './../../entity/UserRequest';
import { Component } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { AuthApiService } from '../../service/auth-api.service';
import { UserEntity } from '../../entity/UserEntity';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserEntityRequest } from '../../entity/UserEntityRequest';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  userEntity!: UserEntity;
  userRequest!: UserEntityRequest;
  validButton : boolean = false;

  constructor(private serviceUser: UserApiService,public router: Router) {
    this.userEntity = new UserEntity();
    this.getDataUserPerfile();
    this.userRequest = new UserEntityRequest();
  }

  getDataUserPerfile() {
    this.serviceUser.getInfoUser().subscribe((res) => {
      if (res.code == '400') {
        this.router.navigate(['/home']);
      } else {
        this.userEntity = res.entity
      }
    });
  }

  createUpdatePasswordChange() {
    this.serviceUser.updateUserPassword(this.userRequest,this.userEntity.id!).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: res?.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.userRequest = new UserEntityRequest();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    });
  }

  createUpdateUser() {
    this.serviceUser.updateUser(this.userRequest,this.userEntity.id!).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: res?.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.userRequest = new UserEntityRequest();
        this.getDataUserPerfile();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    });
  }

  clearDataModel(){
    this.userRequest = new UserEntityRequest();
  }

  editarData(){
    //this.onChangeValues();
    this.userRequest = new UserEntityRequest();
    this.userRequest.username = this.userEntity.username;
    this.userRequest.name = this.userEntity.name;
    this.userRequest.lastname = this.userEntity.lastname;
    this.userRequest.email = this.userEntity.email;
  }

  onChangeValuesPassword(){
    this.validButton = this.validActiveButton();
  }

  onChangeValues() {
    this.validButton = this.validActiveButtonEdit();
  }

  validActiveButton(): boolean {
    return (
      this.userRequest.password?.trim() != '' &&
      this.userRequest.password != null &&
      this.userRequest.passwordChange?.trim() != '' &&
      this.userRequest.passwordChange != null
    );
  }

  validActiveButtonEdit(): boolean {
    return (
      this.userRequest.username?.trim() != '' &&
      this.userRequest.username != null &&
      this.userRequest.name?.trim() != '' &&
      this.userRequest.name != null &&
      this.userRequest.lastname?.trim() != '' &&
      this.userRequest.lastname != null &&
      this.userRequest.email?.trim() != '' &&
      this.userRequest.email != null
    );
  }

  deleteUsuario() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUser.deleteUsuario(this.userEntity.id!).subscribe((res) => {
          if (res.code == '400') {
            Swal.fire({
              title: 'Error!',
              text: res?.message,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          } else {
            Swal.fire({
              title: 'Success!',
              text: res?.message,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            this.logout()
          }
        });
      }
    });
  }

  logout() {
    this.serviceUser.logout();
  }

}
