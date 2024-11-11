import { Component } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent {
  categories = [
    'كهرباء',
    'سباكة',
    'نجارة',
    'تكييف',
    'دهانات',
    'تنظيف'
  ];
  selectedCategory = 'كهرباء';
  currentAddress = 'المعادي، القاهرة';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  clearAddress() {
    this.currentAddress = '';
  }
}