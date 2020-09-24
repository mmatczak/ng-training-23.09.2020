import {BookDetailsComponent} from './book-details.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Book} from '../book';

describe('BookDetailsComponent', () => {
  let testBook: Book;

  beforeEach(() => {
    testBook = {
      id: 1,
      author: 'Test Author',
      title: 'Test Title'
    };
  });

  describe('(class)', () => {
    it('fires an event on book update', () => {
      // given
      const updatedAuthor = 'Updated Author';
      const updatedTitle = 'Updated Title';
      const eventMock: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector: jasmine.createSpy('querySelector').and.callFake(
            (selector: string) => ({
              value: selector === '#author' ? updatedAuthor : updatedTitle
            }))
        }
      };
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookUpdate.subscribe(updatedBook => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(eventMock.target.querySelector).toHaveBeenCalled();
        expect(updatedBook.id).toBe(1);
        expect(updatedBook.author).toBe(updatedAuthor);
        expect(updatedBook.title).toBe(updatedTitle);
      });
      // when
      component.notifyOnBookUpdate(eventMock);
    });
  });

  describe('(DOM)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent<BookDetailsComponent>(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('notifies on book update when button clicked', () => {
      // given
      component.book = testBook;
      component.bookUpdate.subscribe(updatedBook => {
        // then
        expect(updatedBook.id).toBe(1);
        expect(updatedBook.author).toBe('Test Author');
        expect(updatedBook.title).toBe('Test Title');
      });
      fixture.detectChanges();
      // when
      const buttonElement = element.querySelector('button');
      buttonElement.click();
    });
  });
});
