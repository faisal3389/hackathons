var Rx = require('rxjs/Rx');

var obs = Rx.Observable.interval(500).map(x => ((Math.floor(Math.random() * 100))%100 + 100) %100);



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
