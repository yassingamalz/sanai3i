// otp-input.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent {
  @Output() completed = new EventEmitter<string>();
  
  otp: string[] = ['', '', '', ''];

  onDigitInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    // Only allow numbers
    input.value = value.replace(/[^0-9]/g, '');

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    this.otp[index] = input.value;
    this.checkComplete();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    // Handle backspace
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  private checkComplete(): void {
    if (this.otp.every(digit => digit !== '')) {
      this.completed.emit(this.otp.join(''));
    }
  }
}