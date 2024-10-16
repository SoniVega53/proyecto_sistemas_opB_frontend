import { ArticleEntity } from './../../entity/ArticleEntity';
import { Component } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { AuthApiService } from '../../service/auth-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  articlesList!: ArticleEntity[];
  articleRequest!: ArticleEntity;
  isEmptyList: boolean = true;
  validButton: boolean = false;
  edit: boolean = false;

  constructor(private serviceUser: UserApiService) {
    this.getListArticles();
    this.articleRequest = new ArticleEntity();
  }

  getListArticles() {
    this.serviceUser.getAllArticles().subscribe((res) => {
      const articles: ArticleEntity[] = res.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content,
        datePublish: article.datePublish,
        dateUpdate: article.dateUpdate,
        username: article.user.username, // Extrae el username del objeto user
        email: article.user.email, // Extrae el username del objeto user
      }));
      this.articlesList = articles;
      this.isEmptyList = this.articlesList.length < 1;
    });
  }

  setTypeUpdate(title:String,content:String,idArticle:Number){
    this.articleRequest.id = idArticle;
    this.articleRequest.title = title;
    this.articleRequest.content = content;
    this.edit = true;
    this.onChangeValues();
  }

  chageEditToCreate(){
    this.articleRequest = new ArticleEntity();
    this.edit = false;
  }

  deleteArticle(idArticle: Number) {
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
        this.serviceUser.deleteArticle(idArticle).subscribe((res) => {
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
            this.getListArticles();
          }
        });
      }
    });
  }

  createUpdateArticle() {
    this.serviceUser.createArticles(this.articleRequest).subscribe((res) => {
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
        this.getListArticles();
        this.articleRequest = new ArticleEntity();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    });
  }

  onChangeValues() {
    this.validButton = this.validActiveButton();
  }

  validActiveButton(): boolean {
    return (
      this.articleRequest.title?.trim() != '' &&
      this.articleRequest.title != null &&
      this.articleRequest.content?.trim() != '' &&
      this.articleRequest.content != null
    );
  }
}
