import { Component, signal } from '@angular/core';
import { CandidatesFormComponent } from './components/candidates-form/candidates-form.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidatesPageService } from './candidates-page.service';
import { Candidate } from '../../shared/models/candidate.model';
import { CreateCandidateRequest } from '../../shared/models/createCandidateRequest.model';
import { Seniority } from '../../shared/models/seniority.enum';

@Component({
      selector: 'app-candidates-page',
      imports: [CandidatesFormComponent, CandidatesListComponent],
      templateUrl: './candidates-page.component.html',
      styleUrl: './candidates-page.component.css'
})
export class CandidatesPageComponent {

      candidates = signal<Candidate[]>([]);

      constructor(private candidatesPageService: CandidatesPageService) { }

      ngOnInit() {
            this.candidatesPageService.getAllCandidates().subscribe({
                  next: (all: Candidate[]) => {
                        this.candidates.set(all);
                  },
                  error: err => {
                        console.error('Error loading candidates:', err);
                        // TODO: mostrar un mensaje de error en la UI
                  }
            });
      }


      onCandidateSubmit(candidate: CreateCandidateRequest) {
            this.candidatesPageService.createCandidate(candidate).subscribe({
                  next: newCandidate => {
                        console.log('Candidate uploaded:', newCandidate);
                        this.candidates.update(prev => [...prev, newCandidate]);
                  },
                  error: err => {
                        console.error('Upload error:', err);
                        //TODO: show the error to the user
                  }
            });
      }

}
