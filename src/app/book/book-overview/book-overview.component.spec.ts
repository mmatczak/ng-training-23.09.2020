import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOverviewComponent } from './book-overview.component';
import {BookDetailsComponent} from '../book-details/book-details.component';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [ BookOverviewComponent, BookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it ('renders book rows', () => {
    const rowElements = element.querySelectorAll<HTMLTableRowElement>('table > tbody > tr');
    expect(rowElements.length).toBe(3);
  });

  it ('renders book details on row click', () => {
    // given
    const rowElements = element.querySelectorAll<HTMLTableRowElement>('table > tbody > tr');
    const firstRow = rowElements[0];
    // when
    firstRow.click();
    fixture.detectChanges();
    // then
    const bookDetailsElement = element.querySelector('app-book-details');
    expect(bookDetailsElement).toBeDefined();
    const authorInput = bookDetailsElement.querySelector<HTMLInputElement>('#author');
    expect(bookDetailsElement).toBeDefined();
    expect(authorInput.value).toBe(component.selectedBook.author);
  });
});
