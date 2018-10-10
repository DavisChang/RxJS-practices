import $ from 'jquery';
import { fromEvent, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

console.log('RxJS Practices!!');
const btn = $('#btn');
const input = $('#input');
const output = $('#output');

const btnStream$ = fromEvent(btn, 'click');
btnStream$.subscribe(
  (event) => {
    console.log('clicked', event);
  },
  (error) => {
    console.log('error');
  },
  () => {
    console.log('completed!');
  }
);

const inputStream$ = fromEvent(input, 'keyup');
inputStream$.subscribe(
  (event) => {
    output.append(`keyup - ${event.target.value}`);
  },
);

const moveStream$ = fromEvent(document, 'mousemove');
moveStream$.subscribe(
  (event) => {
    output.html(`mousemove - X: ${event.clientX}, Y: ${event.clientY}`);
  },
);


/* Observable */
const source$ = Observable.create(observer => {
  console.log('Observable');
  observer.next('Hello');
  observer.next('World');

  observer.error(new Error('Error: Something went wrong!'));

  setTimeout(() => {
    observer.next('Yet another value');
    observer.complete();
  }, 3000);
});

source$
  .pipe(catchError(val => of(`I caught: ${val}`)))
  .subscribe(
    x => {
      console.log(x);
    },
    err => {
      console.log('err:', err);
    },
    () => {
      console.log('completed');
    }
  );









