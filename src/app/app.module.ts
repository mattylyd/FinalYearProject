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


let routes:Routes = [{path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'view', component:ViewComponent}
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
    BlockAddComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
