import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


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
      candidateForm!: FormGroup;
      selectedFile: File | null = null;

      constructor(private fb: FormBuilder) { }

      ngOnInit(): void {
            this.candidateForm = this.fb.group({
                  name: ['', Validators.required],
                  surname: ['', Validators.required],
                  file: [null, Validators.required]
            });
      }

      onDragOver(evt: DragEvent) {
            evt.preventDefault();
      }

      onDrop(evt: DragEvent) {
            evt.preventDefault();
            const files = evt.dataTransfer?.files;
            if (files && files.length) {
                  this.handleFile(files[0]);
            }
      }


      onFileChange(evt: Event) {
            const input = evt.target as HTMLInputElement;
            if (input.files && input.files.length) {
                  this.handleFile(input.files[0]);
            }
      }

      private handleFile(file: File) { //TODO: validate size and type before
            this.selectedFile = file;
            this.candidateForm.patchValue({ file });
      }

      onSubmit() {
            if (this.candidateForm.invalid) return;

            const formData = new FormData();
            formData.append('name', this.candidateForm.value.name);
            formData.append('surname', this.candidateForm.value.surname);
            formData.append('file', this.selectedFile!);

            console.log('Submit:', formData);
      }

}
