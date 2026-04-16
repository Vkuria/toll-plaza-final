import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TollLogsService } from '../../services/toll-logs.service';
import { CreateTollLogDto, TollLog, VehicleType, VehicleCategory, TollStatus } from '../../models/toll-log.model';

@Component({
  selector: 'app-new-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-entry-form.component.html',
  styleUrls: ['./new-entry-form.component.css']
})
export class NewEntryFormComponent {
  @Output() entryCreated = new EventEmitter<TollLog>();

  licensePlate = '';
  vehicleType: VehicleType = 'Car';
  vehicleCategory: VehicleCategory = 'Regular';
  status: TollStatus = 'Paid';

  vehicleTypes: VehicleType[] = ['Car', 'Motorcycle', 'Truck'];
  vehicleCategories: VehicleCategory[] = ['Regular', 'Official/Government'];
  statuses: TollStatus[] = ['Paid', 'Pending', 'Violation'];

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private tollLogsService: TollLogsService) {}

  get estimatedFee(): number {
    if (this.vehicleCategory === 'Official/Government') return 0;
    const fees: Record<VehicleType, number> = { Car: 5, Motorcycle: 2, Truck: 10 };
    return fees[this.vehicleType];
  }

  onSubmit(): void {
    if (!this.licensePlate.trim()) {
      this.errorMessage = 'License plate is required.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    const dto: CreateTollLogDto = {
      licensePlate: this.licensePlate.trim().toUpperCase(),
      vehicleType: this.vehicleType,
      vehicleCategory: this.vehicleCategory,
      status: this.status
    };

    this.tollLogsService.createLog(dto).subscribe({
      next: (log) => {
        this.successMessage = `Entry created for ${log.licensePlate} — Fee: $${log.tollFee.toFixed(2)}`;
        this.entryCreated.emit(log);
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to create entry. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  resetForm(): void {
    this.licensePlate = '';
    this.vehicleType = 'Car';
    this.vehicleCategory = 'Regular';
    this.status = 'Paid';
  }
}
