import { Routes } from '@angular/router';
import { FlowersComponent } from './flowers/flowers.component';
import { PlantcareComponent } from './plantcare/plantcare.component';

export const routes: Routes = [
  { path: 'microservice1', component: FlowersComponent },
  { path: 'microservice2', component: PlantcareComponent },
  { path: '', redirectTo: 'microservice1', pathMatch: 'full' }
];
