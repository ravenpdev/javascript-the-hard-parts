# Asynchronous JavaScript and the event loop

#### How many things can JavaScript's thread of execution do at once?

One. JavaScript can only do one thing at a time within its execution thread.

#### What is the purpose of the call stack in JavaScript?

The call stack keeps track of what function is currently running, indicating where in the thread of execution JavaScript current is.

#### What is always at the bottom of the call stack while JavaScript code is running?

The global execution context (or 'global') is always at the bottom of the call stack as long as JavaScript is running.

#### What is the difference between a parameter and an argument in a function?

A parameter is the placeholder variable name in the function definition that receives input, while an argument is the actual value passed into the function when it is called.

#### What happens to an execution context when a function completes and hits a return statement?

The execution context is removed (popped off) from the call stack, and the thread of execution returns to the previous context.

#### Why does the following code not print "hello" before "me first" event with a 0 millisecond delay?

```javascript
function printHello() {
  console.log("hello");
}
setTimeout(printHello, 0);
console.log("me first");
```

Despite the 0 millisecond delay, setTimeout is a web browser feature that operates outside JavaScript's regular execution model. The code demonstrates that JavaScript's single threaded execution model with its thread of execution, memory, and call stack is not sufficient to explain asynchronous behavior. Additional components like the callback queue and event loop determine the actual execution order.

#### Where do web browser features like DOM, timers, storage, and network access exist in relation to the JavaScript engine?

These features exist outside of the JavaScript engine as part of the web browser. They are accessible from JavaScript through APIs (Application Programming Interfaces) but do not run within the JavaScript engine itself.

#### What are the two inputs that setTimeout accetps?

The first input is a callback function (the code to be executed), and the seond input is the number of milliseconds to delay before running that function.

#### When setTimeout is called with a callback and delay time, what happens in the web browser?

A timer is spun up in the web browser with two pieces of information: the duration in milliseconds and a reference to the callback function to run on completion. The timer counts down in the background while JavaScript continues executing other code.

#### In the following code, what will be the order of console output and why?

```javascript
function printHello() {
  console.log("hello");
}
setTimeout(printHello, 1000);
console.log("me first");

// me first
// hello
```

The output will be 'me first' followed by 'hello'. This is because setTimeout offloads the timer to the web browser and JavaScript continues executing synchronously. The console.log('me first') runs immediately, while printHello only executes after the 1000 milliseconds timer completes.

#### When a timer set with setTimeout is given 0 milliseconds as its delay, does it execute immediately by placing its callback directly onto the call stack?

No, even with a 0 milliseconds delay, the callback function does not go directly onto the call stack. Instead, it is placed in the callback queue (also called task queue) where it must wait until all global code has finished executing before it can be added to the call stack.

#### What is the callback queue (or task queue) and what is its purpose in JavaScript's execution model?

The callback queue is an interface between the outside world (like web browser features) and the JavaScript engine. Functions that are ready to execute from asynchronous operations are placed in this queue, where they wait until all global code has finished executing before they can be added to the call stack.

#### What are Web Browser APIs and how do they relate to JavaScript execution?

Web Browser APIs (where API stands for Application Programming Interface) are features provided by the web browser that exist outside of JavaScript's execution environment. They allow JavaScript to interact with browser capabilities like timers, network requests, and DOM manipulation. Functions like setTimeout act as facade functions that interface with these browser features.

#### What is the strict rule that determines when functions in the callback queue can execute?

Functions in the callback queue cannot execute until all global code has finished running and the call stack is empty. This means that even if a callback is ready immediately (like a 0ms timer), it must wait for all synchronous global code to complete before it can be added to the call stack and executed.

#### What happens when setTimout is called with a function and a delay value? Describe the flow between JavaScript and the browser?

My answer:

1. execution thread call setTimeout and the timer kick in browser api
2. the global code continue to execute
3. when the timer is done in the browser it will send the function reference/callback to callback/tasks queue
4. callback/tasks queue check if all code in global is done executing
5. the callback function gets into call stack and execute

Course answer:

When setTimeout is called, it passes the function definition and the delay value to the web browser's timer feature. The browser starts a timer in the background. When the timer completes, the function is placed in the callback queue (not directly on the call stack), where it waits until all global code has finished executing before it can run.

#### What is the primary role of the event loop in JavaScript?

The event loop continously checks three things:

1. Is the call stack empty?
2. Has all global code finished running?
3. Is there something in the callback queue?

It repeats these checks constantly to determine when callback functions can be moved from the callback queue to the call stack for execution.

#### What are the two strict condition that must be met before function can be moves from the callback queue to the call stack?

1. is the call stack emtpy?
2. Has all global code finished running?

Only when both conditions are satisfied will the event loop allow a function from the callback queue to be executed.

