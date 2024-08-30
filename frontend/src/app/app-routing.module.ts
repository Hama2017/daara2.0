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
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
