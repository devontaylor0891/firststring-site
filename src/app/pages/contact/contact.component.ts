import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
