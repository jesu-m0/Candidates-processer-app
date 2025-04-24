import { Component } from '@angular/core';
import { CandidatesFormComponent } from './components/candidates-form/candidates-form.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidatesPageService } from './candidates-page.service';
import { Candidate } from '../../shared/models/candidate.model';
import { CreateCandidateRequest } from '../../shared/models/createCandidateRequest.model';

@Component({
      selector: 'app-candidates-page',
      imports: [CandidatesFormComponent, CandidatesListComponent],
      templateUrl: './candidates-page.component.html',
      styleUrl: './candidates-page.component.css'
})
export class CandidatesPageComponent {

      constructor(private candidatesPageService: CandidatesPageService) { }

      onCandidateSubmit(candidate: CreateCandidateRequest) {
            this.candidatesPageService.createCandidate(candidate).subscribe({
                  next: response => {
                        console.log('Candidate uploaded:', response);
                        // TODO: update list or state
                  },
                  error: err => {
                        console.error('Upload error:', err);
                        //TODO: show the error to the user
                  }
            });
      }

}
