import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wallet',
  template: `
    <div class="section-content">
      <div class="wallet-content">
        <div class="balance">{{balance}} جنيه</div>
        <div class="balance-label">الرصيد الحالي</div>
        
        <!-- Transaction History -->
        <div class="transactions">
          <h3>سجل المعاملات</h3>
          <div class="transaction-list">
            <div *ngFor="let transaction of transactions" class="transaction-item">
              <div class="transaction-info">
                <span class="transaction-type" [class.credit]="transaction.type === 'credit'">
                  {{transaction.type === 'credit' ? 'إيداع' : 'سحب'}}
                </span>
                <span class="transaction-date">{{transaction.date | date:'shortDate'}}</span>
              </div>
              <div class="transaction-amount" [class.credit]="transaction.type === 'credit'">
                {{transaction.type === 'credit' ? '+' : '-'}}{{transaction.amount}} جنيه
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="wallet-actions">
          <button class="action-button deposit">
            <i class="fas fa-plus"></i>
            إيداع
          </button>
          <button class="action-button withdraw">
            <i class="fas fa-minus"></i>
            سحب
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wallet-content {
      padding: 1rem;
    }

    .transactions {
      margin-top: 1.5rem;
    }

    .transaction-list {
      margin-top: 1rem;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .transaction-type {
      font-weight: 500;
      &.credit { color: #10b981; }
    }

    .transaction-date {
      color: #6b7280;
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }

    .transaction-amount {
      font-weight: 600;
      &.credit { color: #10b981; }
    }

    .wallet-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .action-button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;

      &.deposit {
        background: #10b981;
        color: white;
        &:hover { background: #059669; }
      }

      &.withdraw {
        background: #ef4444;
        color: white;
        &:hover { background: #dc2626; }
      }
    }
  `]
})
export class WalletComponent {
  @Input() balance: number = 0;
  
  transactions = [
    { type: 'credit', amount: 500, date: new Date('2024-03-15') },
    { type: 'debit', amount: 200, date: new Date('2024-03-14') },
    { type: 'credit', amount: 1000, date: new Date('2024-03-10') }
  ];
}