import $ from 'jquery';
import { fromEvent, Observable, of, from, interval, range } from 'rxjs';
import { catchError, take, map, throttleTime, pluck } from 'rxjs/operators';

console.log('RxJS Practices!!');

const btn = $('#btn');
const btnStream$ = fromEvent(btn, 'click');
btnStream$.subscribe(
  (event) => {
    console.log('clicked', event);
    alert(JSON.stringify(event));
  },
  (error) => {
    console.log('error');
  },
  () => {
    console.log('completed!');
  }
);

const input = $('#input');
const output = $('#output');
const inputStream$ = fromEvent(input, 'keyup');
inputStream$.subscribe(
  (event) => {
    output.html(`<p>keyup: ${event.target.value}</p>`);
  },
);

const mouseOutput = $('#mouse_output');
const moveStream$ = fromEvent(document, 'mousemove');
moveStream$.subscribe(
  (event) => {
    mouseOutput.html(`mousemove - X: ${event.clientX}, Y: ${event.clientY}`);
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

/* Promose */
const myPromise = new Promise((resolve, reject) => {
  console.log('Create Promise');
  setTimeout(() => {
    resolve('Hello from Promise!');
  }, 3000);
})

const getUserInfo = (username) => {
  return $.ajax({
    url: `https://api.github.com/users/${username}`,
    dataType: 'jsonp',
  }).promise();
}
getUserInfo('DavisChang').then(result => {
  console.log('DavisChang result:', result);
})


fromEvent($('#promise_input'), 'keyup')
.pipe(throttleTime(1000), pluck('target', 'value'))
.subscribe(userName => {
  /* just use from instead of fromPromise */
  from(getUserInfo(userName))
    .subscribe(result => {
      $('#name').text(result.data.name);
      $('#avatar_url').text(result.data.avatar_url);
      $('#repos_url').text(result.data.repos_url);
      $('#public_repos').text(result.data.public_repos);
    });
});


interval(3000).pipe(take(5), map(v => 2 * v))
.subscribe(
  x => {
    console.log(x);
  },
  err => {
    console.log(err);
  },
  () => {
    console.log('interval - completed');
  },
);

range(0, 5)
.subscribe(
  x => {
    console.log(x);
  },
  err => {
    console.log(err);
  },
  () => {
    console.log('range - completed');
  },
);

