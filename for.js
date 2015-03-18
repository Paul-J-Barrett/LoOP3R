// Setup Timing and test framework
function gettime() {
  return (new Date).getTime();
}

function testMe(proc) {
  var start = gettime();
  proc();
  console.log(gettime()-start);
}

var c=0; //used for test loop

do
  testMe(test);
while(c++<10);

function test() {
var ar = new Array(1000);
for(var x=0;x<1000000; x++)  ar[x%1000]=1;
}

//alternative
function test2() {
  var ar = new Array(1000);
  for(var x=0; x<10000000; x++) {
    ar[x%1000]=1;
  }
}
