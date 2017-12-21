var Rx = require('rxjs/Rx');


var values = [];

for (var i =0; i<3;i++) {
  values[i] = [];
  for (var j=0;j<60; j++) {
    values[i].push(random());
  }
  values[i].current = 0;
}

function random() {
  return ((Math.floor(Math.random() * 100))%100 + 100) %100;
}


var obsers = values.map(v => Rx.Observable.interval(500).windowCount(10).map(x => v[x]));
var obs = obsers[0];



var source = Rx.Observable.of('Repeat this!').delay(500).repeat(60).map(random);
var sources = [];
for (var i=0; i < 3; i++) {
  sources.push(createSource());
}


function createSource() {
  return Rx.Observable.of('Repeat this!').delay(500).repeat(60).map(random);
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
sources.forEach(source => source.subscribe(newObserver()));


Rx.Observable.of(0,1,2).mergeMap(x => sources[x]).subscribe(newObserver());
