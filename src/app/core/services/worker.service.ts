import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Worker } from '../../shared/interfaces/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private readonly DEFAULT_IMAGE = 'assets/worker.webp';
  private readonly STORAGE_KEY = 'favoriteWorkers';
  private favoriteWorkersSubject = new BehaviorSubject<number[]>(this.loadFavorites());
  
  private workers: Worker[] = [
    {
      id: 1,
      name: 'عم حسن',
      service: 'كهربائي',
      category: 'electrician',
      rating: 4.9,
      completedJobs: 230,
      image: this.DEFAULT_IMAGE,
      address: 'المعادي، القاهرة',
      responseRate: 95,
      completionRate: 98,
      position: [30.0444, 31.2357],
      about: 'خبرة ٢٠ عام في مجال الكهرباء، متخصص في صيانة وتركيب جميع الأجهزة الكهربائية',
      services: [
        { id: 1, name: 'صيانة عامة', price: 150, description: 'فحص وإصلاح المشاكل الكهربائية العامة' },
        { id: 2, name: 'تركيب أجهزة', price: 200, description: 'تركيب وتوصيل الأجهزة الكهربائية' }
      ],
      reviews: [{ id: 1, userName: 'أحمد محمود', userImage: this.DEFAULT_IMAGE, rating: 5, text: 'ممتاز جداً وسريع في العمل', date: 'منذ يومين' }],
      totalReviews: 180,
      availability: 'متاح',
      lastOnline: 'منذ 5 دقائق'
    },
    {
      id: 2,
      name: 'محمد السيد',
      service: 'سباك',
      category: 'plumber',
      rating: 4.8,
      completedJobs: 195,
      image: this.DEFAULT_IMAGE,
      address: 'مدينة نصر، القاهرة',
      responseRate: 92,
      completionRate: 96,
      position: [30.0484, 31.2387],
      about: 'متخصص في جميع أعمال السباكة والصيانة المنزلية',
      services: [
        { id: 1, name: 'تصليح تسريبات', price: 120, description: 'كشف وإصلاح تسريبات المياه' },
        { id: 2, name: 'تركيب أدوات صحية', price: 180, description: 'تركيب وصيانة الأدوات الصحية' }
      ],
      reviews: [{ id: 1, userName: 'محمود علي', userImage: this.DEFAULT_IMAGE, rating: 4.8, text: 'عمل ممتاز وسعر معقول', date: 'منذ 3 أيام' }],
      totalReviews: 150,
      availability: 'متاح',
      lastOnline: 'منذ ساعة'
    },
    {
      id: 3,
      name: 'أحمد كمال',
      service: 'نجار',
      category: 'carpenter',
      rating: 4.7,
      completedJobs: 175,
      image: this.DEFAULT_IMAGE,
      address: 'الزمالك، القاهرة',
      responseRate: 90,
      completionRate: 94,
      position: [30.0464, 31.2367],
      about: 'خبرة في تصنيع وإصلاح الأثاث الخشبي بجميع أنواعه',
      services: [
        { id: 1, name: 'تصليح أثاث', price: 200, description: 'إصلاح وصيانة الأثاث الخشبي' },
        { id: 2, name: 'تصنيع أثاث', price: 500, description: 'تصنيع أثاث حسب الطلب' }
      ],
      reviews: [{ id: 1, userName: 'كريم سعيد', userImage: this.DEFAULT_IMAGE, rating: 4.7, text: 'حرفي ممتاز وأمين', date: 'منذ أسبوع' }],
      totalReviews: 140,
      availability: 'متاح',
      lastOnline: 'منذ 30 دقيقة'
    },
    {
      id: 4,
      name: 'مصطفى حسين',
      service: 'نقاش',
      category: 'painter',
      rating: 4.9,
      completedJobs: 210,
      image: this.DEFAULT_IMAGE,
      address: 'المهندسين، الجيزة',
      responseRate: 94,
      completionRate: 97,
      position: [30.0454, 31.2347],
      about: 'متخصص في أعمال الدهانات والديكور',
      services: [
        { id: 1, name: 'دهانات', price: 300, description: 'دهانات حوائط وأسقف' },
        { id: 2, name: 'ورق حائط', price: 250, description: 'تركيب ورق حائط' }
      ],
      reviews: [{ id: 1, userName: 'سامح فؤاد', userImage: this.DEFAULT_IMAGE, rating: 4.9, text: 'شغل نظيف جداً', date: 'منذ 5 أيام' }],
      totalReviews: 160,
      availability: 'مشغول',
      lastOnline: 'منذ 3 ساعات'
    },
    {
      id: 5,
      name: 'كريم عادل',
      service: 'كهربائي',
      category: 'electrician',
      rating: 4.6,
      completedJobs: 165,
      image: this.DEFAULT_IMAGE,
      address: 'الدقي، الجيزة',
      responseRate: 88,
      completionRate: 92,
      position: [30.0434, 31.2327],
      about: 'متخصص في تركيب وصيانة الأجهزة الكهربائية',
      services: [
        { id: 1, name: 'صيانة أجهزة', price: 160, description: 'صيانة الأجهزة المنزلية' },
        { id: 2, name: 'تمديدات كهربائية', price: 220, description: 'تركيب وصيانة التمديدات' }
      ],
      reviews: [{ id: 1, userName: 'هاني محمد', userImage: this.DEFAULT_IMAGE, rating: 4.6, text: 'سريع في التنفيذ', date: 'منذ 4 أيام' }],
      totalReviews: 130,
      availability: 'متاح',
      lastOnline: 'منذ 15 دقيقة'
    },
    {
      id: 6,
      name: 'سمير فتحي',
      service: 'سباك',
      category: 'plumber',
      rating: 4.5,
      completedJobs: 145,
      image: this.DEFAULT_IMAGE,
      address: 'شبرا، القاهرة',
      responseRate: 86,
      completionRate: 90,
      position: [30.0414, 31.2307],
      about: 'خبرة في جميع أعمال السباكة والصيانة',
      services: [
        { id: 1, name: 'صيانة عامة', price: 130, description: 'صيانة شبكات المياه' },
        { id: 2, name: 'تركيبات', price: 170, description: 'تركيب وتغيير المواسير' }
      ],
      reviews: [{ id: 1, userName: 'عمر أحمد', userImage: this.DEFAULT_IMAGE, rating: 4.5, text: 'خدمة جيدة وسعر مناسب', date: 'منذ أسبوع' }],
      totalReviews: 110,
      availability: 'متاح',
      lastOnline: 'منذ ساعتين'
    },
    {
      id: 7,
      name: 'رامي السيد',
      service: 'نجار',
      category: 'carpenter',
      rating: 4.8,
      completedJobs: 185,
      image: this.DEFAULT_IMAGE,
      address: 'العباسية، القاهرة',
      responseRate: 93,
      completionRate: 95,
      position: [30.0404, 31.2297],
      about: 'متخصص في تصنيع وتركيب الأثاث الخشبي',
      services: [
        { id: 1, name: 'تركيب مطابخ', price: 400, description: 'تركيب وصيانة المطابخ' },
        { id: 2, name: 'تصليح أثاث', price: 180, description: 'إصلاح الأثاث المنزلي' }
      ],
      reviews: [{ id: 1, userName: 'حسام علي', userImage: this.DEFAULT_IMAGE, rating: 4.8, text: 'حرفي ماهر وملتزم', date: 'منذ 6 أيام' }],
      totalReviews: 145,
      availability: 'مشغول',
      lastOnline: 'منذ 4 ساعات'
    },
    {
      id: 8,
      name: 'عماد حسن',
      service: 'نقاش',
      category: 'painter',
      rating: 4.7,
      completedJobs: 155,
      image: this.DEFAULT_IMAGE,
      address: 'حلوان، القاهرة',
      responseRate: 89,
      completionRate: 93,
      position: [30.0394, 31.2287],
      about: 'خبرة في أعمال الديكور والدهانات الحديثة',
      services: [
        { id: 1, name: 'دهانات حديثة', price: 280, description: 'دهانات بتقنيات حديثة' },
        { id: 2, name: 'ديكورات', price: 350, description: 'تنفيذ ديكورات متنوعة' }
      ],
      reviews: [{ id: 1, userName: 'نادر محمد', userImage: this.DEFAULT_IMAGE, rating: 4.7, text: 'ذوق راقي في العمل', date: 'منذ 3 أيام' }],
      totalReviews: 120,
      availability: 'متاح',
      lastOnline: 'منذ 45 دقيقة'
    },
    {
      id: 9,
      name: 'وليد عبدالله',
      service: 'كهربائي',
      category: 'electrician',
      rating: 4.4,
      completedJobs: 135,
      image: this.DEFAULT_IMAGE,
      address: 'العجوزة، الجيزة',
      responseRate: 85,
      completionRate: 89,
      position: [30.0384, 31.2277],
      about: 'متخصص في الصيانة الكهربائية المنزلية',
      services: [
        { id: 1, name: 'صيانة منزلية', price: 140, description: 'صيانة كهرباء المنزل' },
        { id: 2, name: 'تركيب إضاءة', price: 190, description: 'تركيب وحدات إضاءة' }
      ],
      reviews: [{ id: 1, userName: 'طارق سعيد', userImage: this.DEFAULT_IMAGE, rating: 4.4, text: 'خدمة جيدة بشكل عام', date: 'منذ أسبوع' }],
      totalReviews: 100,
      availability: 'متاح',
      lastOnline: 'منذ 20 دقيقة'
    },
    {
      id: 10,
      name: 'هشام كامل',
      service: 'سباك',
      category: 'plumber',
      rating: 4.6,
      completedJobs: 160,
      image: this.DEFAULT_IMAGE,
      address: 'المقطم، القاهرة',
      responseRate: 87,
      completionRate: 91,
      position: [30.0374, 31.2267],
      about: 'متخصص في صيانة شبكات المياه والصرف',
      services: [
        { id: 1, name: 'كشف تسريبات', price: 160, description: 'كشف وإصلاح التسريبات' },
        { id: 2, name: 'صيانة شبكات', price: 200, description: 'صيانة شبكات المياه' }
      ],
      reviews: [{ id: 1, userName: 'رامي حسن', userImage: this.DEFAULT_IMAGE, rating: 4.6, text: 'دقيق في العمل ومنظم', date: 'منذ 5 أيام' }],
      totalReviews: 125,
      availability: 'متاح',
      lastOnline: 'منذ ساعة'
    }
  ];

  constructor() {}

  getWorkers(): Observable<Worker[]> {
    return of(this.workers);
  }

  getWorkerById(id: number): Observable<Worker> {
    const worker = this.workers.find(w => w.id === Number(id));
    if (!worker) {
      return throwError(() => new Error('Worker not found'));
    }
    return of(worker).pipe(delay(500));
  }

  getWorkersByCategory(category: string): Observable<Worker[]> {
    return of(this.workers.filter(worker => worker.category === category));
  }

  getTopWorkers(limit: number = 5): Observable<Worker[]> {
    return of(this.workers
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
    );
  }

  searchWorkers(query: string): Observable<Worker[]> {
    const searchTerm = query.toLowerCase();
    return of(this.workers.filter(worker => 
      worker.name.toLowerCase().includes(searchTerm) ||
      worker.service.toLowerCase().includes(searchTerm) ||
      worker.address.toLowerCase().includes(searchTerm)
    ));
  }

  private calculateDistance(coord1: [number, number], coord2: [number, number]): number {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  toggleFavorite(workerId: number): Observable<boolean> {
    const favorites = this.favoriteWorkersSubject.value;
    const isFavorite = favorites.includes(workerId);
    
    const newFavorites = isFavorite 
      ? favorites.filter(id => id !== workerId)
      : [...favorites, workerId];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newFavorites));
    this.favoriteWorkersSubject.next(newFavorites);
    
    return of(!isFavorite);
  }

  private loadFavorites(): number[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private isWorkerFavorite(workerId: number): boolean {
    return this.favoriteWorkersSubject.value.includes(workerId);
  }
}