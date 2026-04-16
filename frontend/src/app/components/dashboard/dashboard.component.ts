



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TollLogsService } from '../../services/toll-logs.service';
import { TollLog, VehicleType, TollStatus } from '../../models/toll-log.model';
import { NewEntryFormComponent } from '../new-entry-form/new-entry-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NewEntryFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allLogs: TollLog[] = [];
  filteredLogs: TollLog[] = [];

  searchPlate = '';
  filterType: VehicleType | '' = '';
  filterStatus: TollStatus | '' = '';

  isLoading = false;
  errorMessage = '';

  vehicleTypes: Array<VehicleType | ''> = ['', 'Car', 'Motorcycle', 'Truck'];
  statuses: Array<TollStatus | ''> = ['', 'Paid', 'Pending', 'Violation'];

  constructor(private tollLogsService: TollLogsService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  // ✅ FETCH DATA
  fetchLogs(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.tollLogsService.getLogs().subscribe({
      next: (logs) => {
        this.allLogs = logs || [];
        this.applyFilters();
        this.isLoading = false;

        // 🔍 DEBUG (optional)
        console.log('Logs:', this.allLogs);
      },
      error: () => {
        this.errorMessage = 'Could not connect to the server. Make sure backend is running on port 3000.';
        this.isLoading = false;
      }
    });
  }

  // ✅ FILTER LOGIC
  applyFilters(): void {
    this.filteredLogs = this.allLogs.filter(log => {
      const plateMatch = log.licensePlate?.toLowerCase().includes(this.searchPlate.toLowerCase());
      const typeMatch = !this.filterType || log.vehicleType === this.filterType;
      const statusMatch = !this.filterStatus || log.status === this.filterStatus;

      return plateMatch && typeMatch && statusMatch;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchPlate = '';
    this.filterType = '';
    this.filterStatus = '';
    this.applyFilters();
  }

  // ✅ HANDLE NEW ENTRY
  onEntryCreated(log: TollLog): void {
    this.allLogs = [log, ...this.allLogs];
    this.applyFilters();
  }

  // ✅ FIXED: TOTAL REVENUE (MAIN BUG FIX)
  get totalRevenue(): number {
    if (!this.filteredLogs.length) return 0;

    return this.filteredLogs.reduce((sum, log) => {
      return sum + Number(log.tollFee || 0);
    }, 0);
  }

  // ✅ COUNTS
  get paidCount(): number {
    return this.filteredLogs.filter(l => l.status === 'Paid').length;
  }

  get pendingCount(): number {
    return this.filteredLogs.filter(l => l.status === 'Pending').length;
  }

  get violationCount(): number {
    return this.filteredLogs.filter(l => l.status === 'Violation').length;
  }

  // ✅ UI HELPERS
  getStatusClass(status: TollStatus): string {
    return {
      Paid: 'status-paid',
      Pending: 'status-pending',
      Violation: 'status-violation'
    }[status] || '';
  }

  getVehicleIcon(type: VehicleType): string {
    return {
      Car: '🚗',
      Motorcycle: '🏍️',
      Truck: '🚛'
    }[type] || '🚗';
  }

  formatTimestamp(ts: string): string {
    return new Date(ts).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}