import { Injectable, Type, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class DialogRef {
  private readonly _afterClosed = new Subject<any>();
  afterClosed$: Observable<any> = this._afterClosed.asObservable();

  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
    this._afterClosed.complete();
  }
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogComponentRef!: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(component: Type<any>): DialogRef {
    const dialogRef = new DialogRef();
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    
    Object.assign(componentRef.instance, { dialogRef });
    
    this.appRef.attachView(componentRef.hostView);
    
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
    document.body.appendChild(domElem);
    
    this.dialogComponentRef = componentRef;
    
    dialogRef.afterClosed$.subscribe(() => {
      this.removeDialogComponentFromBody();
    });
    
    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}