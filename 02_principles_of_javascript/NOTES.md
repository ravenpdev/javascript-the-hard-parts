# Principles of Javascript

## Execution Content

```javascript
const num = 3;
function multiplyBy2(inputNumber) {
  const result = inputNumber * 2;
  return result;
}

const output = multiplyBy2(num);
const newOutput = multiplyBy2(10);
```

#### What is an execution context in JavaScript?

An execution context is a space or context in which code is executed. It contains a thread of execution that runs through code line by line and a place to stroe data (memory). When a function is called, it creates a new execution context with its own thread of execution and local memory.

#### What is the difference between a parameter and an argument in a function?

A parameter is the label or identifier defined in the function declaration that receives a value. An argument is the actual value that is passed into the function when it is called.

#### What happens to the local memory and execution context when a function finishes execution?

When a function finishes executing, the execution context closes and everything inisde the local memory is forgotten. Only the return value is passed out to be assigned to a variable in the outer scope.

#### What symbol or syntax indicates that a function is being invoked or called rather than just defined?

parentheses () after the function name indicate that a function is being invoked, called, executed, or run.

## Call Stack

- JavaScript keeps track of what function is currently running (where's the thread of execution)
- Run a function - add to call stack
- Finish running the function JS removes it from call stack
- Whatever is top of the call stack that's the function we're currently running

#### How many times is a function defined versus how many times can it be used?

A function is defined once but can be called and reused as many times as there is memory for it.

#### What is the global execution context?

The global execution context is the main execution context created as soon as a JavaScript file starts running. It contains the thread execution and memory for the overall of code.

#### What data structure does JavaScript use to track which function is currently being run?

JavaScript uses the call stack to track which function is currently being run and where to return to when the function finishes executing.

#### What happens to the call stack when a function starts executing and when it finishes?

When a function start executing, it is added to the top of the call stack. When it finishes executing, it is remove (popped off) from the call stack, and JavaScript return to whatever is now on top of the stack.

#### What keyword in JavaScript signals that a function should exit and go back to the previous execution context?

The return keyword signals that JavaScript should exit the current function's execution context and return to whatever is on top of the call stack.
