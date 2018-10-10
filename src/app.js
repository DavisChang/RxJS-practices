import $ from 'jquery';
import { fromEvent, Observable, of, from, interval, range, merge, concat } from 'rxjs';
import { catchError, take, map, auditTime, pluck, mergeMap } from 'rxjs/operators';

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

/*
* For scroll events you might also want to use auditTime
* but it you only want to do something after a scroll you should use debounceTime.
* Using throttleTime can be dangerous because you may never receive the last event.
 */
fromEvent($('#promise_input'), 'keyup')
.pipe(auditTime(1000), pluck('target', 'value'))
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


interval(1000).pipe(take(5), map(v => 2 * v))
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

const interval1$ = interval(2000).pipe(map(v => `= merge1 =: ${v}`));
const interval2$ = interval(500).pipe(map(v => `===== merge2 =====: ${v}`));
merge(interval1$, interval2$)
.pipe(take(25))
.subscribe(
  x => {
    console.log(x);
  },
  err => {
    console.log(err);
  },
  () => {
    console.log('merge interval - completed');
  },
);

const range1$ = range(0, 5).pipe(map(v => `| range1 |: ${v}`));
const range2$ = range(6, 5).pipe(map(v => `||||| range2 |||||: ${v}`));
concat(range1$, range2$)
.subscribe(
  x => {
    console.log(x);
  },
  err => {
    console.log(err);
  },
  () => {
    console.log('concat range - completed');
  },
);

of('Hello')
.pipe(mergeMap(v => of(`${v} Everyone`)))
.subscribe(x => console.log(x));


