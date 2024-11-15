// shared/pipes/request-status.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { RequestStatus } from '../interfaces/request.interface';

@Pipe({
  name: 'requestStatus'
})
export class RequestStatusPipe implements PipeTransform {
  transform(status: RequestStatus | undefined | null): string {
    if (!status) return 'قيد الانتظار';

    const statusMap: Record<RequestStatus, string> = {
      pending: 'قيد الانتظار',
      inProgress: 'جاري التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      accepted: 'مقبول',
      draft: 'مسودة'
    };

    return statusMap[status] || statusMap.pending;
  }
}