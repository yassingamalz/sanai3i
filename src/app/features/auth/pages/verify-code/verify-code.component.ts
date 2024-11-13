import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  otp: string[] = ['', '', '', ''];
  isComplete = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      document.getElementById('otp-1')?.focus();
    }, 0);
  }

  goBack() {
    this.router.navigate(['/auth/register']);
  }

  onOtpChange(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Only allow numbers
    input.value = value.replace(/[^0-9]/g, '');

    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    this.otp[index - 1] = input.value;
    this.checkComplete();
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const paste = event.clipboardData?.getData('text');
    if (paste) {
      const numbers = paste.replace(/[^0-9]/g, '').split('');
      numbers.forEach((num, index) => {
        if (index < 4) {
          this.otp[index] = num;
          const input = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
          if (input) input.value = num;
        }
      });
      this.checkComplete();
    }
  }

  checkComplete() {
    this.isComplete = this.otp.every(digit => digit !== '');
  }

  verify() {
    if (this.isComplete) {
      this.router.navigate(['/auth/complete-profile']);
    }
  }

  resendCode() {
    // Implement resend logic
    console.log('Resending code...');
  }
}