import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { MainService, SubService } from '../../shared/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private services: MainService[] = [
    {
      id: 1,
      category: 'electric',
      name: 'كهرباء',
      icon: '⚡',
      description: 'خدمات الكهرباء والصيانة',
      totalRequests: 85,
      trend: 'up',
      trendValue: 12,
      subServices: [
        {
          id: 1,
          mainServiceId: 1,
          name: 'صيانة عامة',
          description: 'فحص وإصلاح الأعطال الكهربائية',
          price: 150,
          estimatedTime: '1-2 ساعات'
        },
        {
          id: 2,
          mainServiceId: 1,
          name: 'تركيب أجهزة',
          description: 'تركيب وتوصيل الأجهزة الكهربائية',
          price: 200,
          estimatedTime: '2-3 ساعات'
        }
      ]
    },
    {
      id: 2,
      category: 'plumbing',
      name: 'سباكة',
      icon: '🔧',
      description: 'خدمات السباكة والصيانة',
      totalRequests: 65,
      trend: 'up',
      trendValue: 8
    },
    {
      id: 3,
      category: 'carpentry',
      name: 'نجارة',
      icon: '🪚',
      description: 'خدمات النجارة وإصلاح الأثاث',
      totalRequests: 45,
      trend: 'down',
      trendValue: 5
    },
    {
      id: 4,
      category: 'painting',
      name: 'دهانات',
      icon: '🎨',
      description: 'خدمات الدهان والديكور',
      totalRequests: 55,
      trend: 'up',
      trendValue: 15
    },
    {
      id: 5,
      category: 'hvac',
      name: 'تكييف',
      icon: '❄️',
      description: 'صيانة وتركيب التكييف',
      totalRequests: 95,
      trend: 'up',
      trendValue: 20
    },
    {
      id: 6,
      category: 'cleaning',
      name: 'تنظيف',
      icon: '🧹',
      description: 'خدمات التنظيف المنزلي',
      totalRequests: 75,
      trend: 'up',
      trendValue: 10
    },
    {
      id: 7,
      category: 'appliances',
      name: 'أجهزة منزلية',
      icon: '🔌',
      description: 'إصلاح الأجهزة المنزلية',
      totalRequests: 60,
      trend: 'down',
      trendValue: 3
    },
    {
      id: 8,
      category: 'moving',
      name: 'نقل أثاث',
      icon: '🚛',
      description: 'خدمات نقل وتركيب الأثاث',
      totalRequests: 40,
      trend: 'up',
      trendValue: 7
    },
    {
      id: 9,
      category: 'blacksmith',
      name: 'حدادة',
      icon: '⚒️',
      description: 'أعمال الحدادة والمعادن',
      totalRequests: 35,
      trend: 'up',
      trendValue: 5
    },
    {
      id: 10,
      category: 'glass',
      name: 'زجاج ومرايا',
      icon: '🪟',
      description: 'تركيب وإصلاح الزجاج',
      totalRequests: 30,
      trend: 'down',
      trendValue: 2
    }
  ];

  constructor() { }

  getAllServices(): Observable<MainService[]> {
    return of(this.services).pipe(delay(500));
  }

  getServiceById(id: number): Observable<MainService | undefined> {
    const service = this.services.find(s => s.id === id);
    return of(service).pipe(delay(300));
  }

  getSubServices(mainServiceId: number): Observable<SubService[]> {
    const service = this.services.find(s => s.id === mainServiceId);
    return of(service?.subServices || []).pipe(delay(300));
  }

  getRelatedServices(serviceId: number): Observable<MainService[]> {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) return of([]);
    
    // Get 2 random services excluding current service
    const related = this.services
      .filter(s => s.id !== serviceId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
      
    return of(related).pipe(delay(300));
  }
}