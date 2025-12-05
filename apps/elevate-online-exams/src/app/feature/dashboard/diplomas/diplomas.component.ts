import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../../shared/components/header/service/header.service';
import { DiplomasService } from './service/diplomas.service';
import { MetaData } from '../../../core/model/api.model';
import {
  Subject,
  SubjectsResponse,
} from '../../../feature/dashboard/diplomas/model/diplomas.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-diplomas',
  imports: [RouterLink],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.css',
})
export class DiplomasComponent implements OnInit {
  private headerService = inject(HeaderService);
  private diplomasService = inject(DiplomasService);

  subjects = signal<Subject[]>([]);
  meta = signal<MetaData | undefined>(undefined);
  isLoading = signal(false);
  page = signal(1);

  constructor() {
    this.headerService.header.set({
      title: 'Diplomas',
      icon: `
        <svg width="45" height="45" viewBox="0 0 45 45" class="size-11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.25 18.7502V30.0002M11.25 23.4377V30.0002C11.25 31.492 12.4353 32.9228 14.5451 33.9777C16.6548 35.0326 19.5163 35.6252 22.5 35.6252C25.4837 35.6252 28.3452 35.0326 30.455 33.9777C32.5647 32.9228 33.75 31.492 33.75 30.0002V23.4377M40.1625 20.4789C40.4982 20.3309 40.783 20.0876 40.9818 19.7792C41.1805 19.4708 41.2844 19.1109 41.2806 18.7441C41.2768 18.3772 41.1655 18.0195 40.9604 17.7153C40.7553 17.4111 40.4655 17.1738 40.1269 17.0327L24.0563 9.71268C23.5677 9.48983 23.037 9.37451 22.5 9.37451C21.963 9.37451 21.4323 9.48983 20.9438 9.71268L4.875 17.0252C4.54119 17.1714 4.25722 17.4117 4.05781 17.7167C3.85841 18.0217 3.75221 18.3783 3.75221 18.7427C3.75221 19.1071 3.85841 19.4636 4.05781 19.7687C4.25722 20.0737 4.54119 20.314 4.875 20.4602L20.9438 27.7877C21.4323 28.0105 21.963 28.1259 22.5 28.1259C23.037 28.1259 23.5677 28.0105 24.0563 27.7877L40.1625 20.4789Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
      hasBackButton: false,
    });
  }

  ngOnInit(): void {
    this.getAllSubjects();
  }

  getAllSubjects() {
    this.isLoading.set(true);
    this.diplomasService
      .getAllSubjects(this.page())
      .subscribe((res: SubjectsResponse) => {
        if (this.page() === 1) {
          this.subjects.set(res.subjects);
        } else {
          this.subjects.set([...this.subjects(), ...res.subjects]);
        }
        this.meta.set(res.metadata);
        this.isLoading.set(false);
      });
  }

  loadMore() {
    this.page.set(this.page() + 1);
    this.getAllSubjects();
  }
}
