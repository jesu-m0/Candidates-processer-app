import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../../shared/models/candidate.model';
import { CreateCandidateRequest } from '../../shared/models/createCandidateRequest.model';


@Injectable({
      providedIn: 'root'
})
export class CandidatesPageService {

      private readonly baseUrl = `${environment.apiUrl}/candidates`;

      constructor(private http: HttpClient) { }

      createCandidate(candidate: CreateCandidateRequest): Observable<Candidate> {
            const formData = new FormData();
            formData.append('name', candidate.name);
            formData.append('surname', candidate.surname);
            formData.append('file', candidate.excel);

            return this.http.post<any>(`${this.baseUrl}/create`, formData);
      }

}
