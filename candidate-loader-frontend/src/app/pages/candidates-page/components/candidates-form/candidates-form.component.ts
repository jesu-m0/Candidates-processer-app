import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CreateCandidateRequest } from '../../../../shared/models/createCandidateRequest.model';


@Component({
      selector: 'app-candidates-form',
      imports: [
            CommonModule,
            ReactiveFormsModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule
      ],
      templateUrl: './candidates-form.component.html',
      styleUrl: './candidates-form.component.css'
})
export class CandidatesFormComponent {

      @Output() submitCandidate = new EventEmitter<CreateCandidateRequest>();
      @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
      @ViewChild(FormGroupDirective) private formDirective!: FormGroupDirective;



      candidateForm!: FormGroup;
      selectedExcel: File | null = null;

      constructor(private fb: FormBuilder) { }

      ngOnInit(): void {
            this.candidateForm = this.fb.group({
                  name: ['', Validators.required],
                  surname: ['', Validators.required],
                  excel: [null, Validators.required]
            });
      }

      onDragOver(evt: DragEvent) {
            evt.preventDefault();
      }

      onDrop(evt: DragEvent) {
            evt.preventDefault();
            const files = evt.dataTransfer?.files;
            if (files && files.length) {
                  this.handleExcel(files[0]);
            }
      }


      onExcelChange(evt: Event) {
            const input = evt.target as HTMLInputElement;
            if (input.files && input.files.length) {
                  this.handleExcel(input.files[0]);
            }
      }

      private handleExcel(excel: File) {
            this.selectedExcel = excel;
            this.candidateForm.patchValue({ excel });
      }

      onSubmit() {
            if (this.candidateForm.invalid || !this.selectedExcel) {
                  this.candidateForm.markAllAsTouched();
                  return;
            }

            this.submitCandidate.emit({
                  name: this.candidateForm.value.name,
                  surname: this.candidateForm.value.surname,
                  excel: this.selectedExcel
            });

            this.formDirective.resetForm();
            this.selectedExcel = null;
            this.fileInput.nativeElement.value = '';
      }


}