#### What are facade functions in JavaScript?

Facade functions are JavaScript functions that look and behave like regular JavaScript functions (called with parentheses, can accept parameters) but actually trigger web browser features or Node background features. They serve as an interface between JavaScript and Browser/Node APIs.

#### Why is the callback queue necessary in JavaScript's asynchronous execution model?

The callback queue is necessary to maintain predictability within JavaScript. Since JavaScript has a single thread of execution, functions triggered by background work need a structured place to wait rather than executing at unpredictable moments. This ensures code runs in a controlled, orderly manner.

#### What was the standard approach for interacting with the web browser from withiin JavaScript before ES6?

Passing callback functions to facade functions like setTimeout. The facade function would set up work in the background, and the callback would be executed when the background work completed.

#### What are two key problems associated with the callback-based approach to handling asynchronous operations?

There's no serious way within JavaScript to track background work that's happening, and 2) Response data from background tasks is only available inside the callback function that runs on completion, which can lead to callback hell.

#### When does a callback function from the callback queue actually execute in JavaScript?

A callback function only executes when the event loop sess that the call stack is clear and all global code has finished running.

#### What are the two prongs of a two-pronged facade function like fetch?

One prong initiates background work in the web browser (such as speaking to the network), and the other prong immediately returns a special object (a promise) in JavaScript that acts as a placeholder for the data.

#### What are the two main things that the fetch function does when called in JavaScript?

The fetch function sets up background work in the web browser (specifically using the network feature to make an HTTP request) and immediately returns a Promise object into JavaScript that acts as placeholder for the data that will come back from that background works.

#### What are the two key properties that exist on a Promise object returned by fetch?

A Promise object has a 'result' property (which starts as undefined and will eventually hold the data return from the background work) and a 'fullfill reactions' property (an empty array that stores functions to run when the data comes back)

#### What happens automatically when the result property of a Promise object is filled in with returned data?

When the result property is filled in with the returned data, JavaScript automatically triggers the execution of any functions stored in the fullfill reactions array, passing the data from the result property as an argument to those functions.m

#### What are the two things that the fetch function creates when it is called?

The fetch function creates two things: 1) A promise object in JavaScript that acts as a placeholder for data, and 2) A network request in the web browser's background that retrieves the data.

#### Why does a promise object persist even when it is created inside a local execution context that has already exited?

The promise object persists because objects in JavaScript are stored in the heap and referenced by pointer. Even if the lcoal context exits and loses the name reference, the web browser maintains a reference to the promise object, which keeps it alive in memory.

#### How does the web browser's background work update the promise object's result property in JavaScript memory?

The network request in the web browser maintains a reference back to the promise object in JavaScript memory. When the background work completes the browser uses this reference to update the result property of the promise object.

#### When a function attached via the then method is automatically triggered, how does it receive the retrieved data?

The function is automatically invoked with the retrieved data passed as an argument (parameter). JavaScript automatically insert the data from the promise's result property as the input to the function without the developer having to explicitly pass it.

#### What are the two main consequences that occur when the fetch function is called in JavaScript?

Fetch has two prongs: 1) It initiates background work in the web browser features (specifically a network request), and 2) It immediately returns a promise object in JavaScript memory that serves as a placeholder for the eventual data.

#### When setTimeout is called with a timer of 0 milliseconds, where does the callback fucntion go fater the timer completers?

Callback/tasks queue waiting for the callstack to be empty and all code executed, this checking is done via the event loop. if both check pass it will be added to the call stack.

#### What type of HTTP request does fetch implicitly send by default, and what information is passed to the network request featrue?

Fetch implicitly sends a GET request by default. The information passed includes the domain and the route/path for the resource being requested.

#### What are the two types of queues used for asynchronous operations in JavaScript?

The callback queue (also known as the task queue) and the microtask queue.

#### Which queue do functions deferred by being attached to promise objects get added to?

Functions attached to promised objects are added to the microtask queue, never to the callback queue

#### When the event loop checks for functions ready to execute, which queue does it prioritize?

The event loop always checks the microtask queue first, giving it priority over the callback queue.

#### What happens when a promise's response data is received and the value property is updated?

When the response data is received, the promise's value property is updated with the data, and any functions attached using 'then' are queued to run automatically in the microtask queue.

#### What are the two key properties on the boject returned by AbortSignal.timeout(), and what are their initial values?

The two properties are _aborted_ and _reason_. Initially, _aborted_ is set to _false_ and _reason_ is set to _undefined_.

#### When using AbortSignal.timeout() with a fetch request, what happens if the timeout completes before the network request finishes?

The network request is aborted and an error (timeout error) is returned instead of the response. This error is passed to the promise's result property, triggering the reject array functions instead of the fulfilled array functions.
