import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, takeUntil } from 'rxjs/operators';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService, SubService } from '../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit, OnDestroy {
  @Input() services: MainService[] = [];
  @Input() mainServicesMap: Map<number, MainService> = new Map();

  searchQuery: string = '';
  searchResults: SubService[] = [];
  isSearching: boolean = false;
  showResults: boolean = false;
  selectedResultIndex: number = -1;
  
  private searchSubject = new Subject<string>();
  private searchCache: Map<string, SubService[]> = new Map();
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.setupSearchSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showResults = false;
      this.selectedResultIndex = -1;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (!this.showResults) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedResultIndex = Math.min(
          this.selectedResultIndex + 1,
          this.searchResults.length - 1
        );
        this.scrollToSelectedResult();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedResultIndex = Math.max(this.selectedResultIndex - 1, -1);
        this.scrollToSelectedResult();
        break;

      case 'Enter':
        if (this.selectedResultIndex >= 0 && this.searchResults[this.selectedResultIndex]) {
          const result = this.searchResults[this.selectedResultIndex];
          this.navigateToSubService(result.mainServiceId, result.id);
        }
        break;

      case 'Escape':
        this.showResults = false;
        this.selectedResultIndex = -1;
        break;
    }
  }

  private setupSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.selectedResultIndex = -1;
    
    if (this.searchQuery.trim()) {
      this.showResults = true;
      this.searchSubject.next(this.searchQuery);
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  private performSearch(query: string): void {
    if (!query.trim()) {
      this.searchResults = [];
      this.isSearching = false;
      return;
    }

    const cachedResults = this.searchCache.get(query);
    if (cachedResults) {
      this.searchResults = cachedResults;
      return;
    }

    this.isSearching = true;
    const searchLower = query.toLowerCase();

    let results: SubService[] = [];
    this.services.forEach(service => {
      service.subServices?.forEach(subService => {
        if (this.matchesSearch(subService, searchLower)) {
          results.push(subService);
        }
      });
    });

    if (results.length > 0) {
      this.searchResults = results;
      this.searchCache.set(query, results);
      this.isSearching = false;
      return;
    }

    this.servicesService.searchServices(query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSearching = false;
        })
      )
      .subscribe({
        next: (services) => {
          results = services.flatMap(service => 
            (service.subServices || []).filter(subService =>
              this.matchesSearch(subService, searchLower)
            )
          );
          this.searchResults = results;
          this.searchCache.set(query, results);
        },
        error: (error) => {
          console.error('Search error:', error);
          this.searchResults = [];
        }
      });
  }

  private matchesSearch(subService: SubService, searchLower: string): boolean {
    return (
      subService.name.toLowerCase().includes(searchLower) ||
      subService.description.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
    this.selectedResultIndex = -1;
  }

  navigateToSubService(mainServiceId: number, subServiceId: number): void {
    this.router.navigate(['/services', mainServiceId, 'sub-service', subServiceId]);
    this.showResults = false;
    this.clearSearch();
  }

  private scrollToSelectedResult() {
    if (this.selectedResultIndex >= 0) {
      const resultElements = document.querySelectorAll('.search-result-item');
      const selectedElement = resultElements[this.selectedResultIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }

  getMainService(mainServiceId: number): MainService | undefined {
    return this.mainServicesMap.get(mainServiceId);
  }

  trackBySearchResult(index: number, item: SubService): string {
    return `${item.mainServiceId}-${item.id}`;
  }
}