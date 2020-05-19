import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TachesComponent } from './taches/taches.component';
import { TacheDetailComponent } from './tache-detail/tache-detail.component';
import { TacheAddComponent } from './tache-add/tache-add.component';
import { TacheEditComponent } from './tache-edit/tache-edit.component';


const routes: Routes = [
  {
    path: 'taches',
    component: TachesComponent,
    data: { title: 'List des taches' }
  },
  {
    path: 'tache-details/:id',
    component: TacheDetailComponent,
    data: { title: 'Details Tache' }
  },
  {
    path: 'tache-add',
    component: TacheAddComponent,
    data: { title: 'Tache ajoutée' }
  },
  {
    path: 'tache-edit/:id',
    component: TacheEditComponent,
    data: { title: 'Tache modifié' }
  },
  { path: '',
    redirectTo: 'taches',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
