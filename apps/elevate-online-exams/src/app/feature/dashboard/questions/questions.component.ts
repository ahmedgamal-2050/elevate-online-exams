import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../../shared/components/header/service/header.service';
import { BreadcrumbService } from '../../../shared/components/breadcrumb/service/breadcrumb.service';
import { QuestionsService } from './service/questions.service';
import { Question, QuestionsResponse } from './model/questions.model';
import { AppRoutes } from '../../../core/enum/app-routes';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private headerService = inject(HeaderService);
  private questionsService = inject(QuestionsService);
  private route = inject(ActivatedRoute);
  private breadcrumbService = inject(BreadcrumbService);

  appRoutes = AppRoutes;

  questions = signal<Question[]>([]);
  examId = signal<string>('');
  examTitle = signal<string>('');
  currentQuestionIndex = signal<number>(0);
  selectedAnswers = signal<Map<string, string>>(new Map());
  isLoading = signal(false);

  constructor() {
    this.examId.set(this.getExamId() as string);
    this.examTitle.set(this.getExamTitle() as string);
    this.updateHeader();
    this.updateBreadcrumb();
  }

  updateHeader() {
    this.headerService.header.set({
      title: `[${this.examTitle()}] Questions`,
      icon: `
        <svg width="45" height="45" viewBox="0 0 45 45" class="size-11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.0438 16.875C17.4846 15.6219 18.3547 14.5652 19.4999 13.8921C20.6452 13.219 21.9917 12.973 23.301 13.1976C24.6102 13.4222 25.7978 14.1029 26.6533 15.1191C27.5088 16.1354 27.977 17.4216 27.975 18.75C27.975 22.5 22.35 24.375 22.35 24.375M22.5 31.875H22.5188M41.25 22.5C41.25 32.8553 32.8553 41.25 22.5 41.25C12.1447 41.25 3.75 32.8553 3.75 22.5C3.75 12.1447 12.1447 3.75 22.5 3.75C32.8553 3.75 41.25 12.1447 41.25 22.5Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
      hasBackButton: true,
    });
  }

  updateBreadcrumb() {
    const newList = [
      {
        link: `${this.getSubjectId()}/${AppRoutes.dashboard.exams}`,
        label: 'Exams',
      },
      {
        link: `${this.getSubjectId()}/${
          AppRoutes.dashboard.exams
        }/${this.examId()}/${AppRoutes.dashboard.questions}`,
        label: this.examTitle(),
      },
      {
        link: `${this.getSubjectId()}/${
          AppRoutes.dashboard.exams
        }/${this.examId()}/${AppRoutes.dashboard.questions}`,
        label: 'Questions',
      },
    ];
    this.breadcrumbService.breadcrumbList().push(...newList);
  }

  getExamId() {
    return this.route.snapshot.paramMap.get('exams_id');
  }

  getExamTitle() {
    return this.route.snapshot.queryParamMap.get('title') || 'Quiz';
  }

  getSubjectId() {
    return this.route.snapshot.paramMap.get('diplomas_id');
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.isLoading.set(true);
    this.questionsService
      .getAllQuestions(this.examId())
      .subscribe((res: QuestionsResponse) => {
        this.questions.set(res.questions);
        this.isLoading.set(false);
      });
  }

  get currentQuestion() {
    return this.questions()[this.currentQuestionIndex()];
  }

  selectAnswer(questionId: string, answerKey: string) {
    const newMap = new Map(this.selectedAnswers());
    newMap.set(questionId, answerKey);
    this.selectedAnswers.set(newMap);
  }

  isAnswerSelected(questionId: string, answerKey: string): boolean {
    return this.selectedAnswers().get(questionId) === answerKey;
  }

  goToPrevious() {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() - 1);
    }
  }

  goToNext() {
    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
    }
  }

  ngOnDestroy(): void {
    this.breadcrumbService.breadcrumbList().splice(1, 3);
  }
}
