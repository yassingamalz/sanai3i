// otp-input.component.ts
import { Component, EventEmitter, Output, forwardRef, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  template: `
    <div class="otp-container" dir="ltr">
      <input #otpInput
             type="text"
             maxlength="1"
             class="otp-input"
             (input)="onInputChange($event, 0)"
             (keydown)="onKeyDown($event, 0)"
             inputmode="numeric">
      <input #otpInput
             type="text"
             maxlength="1"
             class="otp-input"
             (input)="onInputChange($event, 1)"
             (keydown)="onKeyDown($event, 1)"
             inputmode="numeric">
      <input #otpInput
             type="text"
             maxlength="1"
             class="otp-input"
             (input)="onInputChange($event, 2)"
             (keydown)="onKeyDown($event, 2)"
             inputmode="numeric">
      <input #otpInput
             type="text"
             maxlength="1"
             class="otp-input"
             (input)="onInputChange($event, 3)"
             (keydown)="onKeyDown($event, 3)"
             inputmode="numeric">
      <input #otpInput
             type="text"
             maxlength="1"
             class="otp-input"
             (input)="onInputChange($event, 4)"
             (keydown)="onKeyDown($event, 4)"
             inputmode="numeric">
      <input #otpInput
             type="text"
             maxlength="1"
             class="otp-input"
             (input)="onInputChange($event, 5)"
             (keydown)="onKeyDown($event, 5)"
             inputmode="numeric">
    </div>
  `,
  styleUrls: ['./otp-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    }
  ]
})
export class OtpInputComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  @Output() completed = new EventEmitter<string>();

  digits: string[] = ['', '', '', '', '', ''];
  disabled = false;

  onChange = (value: string) => {};
  onTouch = () => {};

  ngAfterViewInit() {
    setTimeout(() => {
      this.otpInputs.first?.nativeElement.focus();
    });
  }

  writeValue(value: any): void {
    if (!value) {
      this.digits = ['', '', '', '', '', ''];
      this.otpInputs?.forEach(input => input.nativeElement.value = '');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.otpInputs?.forEach(input => {
      input.nativeElement.disabled = isDisabled;
    });
  }

  onInputChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');

    // Always take only the last digit
    if (value.length >= 1) {
      value = value.slice(-1);
      this.digits[index] = value;
      input.value = value;

      if (index < 5) {
        this.otpInputs.get(index + 1)?.nativeElement.focus();
      }
    } else {
      this.digits[index] = '';
    }

    const otpValue = this.digits.join('');
    this.onChange(otpValue);
    
    if (this.digits.every(digit => digit !== '')) {
      this.completed.emit(otpValue);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      
      if (this.digits[index]) {
        this.digits[index] = '';
        input.value = '';
      } else if (index > 0) {
        const prevInput = this.otpInputs.get(index - 1)?.nativeElement;
        if (prevInput) {
          this.digits[index - 1] = '';
          prevInput.value = '';
          prevInput.focus();
        }
      }
      
      this.onChange(this.digits.join(''));
    }
  }
}