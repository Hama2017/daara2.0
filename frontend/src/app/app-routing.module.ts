import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { AdminComponent } from "./components/admin/admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfilComponent } from "./components/profil/profil.component";
import {CreationDaaraComponent} from "./components/creation-daara/creation-daara.component";
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {ListeDaaraComponent} from "./components/liste-daara/liste-daara.component";
import { AjoutTypeDocumentComponent } from "./components/ajout-type-document/ajout-type-document.component";
import {ListeTypeDocumentComponent} from "./components/liste-type-document/liste-type-document.component";
import {EditTypeDocumentComponent} from "./components/edit-type-document/edit-type-document.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'ajout-daara', component: CreationDaaraComponent },
      { path: 'liste-daaras', component: ListeDaaraComponent },
      { path: 'edit-profil/:id', component: EditProfilComponent },
      { path: 'user', component: UserComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'ajout-typedocument', component: AjoutTypeDocumentComponent },
      { path: 'liste-typedocument', component: ListeTypeDocumentComponent },
      { path: 'edit-typedocument/:id', component: EditTypeDocumentComponent },

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
