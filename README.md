# LoOP3R

* Paul J. Barrett
* IT Director Las Vegas Athletic Clubs
* Twitter: @codersjunto
* Github:  github.com/paul-j-barrett

## Overview

The files in this repository cover various looping statements, techniques, and optimizations in Javascript and I will make a small testing framework to demonstrate the performance of various types of loops and patterns. 

If you are on a Linux box with node installed you can run ./test.sh which will run each of the Javascript files and output the timings. You should disregard the first test of each run because the Javascript interpretor is setting up the array and functions. This also explains why I run each test 10 times. You can also take each individual js file and run it in a browser inspector.

I had to limit the number of loops in order to keep the foreach and forin test code manageable. If you throw out the foreach/forin you could increase the 1000000 to 10000000 which will show the differences in the other looping examples.

## Loop Statements
### do while

The basic idea behind do while is that you want to loop until a condition is met. Also you want to do the statements at least once no matter what.

Some possible examples: Read lines of a file until you reach EOF.
Read from the database while records exist.

Syntax:

```javascript
  do {
    statements;
  }
  while(condition)
```
Note the braces {} they should be used when you are doing more than one thing/statement.

### while

The while statement is almost exactly the same as do while but you run your condition test first which in my example above of reading from a database or a file might be preferable. QUESTION: WHY?

Syntax:

```javascript
  while(condition) statement;
  or
  while(condition) { 
    statements;
    }
```
#### Infinite Loop (CAUTION)

while(true) {};
 or
while(1){};

#### No LOOP

while(false) {}; 
or
while(0) {};

### for

The for statement is generally used when you have a predefined number of times you wish to do the loop. It is also frequently nested which is more common than nesting while or do..while loops.
You might use for loops to iterate over an array or an object. You would use nested for loops for a multi dimensional array.

Syntax:

```javascript
  for(setup,condition,incretment) { statements; }
```

Example:

```javascript
  for(var i=0;i<100;i++);
```

You can also do multiple setup or increments as in this example.
  
```javascript
  for(var i=0,c=100;i<c;c-=10,i++) console.log(i);
```

What does the above display.

#### CAUTION

You need to be careful that you don't create an infinite loop accidentally.

```javascript
for(i=0;i<10;i++) {i=0;}
```

#### BREAK

You can break out of your loop if a certain condition is met.
```javascript
for(i=0;i<10;i++) {
  if(i=5) break;
  console.log(i); // 0 1 2 3 4
}
```

### for..in

With the for in loop we decalare a variable to act upon for each element in an array.

Example:

```javascript
function test() {
var ar = new Array(1000000);
for( i in ar) {
  i =1;
  }
}
```
Warning: for..in is depricated and being replaced with for..of see mozilla reference for more information and examples.

### for..Each

With this loop you iterate through an array and call a function to be operated on each element.

Example:
```javascript
function changeit(i) { i=1 };  //function that will change the element

function test() {
var ar = new Array(1000000);
ar.forEach(changeit); //iterates through the elements of the array
}
```


## Optimizations
### Array Lengths

You might have done something like this next example. The reason this is not optimal is that it is accessing the length property of the array over and over again which slows things down each time it checks to see if the condition is met.

#### Shame
```javascript
  for(var i=0; i<myArray.length; i++) dosomething;
```

#### Better
A slightly better pattern would be

```javascript
  var l=myArray.length;
  for(var i=0; i<l; i++) dosomething;
```

#### Optimal
But the optimal form for speed will be something like this. But you will be processing from the end of the array to the beginning.

```javascript
  var k=myArray.length;
  while(k--) dosomething;
```

#### Supper
Super optimization Duff's Device created by programmer Tom Duff of Lucas Films was to unroll the loop in C, and was later converted to javascript by Jeff Greenberg (see references at end)

```javascript
var iterations = Math.ceil(values.length / 8);
var startAt = values.length % 8;
var i = 0;

do {
    switch(startAt){
        case 0: process(values[i++]);
        case 7: process(values[i++]);
        case 6: process(values[i++]);
        case 5: process(values[i++]);
        case 4: process(values[i++]);
        case 3: process(values[i++]);
        case 2: process(values[i++]);
        case 1: process(values[i++]);
    }
    startAt = 0;
} while (--iterations > 0);
```

### Scope

In general the closer your variables are declared to or in your loop the better it will perform. This is caused by how the Javascript interpretor chains scope from inner to outer declarations. So your global variables will always be slower than a variable declared in your function.

### Dom Elements
As in the scope or the Array Lengths example you do not want to access the DOM inside your loop if you can help it.
You should fetch the elements before working on them.

```javascript
  var elm=getItembyId('txtBox1');
  do 
    something with elm; 
  while(condition on elm);
```


### Accessing Properties
Avoid the for in loop if at all possible.

## References
Nicholas C. Zakas - http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html

Jeff Greenberg - http://home.earthlink.net/~kendrasg/info/js_opt/

Javascript Statements - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while

