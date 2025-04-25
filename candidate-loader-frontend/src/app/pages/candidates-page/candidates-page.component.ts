import { Component, signal } from '@angular/core';
import { CandidatesFormComponent } from './components/candidates-form/candidates-form.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidatesPageService } from './candidates-page.service';
import { Candidate } from '../../shared/models/candidate.model';
import { CreateCandidateRequest } from '../../shared/models/createCandidateRequest.model';
import { Seniority } from '../../shared/models/seniority.enum';
import { CommonModule } from '@angular/common';

@Component({
      selector: 'app-candidates-page',
      imports: [CommonModule, CandidatesFormComponent, CandidatesListComponent],
      templateUrl: './candidates-page.component.html',
      styleUrl: './candidates-page.component.css'
})
export class CandidatesPageComponent {

      candidates = signal<Candidate[]>([]);
      errorMessage = signal<string | null>(null);

      constructor(private candidatesPageService: CandidatesPageService) { }

      ngOnInit() {
            this.candidatesPageService.getAllCandidates().subscribe({
                  next: (all: Candidate[]) => {
                        this.candidates.set(all);
                  },
                  error: err => {
                        console.error('Error loading candidates:', err);
                        this.errorMessage.set('Failed to load candidates. Please try again later.');
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
                        this.errorMessage.set('Error uploading candidate. Please check your file and try again.');
                  }
            });
      }

}
