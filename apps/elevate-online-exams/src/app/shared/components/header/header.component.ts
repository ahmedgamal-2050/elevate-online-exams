import { Component, computed, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderService } from './service/header.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private sanitizer = inject(DomSanitizer);
  private headerService = inject(HeaderService);

  header = computed<{ title: string; icon: SafeHtml; hasBackButton: boolean }>(
    () => {
      return {
        ...this.headerService.header(),
        icon: this.sanitizer.bypassSecurityTrustHtml(
          this.headerService.header().icon
        ),
      };
    }
  );

  goBack() {
    history.back();
  }
}
