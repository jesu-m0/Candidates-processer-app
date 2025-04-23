import { Routes } from '@angular/router';
import { CandidatesPageComponent } from './pages/candidates-page/candidates-page.component';

export const routes: Routes = [
  { path: '', component: CandidatesPageComponent },
  { path: '**', redirectTo: '' }
];
