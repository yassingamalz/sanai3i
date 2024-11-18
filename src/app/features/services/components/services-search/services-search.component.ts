// services-search.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-services-search',
  templateUrl: './services-search.component.html',
  styleUrls: ['./services-search.component.scss']
})
export class ServicesSearchComponent {
  @Input() searchQuery: string = '';
  @Output() search = new EventEmitter<string>();
  
  private searchSubject = new Subject<string>();
  
  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.search.emit(query);
    });
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}