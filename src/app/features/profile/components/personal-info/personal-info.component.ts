// personal-info.component.ts
import { group } from '@angular/animations';
import { Component, Input, Output, EventEmitter, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserProfile } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() userData!: UserProfile;
  @Output() updateUserData = new EventEmitter<any>();

  personalInfoForm!: FormGroup;
  currentImage: string | null = null;
  isEditing = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.personalInfoForm = this.fb.group({
      name: [this.userData?.name || '', Validators.required],
      phone: [this.userData?.phone || '', [
        Validators.required, 
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ]],
      email: [this.userData?.email || '', [
        Validators.required, 
        Validators.email
      ]]
    });

    // Disable form initially
    this.personalInfoForm.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.personalInfoForm.enable();
    } else {
      this.personalInfoForm.disable();
      this.resetForm();
    }
  }

  resetForm() {
    if (this.userData) {
      this.personalInfoForm.patchValue({
        name: this.userData.name,
        phone: this.userData.phone,
        email: this.userData.email
      });
    }
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      const updatedData = {
        ...this.personalInfoForm.value,
        profilePicture: this.currentImage || this.userData?.profilePicture
      };
      this.updateUserData.emit(updatedData);
      this.isEditing = false;
      this.personalInfoForm.disable();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.personalInfoForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (control.errors['email']) {
        return 'البريد الإلكتروني غير صالح';
      }
      if (control.errors['pattern']) {
        return 'رقم الهاتف غير صالح';
      }
    }
    return '';
  }
}