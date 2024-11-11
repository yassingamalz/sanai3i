import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  services = [
    { id: 1, name: 'كهربائي', icon: '⚡', description: 'تصليح وصيانة كهرباء' },
    { id: 2, name: 'سباك', icon: '🔧', description: 'تصليح مواسير وحنفيات' },
    { id: 3, name: 'نجار', icon: '🪚', description: 'تصليح وصيانة الأثاث' },
    { id: 4, name: 'نقاش', icon: '🎨', description: 'دهانات وديكورات' },
    { id: 5, name: 'تكييف', icon: '❄️', description: 'صيانة وتركيب تكييفات' },
    { id: 6, name: 'تنظيف', icon: '🧹', description: 'خدمات النظافة المنزلية' }
  ];

  topServices = [
    { id: 1, name: 'تصليح تكييف', count: 120, trend: 'up' },
    { id: 2, name: 'سباكة', count: 95, trend: 'up' },
    { id: 3, name: 'كهرباء', count: 85, trend: 'down' }
  ];

  topWorkers = [
    { id: 1, name: 'عم حسن', service: 'كهربائي', rating: 4.9, jobs: 230, image: '/api/placeholder/64/64' },
    { id: 2, name: 'أستاذ محمد', service: 'سباك', rating: 4.8, jobs: 180, image: '/api/placeholder/64/64' },
    { id: 3, name: 'الحاج كريم', service: 'نقاش', rating: 4.7, jobs: 150, image: '/api/placeholder/64/64' }
  ];
}