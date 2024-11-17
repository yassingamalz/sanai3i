import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-settings',
  template: `
    <div class="section-content">
      <div class="notifications-settings">
        <div *ngFor="let setting of notificationSettings" class="setting-item">
          <div class="setting-info">
            <div class="setting-title">{{setting.title}}</div>
            <div class="setting-description">{{setting.description}}</div>
          </div>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              [checked]="setting.enabled"
              (change)="toggleNotification(setting.id)"
            >
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-settings {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #e5e7eb;

      &:last-child {
        border-bottom: none;
      }
    }

    .setting-title {
      font-weight: 500;
      color: #1f2937;
    }

    .setting-description {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 24px;

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e5e7eb;
        transition: .4s;
        border-radius: 24px;

        &:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
      }

      input:checked + .slider {
        background-color: #ef4444;
      }

      input:checked + .slider:before {
        transform: translateX(24px);
      }
    }
  `]
})
export class NotificationsSettingsComponent {
  notificationSettings = [
    {
      id: 1,
      title: 'إشعارات الطلبات',
      description: 'تلقي إشعارات عند وجود طلبات جديدة',
      enabled: true
    },
    {
      id: 2,
      title: 'إشعارات الرسائل',
      description: 'تلقي إشعارات عند وصول رسائل جديدة',
      enabled: true
    },
    {
      id: 3,
      title: 'إشعارات التقييمات',
      description: 'تلقي إشعارات عند وجود تقييمات جديدة',
      enabled: false
    }
  ];

  toggleNotification(id: number) {
    const setting = this.notificationSettings.find(s => s.id === id);
    if (setting) {
      setting.enabled = !setting.enabled;
    }
  }
}
