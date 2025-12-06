import { Component, computed, inject } from '@angular/core';
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

  breadcrumbList = computed<Breadcrumb[]>(() =>
    this.breadcrumbService.breadcrumbList()
  );
}
