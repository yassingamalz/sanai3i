import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { RequestDataService } from '../../../../core/services/request.service';
import { RequestViewModel } from '../../../../shared/interfaces/request-view.interface';
import { RequestStatus } from '../../../../shared/interfaces/request.interface';
import { WorkerService } from '../../../../core/services/worker.service';


type ExtendedStatus = RequestStatus | 'all';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentStatus: ExtendedStatus = 'inProgress';
  proposals: RequestViewModel[] = [];
  
  get orderStatuses() {
    const allStatus = {
      id: 'all' as ExtendedStatus,
      label: 'الكل',
      icon: 'fas fa-list',
      count: this.getTotalCount()
    };

    const statusEntries = Object.entries(this.requestService.statusConfig).map(([id, config]) => ({
      id: id as RequestStatus,
      label: config.label,
      icon: `fas fa-${config.icon}`,
      count: this.getStatusCount(id as RequestStatus)
    }));

    return [allStatus, ...statusEntries];
  }

  constructor(
    private authService: AuthService,
    private requestService: RequestDataService,
    private workerService: WorkerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadRequests() {
    const requests$ = this.requestService.getRequests(
      this.currentStatus === 'all' ? undefined : this.currentStatus
    );

    const workers$ = this.workerService.getWorkers();

    combineLatest([requests$, workers$])
      .pipe(
        map(([requests, workers]) => {
          return requests.map(request => {
            const worker = request.workerId 
              ? workers.find(w => w.id === request.workerId)
              : undefined;

            return {
              ...request,
              worker: worker ? {
                name: worker.name,
                rating: worker.rating,
                completedJobs: worker.completedJobs,
                image: worker.image
              } : undefined,
              distance: worker ? this.calculateDistance(
                request.location.coordinates,
                worker.position
              ) : undefined
            } as RequestViewModel;
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(requestViewModels => {
        this.proposals = requestViewModels;
      });
  }

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  get pageTitle() {
    return this.userType === 'worker' ? 'خدماتي' : 'طلباتي';
  }

  get actionButtonLabel() {
    return this.userType === 'worker' ? 'قبول الطلب' : 'تفاصيل الطلب';
  }

  setStatus(status: ExtendedStatus) {
    this.currentStatus = status;
    this.loadRequests();
  }

  getStatusClass(status: RequestStatus): string {
    const colorClasses = {
      pending: 'bg-yellow-50 text-yellow-700',
      inProgress: 'bg-blue-50 text-blue-700',
      completed: 'bg-green-50 text-green-700',
      cancelled: 'bg-red-50 text-red-700',
      accepted: 'bg-indigo-50 text-indigo-700',
      draft: 'bg-gray-50 text-gray-700'
    };
    
    return `status-banner ${colorClasses[status]}`;
  }

  getStatusIcon(status: RequestStatus): string {
    const config = this.requestService.getStatusDetails(status);
    const iconClasses = {
      pending: 'text-yellow-500',
      inProgress: 'text-blue-500',
      completed: 'text-green-500',
      cancelled: 'text-red-500',
      accepted: 'text-indigo-500',
      draft: 'text-gray-500'
    };
    
    return `fas fa-${config.icon} ${iconClasses[status]}`;
  }

  getStatusLabel(status: RequestStatus): string {
    return this.requestService.getStatusDetails(status).label;
  }

  getActionButtonIcon(): string {
    return this.userType === 'worker' ? 'fas fa-check' : 'fas fa-info-circle';
  }

  openNewRequest() {
    this.router.navigate(['/requests/new-request']);
  }

  openFilters() {
    // Implement filters logic
  }

  handleAction(proposal: RequestViewModel) {
    if (this.userType === 'worker') {
      this.acceptRequest(proposal);
    } else {
      this.viewRequestDetails(proposal);
    }
  }

  private acceptRequest(proposal: RequestViewModel) {
    console.log('Accepting request:', proposal.id);
  }

  private viewRequestDetails(proposal: RequestViewModel) {
    this.router.navigate(['requests',proposal.id]);
  }

  private getTotalCount(): number {
    return this.proposals.length;
  }

  private getStatusCount(status: RequestStatus): number {
    return this.proposals.filter(p => p.status === status).length;
  }

  private calculateDistance(coord1: [number, number], coord2: [number, number]): string {
    const R = 6371;
    const dLat = this.deg2rad(coord2[0] - coord1[0]);
    const dLon = this.deg2rad(coord2[1] - coord1[1]);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(coord1[0])) * Math.cos(this.deg2rad(coord2[0])) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 
      ? `${Math.round(distance * 1000)} م` 
      : `${distance.toFixed(1)} كم`;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}