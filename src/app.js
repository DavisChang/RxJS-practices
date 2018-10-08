import $ from 'jquery';
import { fromEvent } from 'rxjs';

console.log('RxJS Practices!!');
const btn = $('#btn');

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