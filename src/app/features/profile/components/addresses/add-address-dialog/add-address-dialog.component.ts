import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address-dialog',
  template: `
    <div class="dialog-overlay">
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>{{editMode ? 'تعديل العنوان' : 'إضافة عنوان جديد'}}</h2>
          <button class="close-button" (click)="onClose()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form [formGroup]="addressForm" (ngSubmit)="onSubmit()" class="dialog-form">
          <div class="form-group">
            <label>عنوان العنوان</label>
            <input 
              type="text" 
              formControlName="title"
              placeholder="مثال: المنزل، العمل"
            >
          </div>

          <div class="form-group">
            <label>المنطقة</label>
            <select formControlName="area">
              <option value="">اختر المنطقة</option>
              <option *ngFor="let area of areas" [value]="area.id">
                {{area.name}}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>العنوان بالتفصيل</label>
            <textarea 
              formControlName="details"
              rows="3"
              placeholder="اكتب العنوان بالتفصيل..."
            ></textarea>
          </div>

          <div class="form-group">
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                formControlName="isDefault"
              >
              <span class="checkmark"></span>
              <span>تعيين كعنوان افتراضي</span>
            </label>
          </div>

          <div class="dialog-actions">
            <button 
              type="button" 
              class="cancel-button"
              (click)="onClose()"
            >
              إلغاء
            </button>
            <button 
              type="submit" 
              class="submit-button"
              [disabled]="addressForm.invalid"
            >
              {{editMode ? 'حفظ التغييرات' : 'إضافة العنوان'}}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-content {
      width: 90%;
      max-width: 500px;
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
    }

    .dialog-header {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
      }

      .close-button {
        border: none;
        background: transparent;
        color: #6b7280;
        cursor: pointer;
        padding: 0.5rem;
        
        &:hover {
          color: #ef4444;
        }

    .dialog-form {
      padding: 1rem;

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
          input, select, textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            background-color: white;
            color: #1f2937;
            font-size: 0.875rem;

            &:focus {
              outline: none;
              border-color: #ef4444;
              box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
          }

          textarea {
            resize: vertical;
          }
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }
          input {
            width: auto;
          }

          .checkmark {
            width: 20px;
            height: 20px;
            border: 2px solid #ef4444;
            border-radius: 4px;
            position: relative;

            &:after {
              content: "";
              position: absolute;
              display: none;
              left: 6px;
              top: 2px;
              width: 5px;
              height: 10px;
              border: solid white;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
            }
          }

          input:checked + .checkmark {
            background-color: #ef4444;
            
            &:after {
              display: block;
            }
          }
        }
      }

      .dialog-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;

        button {
          flex: 1;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;

          &.cancel-button {
            border: 1px solid #e5e7eb;
            background: white;
            color: #6b7280;

            &:hover {
              background: #f9fafb;
            }
          }

          &.submit-button {
            border: none;
            background: #ef4444;
            color: white;

            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            &:not(:disabled):hover {
              background: #dc2626;
            }
          }
        }
      }
    }
  `]
})
export class AddAddressDialogComponent {
  addressForm: FormGroup;
  editMode = false;

  areas = [
    { id: 1, name: 'المعادي' },
    { id: 2, name: 'مدينة نصر' },
    { id: 3, name: 'المهندسين' },
    { id: 4, name: 'وسط البلد' },
    { id: 5, name: 'الدقي' },
    { id: 6, name: 'الزمالك' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef
  ) {
    this.addressForm = this.fb.group({
      title: ['', Validators.required],
      area: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
      isDefault: [false]
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.dialogRef.close(this.addressForm.value);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}