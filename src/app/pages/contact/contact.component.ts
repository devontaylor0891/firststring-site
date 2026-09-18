import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { COMPANY } from '../../shared/constants';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  readonly email = COMPANY.email;

  submitted = signal(false);
  sending = signal(false);
  error = signal(false);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.sending()) return;

    this.sending.set(true);
    this.error.set(false);

    // onContactMessageCreated picks this up and emails it on. The three fields
    // below are the only ones firestore.rules will accept.
    const { name, email, message } = this.form.value;

    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: (name ?? '').trim(),
        email: (email ?? '').trim(),
        message: (message ?? '').trim(),
      });
      this.submitted.set(true);
      this.form.reset();
    } catch {
      // Never claim the message was sent when it wasn't — the visitor gets the
      // direct email address instead.
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }
}
