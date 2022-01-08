import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {environment} from "../environments/environment";
import { AngularFireModule} from "@angular/fire/compat";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ViewComponent } from './pages/view/view.component';
import { BlockViewComponent } from './components/block-view/block-view.component';
import {FormsModule} from "@angular/forms";
import { ItemsComponent } from './components/items/items.component';
import {ItemService} from "./services/item.service";
import { NavbarComponent } from './components/navbar/navbar.component';


import { BlockAddComponent } from './components/block-add/block-add.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

import { HotToastModule } from '@ngneat/hot-toast';
import {AuthService} from "./services/auth.service";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {NgLetModule} from "ng-let";
import { FilesComponent } from './pages/files/files.component';


let routes:Routes = [{path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'view', component:ViewComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'reset-password', component:ResetPasswordComponent},
  {path: 'files', component:FilesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ViewComponent,
    BlockViewComponent,
    ItemsComponent,
    ViewComponent,
    NavbarComponent,
    BlockAddComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxExtendedPdfViewerModule,
    AngularFireStorageModule,
    HotToastModule.forRoot(),
    NgLetModule

  ],
  providers: [ItemService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // test:any;
  // constructor(private authService: AuthService) {
  //   let test = authService.isAuthenticated;
  //   console.log(JSON.stringify(test))
  // }

}
