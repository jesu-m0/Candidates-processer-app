import { Component, Input, SimpleChanges } from '@angular/core';
import { Candidate } from '../../../../shared/models/candidate.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Seniority } from '../../../../shared/models/seniority.enum';

@Component({
      selector: 'app-candidates-list',
      imports: [
            CommonModule,
            MatTableModule,
            MatChipsModule,
            MatIconModule
      ],
      templateUrl: './candidates-list.component.html',
      styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent {

      public Seniority = Seniority;

      @Input() candidates: Candidate[] = [];

      displayedColumns: string[] = [
            'name',
            'surname',
            'seniority',
            'experience',
            'availability'
      ];

}
