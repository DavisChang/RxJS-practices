# RxJS-practices
RxJS Practices

```
npm install
npm run start
```

open on http://localhost:8000

## Examples

Use middleware to manager async / side effects

* AJAX cancellation/composing
* Debounce/throttle/buffer/etc ...
* Drag and Drop
* Web Sockets, Work Workers etc ...


## Promise

* Guaranteed future (?) - Promises cannot be cancelled
  - Changing routes/views
  - Auto-complete
  - User wants you to
* Immutable
* Single value (?) - AJAX
* Caching


## Observables

* Stream of zero, one, or more values
* Over any amount of time
* Cancellable

## RxJS and Redux (redux-observable)

Side effect management for redux, using Epics(actions in, actions out)

* Makes it easier to compose and control complex async tasks, over any amount of time
* You don't need to manage your own Rx subscriptions
* You can use redux tooling

```
const pingPongEpic = (action$, store) =>
  action$.ofType('PING')
    .map(action => ({ type: 'PONG' }));
```

## Auto-complete

```
const autoCompleteEpic = (action$, store) =>
  action$.ofType('Query')
    .debounceTime(500)
    .switchMap(action => 
      ajax('https://api.github.com/search/users?q=' + value)
        .map(payload => ({
          type: 'QUERY_FULFILLED',
          payload,
        }))
        .takeUntil(action$.ofType('CANCEL_QUERY'))
        .catch(payload => ({
          type: 'QUERY_REJECTED',
          error: true,
          payload,
        }))
    );
```




















