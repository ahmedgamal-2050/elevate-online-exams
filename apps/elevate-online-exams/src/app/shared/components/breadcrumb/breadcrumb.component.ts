import { Component, inject, signal } from '@angular/core';
import { BreadcrumbService } from './service/breadcrumb.service';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);

  breadcrumbList = signal<Breadcrumb[]>(
    this.breadcrumbService.breadcrumbList()
  );
}
