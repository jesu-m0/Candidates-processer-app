import { Component } from '@angular/core';
import { CandidatesFormComponent } from './components/candidates-form/candidates-form.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';

@Component({
  selector: 'app-candidates-page',
  imports: [CandidatesFormComponent, CandidatesListComponent],
  templateUrl: './candidates-page.component.html',
  styleUrl: './candidates-page.component.css'
})
export class CandidatesPageComponent {

}
