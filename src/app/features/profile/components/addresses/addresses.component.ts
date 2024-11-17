import { Component, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { ProfileService } from '../../services/profile.service';
import { Address } from '../../interfaces/profile.interface';
import { AddAddressDialogComponent } from './add-address-dialog/add-address-dialog.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {
  @Input() addresses: Address[] = [];

  constructor(
    private dialogService: DialogService,
    private profileService: ProfileService
  ) {}

  onAddAddress(): void {
    const dialogRef = this.dialogService.open(AddAddressDialogComponent);
    
    dialogRef.afterClosed$.subscribe(result => {
      if (result) {
        this.profileService.addAddress(result).subscribe({
          next: (newAddress) => {
            this.addresses = [...this.addresses, newAddress];
          },
          error: (error) => console.error('Error adding address:', error)
        });
      }
    });
  }

  onSetDefault(address: Address, event: Event): void {
    event.stopPropagation();
    this.profileService.setDefaultAddress(address.id).subscribe({
      next: () => {
        this.addresses = this.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === address.id
        }));
      },
      error: (error) => console.error('Error setting default address:', error)
    });
  }

  onDelete(address: Address, event: Event): void {
    event.stopPropagation();
    if (confirm('هل أنت متأكد من حذف هذا العنوان؟')) {
      this.profileService.deleteAddress(address.id).subscribe({
        next: () => {
          this.addresses = this.addresses.filter(addr => addr.id !== address.id);
        },
        error: (error) => console.error('Error deleting address:', error)
      });
    }
  }

  onSelectAddress(address: Address): void {
    // Handle address selection if needed
    console.log('Selected address:', address);
  }
}