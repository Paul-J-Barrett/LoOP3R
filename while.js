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

var x=0; 
var ar = new Array(1000);
while(x++<=1000000) ar[x%1000]=1;
}
