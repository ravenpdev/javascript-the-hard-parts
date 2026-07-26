# Callbacks & Higher Order Functions

- One of the most mistunderstood concepts in JavaScript
- Enables powerful pro-level functions like map, filter, reduce (a core aspect of functional programming)
- Makes our code more declarative and readable

**How was this possible?**

Functions in javascript = first class objects

They can co-exist with and can be treated like any other javascript object

1. Assigned to variables and properties of other objects
2. Passed as arguments into functions
3. Returned as values from functions

**Higher order function** Takes in a function or passes out a function

**callback function** A function we are inserting into the higher-order function

**Pair Programming**

- I know what a string is
- I've created a function before
- I have added an image to a webpage
- I understand what an arrow function is
- I can add a method to an object's prototype
- I understand the event loop in JavaScript
- I can implement reduce from scratch
- I can implement filter
- I can handle collisions in a hash table

#### What programming principle is violated when creating separate functions like tenSquared, nineSquared, eightSquared instead of a single generalized function?

The DRY (Don't Repeat Yourself) principle is violated when creating multiple similar functions instead of generalizing the functionality into a single reusable function.

#### How do parameters help make functions more reusable?

Parameters act as placeholder or labels that allow functions to be generalized. Instead of hardcoding data values parameters let you leave the data to be determined when the function is called, enabling the same function to be reused with different inputs.

#### What is the difference between a parameter and an argument in a function?

A parameter is a placeholder or label defined when creating the function that specifies what data the function will receive. An argument is the actual input data provided when the function is called or invoked.

#### When a function is called in JavaScript, what new structure is created to run the function's code?

A new execution context is created. This execution context has a local memory to store data (available only while inside the function) and a thread that executes the function's code.

#### In a higher-order function that processes an array, what is the purpose of using a parameter like 'instructions' instead of hardcoding specific operations?

The parameter acts as a placeholder that allows the function to remain reusable and flexible. Instead of predefining what operation to perform on each element, the specific functionality can be passed in when the function is called, allowing the same function to perform different operations (like multiplyBy2, add3, divideBy2) depending on what function is passed as an argument.

#### What happens when a function label like 'multipleBy2' is passed as an argument to another function in JavaScript?

The function code itself (the 'F box' or function definition) is passed in, not just the label. Inside the receiving function, it gets assigned a new parameter name (like 'instructions'). The original label 'multiplyBy2' is lost in that context, and the function code is referred to by its new parameter name.

#### When instructions(input) is executed where instructions contains a multiplyBy2 function and input is 1, what happens with execution context?

A brand new execution context is created for the multiplyBy2 function. It's added to the call stack with a local memory containing input = 1. The function executes (1 * 2 = 2), returns 2, and then the execution context is popped off the call stack.

#### What does it mean that functions are "first-class objects" in JavaScript?

Functions in JavaScript are just objects with the additional ability to be called, invoked, or run. They can be treated and coexist with any other object, meaning they ca be assigned to variables, added as properties on other objects, passed as inputs to functions, and return as output values from functions.

#### What is a higher-order function?

A function that takes another function as an input parameter, or return out another function as an output value. There is nothing intrinsically different about them - they don't require special keywords to declare.

#### What is a callback function?

A callback is a function that is passed as a parameter to another function as an input. It can also be called a handler, transformation function, argumetn function, or lambda function. Despite the name suggesting it comes back later, callback functions can run directly inside the function they're passed into.

#### What JavaScript feature results from returning a function as an output value from another function?

Closure. When a function is returned as an output value from another function, it creates a closure, which is describe as one of the most obscure feature of JavaScript.

#### What is the difference between declarative and imperative code style?

Imperative code describes step-by-step how to do something (like picking each element, making changes, using push). Declarative code describes what you want to have happen in a more readable way. Under the hood of any declarative code, there must be imperative code showing how to actually do it.

#### In arrow function syntax, when can you omit the parentheses around the parameters?

You can omit the parentheses around the parameter when the function only has one parameter. If there are multiple parameters or no parameter, parentheses are required.

#### What is an anonymous function function in JavaScript?

An anonymous function is a function that is passed in or used without being given a name, the function code is provided directly where it's needed, such as when passing it as an argument to another function.

#### What distinctive behavior do arrow functions have regarding this 'this' keyword compared to traditional function declarations?

Arrow functions do not have their own 'this' context. Instead they inherit 'this' from the scope in which they are defined (lexical this binding). This is useful when calling functions inside of other functions where you want to preserve the 'this' value of the outer scope rather than getting the global object.

#### What are three built-in JavaScript array methods that mutate (change) the original array?

reverse, splice, sort

#### What are three built-in JavaScript array methods that mutate (change) the original array?

reverse, splice, sort. These methods directly modify the array they are called on rather than returning a new array with the changes.

#### What are the non-mutating alternatives to reverse, splice, and sort that were added to JavaScript?

toReverse, toSplice, toSort. These methods create and return a brand new array with the changes applied, leaving the original array unchanged.
