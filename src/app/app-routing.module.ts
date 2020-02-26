import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { CreatePetComponent } from './create-pet/create-pet.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pet/list',
    pathMatch: 'full',
  },
  {
    path: 'pet/list',
    component: PetListComponent,
  },
  {
    path: 'pet/create',
    component: CreatePetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
