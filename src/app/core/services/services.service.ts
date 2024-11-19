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
      faIcon: 'fas fa-bolt',
      description: 'خدمات الكهرباء والصيانة',
      totalRequests: 2695,
      trend: 'up',
      trendValue: 12,
      subServices: [
        {
          id: 1,
          mainServiceId: 1,
          name: 'صيانة عامة',
          description: 'فحص وإصلاح الأعطال الكهربائية',
          price: 150,
          estimatedTime: '1-2 ساعات',
          faIcon: 'fas fa-tools'
        },
        {
          id: 2,
          mainServiceId: 1,
          name: 'تركيب أجهزة',
          description: 'تركيب وتوصيل الأجهزة الكهربائية',
          price: 200,
          estimatedTime: '2-3 ساعات',
          faIcon: 'fas fa-plug'
        }
      ]
    },
    {
      id: 2,
      category: 'plumbing',
      name: 'سباكة',
      icon: '🔧',
      faIcon: 'fas fa-wrench',
      description: 'خدمات السباكة والصيانة',
      totalRequests: 65,
      trend: 'up',
      trendValue: 8,
      subServices: [
        {
          id: 3,
          mainServiceId: 2,
          name: 'تصليح تسريبات',
          description: 'كشف وإصلاح تسريبات المياه',
          price: 180,
          estimatedTime: '1-3 ساعات',
          faIcon: 'fas fa-tint'
        },
        {
          id: 4,
          mainServiceId: 2,
          name: 'صيانة الحمامات',
          description: 'إصلاح وتركيب أدوات الحمام',
          price: 220,
          estimatedTime: '2-4 ساعات',
          faIcon: 'fas fa-shower'
        },
        {
          id: 5,
          mainServiceId: 2,
          name: 'تركيب فلاتر',
          description: 'تركيب وصيانة فلاتر المياه',
          price: 250,
          estimatedTime: '1-2 ساعات',
          faIcon: 'fas fa-filter'
        }
      ]
    },
    {
      id: 3,
      category: 'carpentry',
      name: 'نجارة',
      icon: '🪚',
      faIcon: 'fas fa-hammer',
      description: 'خدمات النجارة وإصلاح الأثاث',
      totalRequests: 5158,
      trend: 'down',
      trendValue: 5,
      subServices: [
        {
          id: 6,
          mainServiceId: 3,
          name: 'إصلاح الأثاث',
          description: 'إصلاح وترميم الأثاث المنزلي',
          price: 200,
          estimatedTime: '2-4 ساعات',
          faIcon: 'fas fa-couch'
        },
        {
          id: 7,
          mainServiceId: 3,
          name: 'تركيب أثاث',
          description: 'تجميع وتركيب الأثاث الجديد',
          price: 180,
          estimatedTime: '3-5 ساعات',
          faIcon: 'fas fa-chair'
        }
      ]
    },
    {
      id: 4,
      category: 'painting',
      name: 'دهانات',
      icon: '🎨',
      faIcon: 'fas fa-paint-roller',
      description: 'خدمات الدهان والديكور',
      totalRequests: 55,
      trend: 'up',
      trendValue: 15,
      subServices: [
        {
          id: 8,
          mainServiceId: 4,
          name: 'دهان داخلي',
          description: 'دهان الجدران الداخلية والأسقف',
          price: 300,
          estimatedTime: '4-6 ساعات',
          faIcon: 'fas fa-fill-drip'
        },
        {
          id: 9,
          mainServiceId: 4,
          name: 'دهان خارجي',
          description: 'دهان الواجهات الخارجية',
          price: 400,
          estimatedTime: '6-8 ساعات',
          faIcon: 'fas fa-brush'
        },
        {
          id: 10,
          mainServiceId: 4,
          name: 'ديكورات خاصة',
          description: 'تنفيذ دهانات ديكورية وتأثيرات خاصة',
          price: 500,
          estimatedTime: '4-6 ساعات',
          faIcon: 'fas fa-palette'
        }
      ]
    },
    {
      id: 5,
      category: 'hvac',
      name: 'تكييف',
      icon: '❄️',
      faIcon: 'fas fa-snowflake',
      description: 'صيانة وتركيب التكييف',
      totalRequests: 95,
      trend: 'up',
      trendValue: 20,
      subServices: [
        {
          id: 11,
          mainServiceId: 5,
          name: 'صيانة دورية',
          description: 'فحص وتنظيف وصيانة التكييف',
          price: 150,
          estimatedTime: '1-2 ساعات',
          faIcon: 'fas fa-tools'
        },
        {
          id: 12,
          mainServiceId: 5,
          name: 'تركيب جديد',
          description: 'تركيب وتشغيل تكييف جديد',
          price: 300,
          estimatedTime: '3-4 ساعات',
          faIcon: 'fas fa-plus-circle'
        },
        {
          id: 13,
          mainServiceId: 5,
          name: 'إصلاح أعطال',
          description: 'تشخيص وإصلاح مشاكل التكييف',
          price: 200,
          estimatedTime: '2-3 ساعات',
          faIcon: 'fas fa-wrench'
        }
      ]
    },
    {
      id: 6,
      category: 'cleaning',
      name: 'تنظيف',
      icon: '🧹',
      faIcon: 'fas fa-broom',
      description: 'خدمات التنظيف المنزلي',
      totalRequests: 75,
      trend: 'up',
      trendValue: 10,
      subServices: [
        {
          id: 14,
          mainServiceId: 6,
          name: 'تنظيف شامل',
          description: 'تنظيف شامل للمنزل',
          price: 400,
          estimatedTime: '4-6 ساعات',
          faIcon: 'fas fa-home'
        },
        {
          id: 15,
          mainServiceId: 6,
          name: 'تنظيف السجاد',
          description: 'غسيل وتنظيف السجاد والموكيت',
          price: 200,
          estimatedTime: '2-3 ساعات',
          faIcon: 'fas fa-carpet'
        },
        {
          id: 16,
          mainServiceId: 6,
          name: 'تنظيف الواجهات',
          description: 'تنظيف واجهات المباني والنوافذ',
          price: 300,
          estimatedTime: '3-4 ساعات',
          faIcon: 'fas fa-building'
        }
      ]
    },
    {
      id: 7,
      category: 'appliances',
      name: 'أجهزة منزلية',
      icon: '🔌',
      faIcon: 'fas fa-plug',
      description: 'إصلاح الأجهزة المنزلية',
      totalRequests: 60,
      trend: 'down',
      trendValue: 3,
      subServices: [
        {
          id: 17,
          mainServiceId: 7,
          name: 'إصلاح غسالات',
          description: 'تصليح وصيانة الغسالات',
          price: 200,
          estimatedTime: '1-3 ساعات',
          faIcon: 'fas fa-washer'
        },
        {
          id: 18,
          mainServiceId: 7,
          name: 'إصلاح ثلاجات',
          description: 'صيانة وإصلاح الثلاجات',
          price: 250,
          estimatedTime: '2-3 ساعات',
          faIcon: 'fas fa-refrigerator'
        }
      ]
    },
    {
      id: 8,
      category: 'moving',
      name: 'نقل أثاث',
      icon: '🚛',
      faIcon: 'fas fa-truck',
      description: 'خدمات نقل وتركيب الأثاث',
      totalRequests: 40,
      trend: 'up',
      trendValue: 7,
      subServices: [
        {
          id: 19,
          mainServiceId: 8,
          name: 'نقل منزل كامل',
          description: 'خدمة نقل الأثاث للمنازل',
          price: 800,
          estimatedTime: '4-8 ساعات',
          faIcon: 'fas fa-truck-loading'
        },
        {
          id: 20,
          mainServiceId: 8,
          name: 'نقل قطع محددة',
          description: 'نقل قطع أثاث مختارة',
          price: 300,
          estimatedTime: '2-3 ساعات',
          faIcon: 'fas fa-dolly'
        }
      ]
    },
    {
      id: 9,
      category: 'blacksmith',
      name: 'حدادة',
      icon: '⚒️',
      faIcon: 'fas fa-hammer',
      description: 'أعمال الحدادة والمعادن',
      totalRequests: 35,
      trend: 'up',
      trendValue: 5,
      subServices: [
        {
          id: 21,
          mainServiceId: 9,
          name: 'تصنيع أبواب',
          description: 'تصنيع وتركيب الأبواب المعدنية',
          price: 1200,
          estimatedTime: '2-3 أيام',
          faIcon: 'fas fa-door-closed'
        },
        {
          id: 22,
          mainServiceId: 9,
          name: 'إصلاح وصيانة',
          description: 'إصلاح المشغولات المعدنية',
          price: 200,
          estimatedTime: '2-4 ساعات',
          faIcon: 'fas fa-tools'
        }
      ]
    },
    {
      id: 10,
      category: 'glass',
      name: 'زجاج ومرايا',
      icon: '🪟',
      faIcon: 'fas fa-glass',
      description: 'تركيب وإصلاح الزجاج',
      totalRequests: 30,
      trend: 'down',
      trendValue: 2,
      subServices: [
        {
          id: 23,
          mainServiceId: 10,
          name: 'تركيب مرايا',
          description: 'تركيب وتثبيت المرايا',
          price: 250,
          estimatedTime: '1-2 ساعات',
          faIcon: 'fas fa-mirror'
        },
        {
          id: 24,
          mainServiceId: 10,
          name: 'تغيير زجاج',
          description: 'استبدال الزجاج المكسور',
          price: 300,
          estimatedTime: '2-3 ساعات',
          faIcon: 'fas fa-window-maximize'
        }
      ]
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
  
    const sameCategory = this.services
      .filter(s => s.id !== serviceId && s.category === service.category);
  
    let related = sameCategory;
    if (sameCategory.length < 3) {
      const others = this.services
        .filter(s => s.id !== serviceId && s.category !== service.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 - sameCategory.length);
      related = [...sameCategory, ...others];
    }
  
    return of(related.slice(0, 3)).pipe(delay(300));
  }

  searchServices(query: string): Observable<MainService[]> {
    const searchResults = this.services.filter(service =>
      service.name.includes(query) ||
      service.description.includes(query) ||
      service.subServices?.some(sub =>
        sub.name.includes(query) ||
        sub.description.includes(query)
      )
    );
    return of(searchResults).pipe(delay(300));
  }
}