# LoOP3R

* Paul J. Barrett
* IT Director Las Vegas Athletic Clubs
* Email:   barrettpaulj@gmail.com 
* Twitter: @codersjunto
* Github:  github.com/paul-j-barrett

## Overview

The files in this repository cover various looping in javascript and attempt to make a small testing framework to demonstrate the performance of various types of loops. 

If you are on a linux box with node installed you can run ./test.sh which will run each of the javascript files and out put the timings. You should disregard the first test of each run because the javascript interpretor is setting up the array and functions so we need to disregard this result.

I had to limit the number of loops in order to keep the for_each_ managable. If you throw out the for_each_ you could increase the 1000000 to 10000000 which will show the differences a little better.

## do while
The basic idea behind do while is that you want to loop until a condition is met.

Some possible examples read lines of a file until you reach EOF.
Read from the database while records exist.

Syntax:

```javascript
  do {
    statements;
  }
  while(condition)
```
Note the braces {} they should be used when you are doing more than one thing/statement.

## while
The while statement is almost exactly the same as do while but you run your condition test first which in my example above of reading from a database or a file might be preferrable. QUESTION: WHY?

Syntax:

```javascript
  while(condition) statement;
  or
  while(condition) { 
    statements;
    }
```

## for
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

## for..in


## Array forEach

## Optimizations
### Array Lengths
You can use something like this. The reason this is not good is that it is accessing the length property of the array over and over again.

```javascript
  for(var i=0; i<myArray.length; i++) dosomething;
```

A slightly better pattern would be

```javascript
  var l=myArray.length;
  for(var i=0; i<l; i++) dosomething;
```

But the optimal form for speed will be something like this. But you will be processing from the end of the array to the beginning.

```javascript
  var k=myArray.length;
  while(k--) dosomething;
```


### Scope

In general the closer your variables are declared to or in your loop the better it will perform. This is caused by how the javascript interpretor chains scope from inner to outer declarations. So your global variables will always be slower than a variable declared in your function.

### Dom Elements
As in the scope or the Array Lengths example you do not want to access the DOM inside your loop if you can help it.
You should fetch the elements before working on them.

```javascript
  var elm=getItembyId('txtBox1');
  do 
    something with elm; 
  while(condition on elm);
```


### Accessing Properites
Avoid the for in loop if at all possible.

## References
http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while

