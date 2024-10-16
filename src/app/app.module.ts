import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration,} from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/home/home.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './ui/login/login.component';
import { UserComponent } from './ui/user/user.component';
import { RegisterComponent } from './ui/register/register.component';
import { ArticlesComponent } from './ui/articles/articles.component';
import { PerfilComponent } from './ui/perfil/perfil.component';
import { IsEmptyComponent } from './ui/is-empty/is-empty.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    ArticlesComponent,
    PerfilComponent,
    IsEmptyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
