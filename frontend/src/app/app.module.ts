import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HttpClientModule} from "@angular/common/http";
import { ProfilComponent } from './components/profil/profil.component';
import {CreationDaaraComponent} from "./components/creation-daara/creation-daara.component";
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {ListeDaaraComponent} from "./components/liste-daara/liste-daara.component";
import { AjoutTypeDocumentComponent } from "./components/ajout-type-document/ajout-type-document.component";
import { EmailInboxComponent } from './components/email/email-inbox/email-inbox.component';
import { EmailComposeComponent } from './components/email/email-compose/email-compose.component';
import { EmailReadComponent } from './components/email/email-read/email-read.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    ProfilComponent,
    CreationDaaraComponent,
    EditProfilComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
      ListeDaaraComponent,
    AjoutTypeDocumentComponent,
    EmailInboxComponent,
    EmailComposeComponent,
    EmailReadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
