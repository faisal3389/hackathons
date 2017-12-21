var Rx = require('rxjs/Rx');
var assert = require('assert');

function random() {
  return ((Math.floor(Math.random() * 100))%100 + 100) %100;
}

function createSource() {
  return Rx.Observable.of('Repeat this!').delay(5).repeat(60).map(random);
}

function newObserver() {
  var observer = { arr: [] };

  observer.next = function(o) {
    var boolMap = this.arr.map(x => x > o);
    var index = boolMap.indexOf(true);
    index = index === -1 ? this.arr.length: index;
    this.arr.splice(index, 0, o);
    // console.log('index:' + index);
    // // this.arr.push(o);
    // console.log(o);
    //
    // console.log(this.arr);
  }


  observer.complete = function(o) {
    console.log('completed' + this.arr);
  }

  return observer;
}


var observer = newObserver();

// Create 3 subjects and wire each of them to a random source
var subjects = [1,2,3].map(s => {var sub = new Rx.Subject(); createSource().subscribe(sub); return sub; });

// make the observers subscribe to subjects
var observers = subjects.map(s => { var observer = newObserver() ;s.subscribe(observer); return observer; });

// observer which will listen to all events
var totalObserver = newObserver();

// subject which will merge map all 3 subjects
var totalSubject = Rx.Observable.of(0,1,2).mergeMap(x => subjects[x])

totalSubject.subscribe(totalObserver);

// test case to verify that the 3 individual observers receive same objects as the total observer
totalSubject.subscribe({complete: () => {
  var sum = observers.map(o => o.arr).reduce((merged, o) => merged.concat(o), []).sort((x , y) => x - y);
  console.log('expected joint array    :' + sum);
  console.log('actual joint array      :' + totalObserver.arr);
  assert.deepEqual(totalObserver.arr, sum, 'arrays not matching');
  console.log('arrays are matching');
}})
