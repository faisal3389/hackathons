var Rx = require('rxjs/Rx');

var obs = Rx.Observable.of(1,2,3);


var observer = {};

observer.next = function(o) {
  console.log(o);
}


observer.complete = function(o) {
  console.log('completed');
}

obs.subscribe(observer);
