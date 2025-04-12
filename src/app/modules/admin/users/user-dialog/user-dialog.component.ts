import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { CommonModule, NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-user-dialog',
  imports: [ReactiveFormsModule ,],
  templateUrl: './user-dialog.component.html',
  styles: ``,
  standalone:true
})
export class UserDialogComponent {
  userForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['PATIENT', Validators.required],
      profileDetails: this.fb.group({
        gender: ['', Validators.required],
        dateOfBirth: [''],
        address: ['']
      })
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      console.log('User added:', this.userForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
