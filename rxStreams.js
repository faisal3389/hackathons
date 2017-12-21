var Rx = require('rxjs/Rx');

var obs = Rx.Observable.of(4,7,6, 1, 9, 2,3);



function newObserver() {
  var observer = { arr: [] };



  observer.next = function(o) {
    var boolMap = this.arr.map(x => x > o);
    var index = boolMap.indexOf(true);
    index = index === -1 ? this.arr.length: index;
    this.arr.splice(index, 0, o);
    console.log('index:' + index);
    // this.arr.push(o);
    console.log(o);

    console.log(this.arr);
  }


  observer.complete = function(o) {
    console.log('completed' + this.arr);
  }

  return observer;
}

var observer = newObserver();
obs.subscribe(observer);
