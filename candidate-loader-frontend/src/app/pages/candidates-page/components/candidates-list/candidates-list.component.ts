import { Component, Input } from '@angular/core';
import { Candidate } from '../../../../shared/models/candidate.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates-list',
  imports: [CommonModule],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent {
      
      @Input() candidates: Candidate[] = [];

}
