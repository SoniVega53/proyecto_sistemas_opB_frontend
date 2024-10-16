import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/UserEntity';
import { HttpHeaders } from '@angular/common/http';
import { ArticleEntity } from '../entity/ArticleEntity';
import { AuthApiService } from './auth-api.service';
import { UserEntityRequest } from '../entity/UserEntityRequest';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AuthApiService{


  getAllUsers(): Observable<UserEntity[]>{
    return this.getService("admin/user/see");
  }
  getInfoUser(): Observable<any>{
    const token = this.getToken()
    return this.postServiceBody(`user/usuario?token=${token}`,null);
  }

  deleteUsuario(idUsuario:Number): Observable<any>{
    return this.deleteService(`user/usuario/eliminar/${idUsuario}`);
  }

  updateUserPassword(body:UserEntityRequest,idUser:Number):Observable<any>{
    return this.postServiceBody(`user/usuario/update/password/${idUser}`,body);
  }

  updateUser(body:UserEntityRequest,idUser:Number):Observable<any>{
    return this.postServiceBody(`user/usuario/update/${idUser}`,body);
  }

  //Articles
  createArticles(body:ArticleEntity):Observable<any>{
    let username = this.getUserData().sub;
    return this.postServiceBody(`user/articles/editOrSave/${username}`,body);
  }

  getAllArticles(): Observable<any[]>{
    return this.getService("user/articles");
  }

  deleteArticle(idArticle:Number): Observable<any>{
    let username = this.getUserData().sub;
    return this.deleteService(`user/articles/delete/${username}/${idArticle}`);
  }
}
