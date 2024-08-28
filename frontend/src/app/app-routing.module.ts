import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { AdminComponent } from "./components/admin/admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfilComponent } from "./components/profil/profil.component";
import {CreationDaaraComponent} from "./components/creation-daara/creation-daara.component";
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'ajout-daara', component: CreationDaaraComponent },
      { path: 'edit-profil/:id', component: EditProfilComponent },
      { path: 'user', component: UserComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
