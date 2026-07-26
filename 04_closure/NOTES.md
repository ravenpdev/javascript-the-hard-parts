# Closure

- Closure is the most esoteric of JavaScript concepts
- Enables powerful pro-level functions like 'one' and 'memoize'
- Many JavaScript design patterns including the module pattern use closure
- Build iterators, handle partial application and maintain state in an asynchronous world

**Functions with memories**

- When our functions get called, we create a live store of data (local memory, variable environment/state) for that function's execution context.
- When the function finishes executing, its local memory is deleted (except the returned value)
- But what if our function could hold on to live data between execution?
- This would let our function definition have an associated cache/persisten memory
- But it all starts with us _returning a function from another function_

**C.O.V.E (close over variable environment)**
**P.L.S.R.D (persistent lexical scope reference data)**
**Backpack**
**Closure**

**Closure gives our functions persisten memories and entirely new toolkit for writing professional code**

_Helper functions_ Everyday professional helper function line 'once' and 'memoize'
_Iterators and generators_ Which use lexical scoping and closure to achieve the most contemporary patterns for handling data in JavaScript
_Module pattern_ Preserve state for the life of an appliation without polluting the global namespace
_Asynchronous JavaScript_ Callbacks and Promises rely on closure to persist state in an asynchronous environment

#### What happens to a function's local memory (variable environment) when the function finished executing?

When a function finishes executing, its local memory is deleted, except for the return value. Each time a function runs, it creates a brand new execution context with fresh temporary local memory, ensuring functions start clean without remembering previous executions.

#### What are two practical utility functions that are enabled by closure?

The 'once' function, which limits how many times a function can be called, and the 'memoize' function, which saves the result of computationally demanding work to avoid redoing it when the function is called again with the same inputs.

#### How does closure relate to asynchronous callbacks in JavaScript?

Closure ensures that asynchronous callbacks have access to the data they need when they are eventually called. For example, when fetching data from the internet (like getting a list of videos), the callback function will have access to necessary data when it runs later, thanks to closure.

#### What is the variable environment (or state) in a function execution context?

The variable environment, also called state, referes to the live store of data (local memory) available inside a function during its execution. It contains the variables and content that are accessible within that function's execution context.

#### What design patterns and features in JavaScript depened on closure?

Closure is fundamental to the module pattern, JavaScript's built-in modules, iterators (function that return successive elements from an array), partial application in functional programming, and JavaScript's asynchronicity functionality.

#### What happens when a function is returned from another function and assigned to a variable in JavaScript?

The function definition itself is returned and stored in the variable. The variable contains the complete function code, not a reference back to outer function. When the outer function completes execution, its execution context is removed from the call stack, and the returned function exists independently in memory.

#### In the following code, what is stored in generatedFunc?

```javascript
function createFunction() {
  function multiplyBy2(num) {
    return num * 2;
  }

  return multiplyBy2;
}

const generatedFunc = createFunction();
```

the generatedFunc now hold the whole function definition formerly known as multiplyBy2, but without any ongoing connection to createFunction. The function can be called directly using generatedFunc() without invoking createFunction again.

#### When generatedFunc(3) is called after being assigned the return value of createFunction(), does JavaScript go back to createFunction to execute the code?

No. JavaScript does not go back to createFunction. The execution of createFunction was a one-time operation that returned the function definition, which was then stored in generatedFunc. When generatedFunc(3) is called, it executes the stored function definition directly from memory without any reference to createFunction.

#### What is the purpose of using a local memory inside a function's execution context?

Local memory inside a function allows variables and functions to be labeled and store within that specific function's scope without polluting the global namespace. This prevents naming conflicts and allows the same variable names to be used in different functions without overriding global variables. It helps modularize code by creating mini-programs with their own local data.

#### What happens to the execution context and local memory of a function after it completes execution and returns a value?

The execution context is removed (popped off) from the call stack, and all labels and data stored in the local memory are forgotten and discarded. Only the returned value persists and is assigned to whatever variable or location was specified when the function was called.

#### What happens to an execution context when a function finishes running?

When a function finishes running, its execution context is closed and it is popped off the call stack. The thread of execution returns to the execution context below it on the call stack.

#### What is the fundamental question that must be answered to understand closure: does a function have access to variables based on where it was defined or where it was called?

A function has access to variables based on where it was defined, not where it was called. This is the essence of closure - the function retains access to the scope in which it was created.

#### How can you test whether a function's access to variables is determined by where it was defined versus where it was called?

Yo ucan test this by returning the function from where it was defined and calling it in a different execution context. If the function still has access to variables from where it was defined (even after that execution context has closed), it proves that definition location, not call location, determines variables access.

#### What is the call stack and how does it track function execution?

The call stack is a data structure that tracks which functions are currently executing. When a function is called, it is added (pushed) to the top of the call stack. When a function finishes executing, it is removed (popped) from the call stack, and execution returns to the function below it.

#### When a function is defined inside another function's execution context and then returned, what gets attached to the returned function besides its definition?

A hidden bond to the surrounding data from the parent execution context gets attached. This attached data is sometimes called a 'backpack' or closure, and it persists even after the parent execution context is removed from the call stack.

#### What happens to a function's execution context and local memory after the function completes execution and is popped off the call stack?

The execution context is deleted and the local memory is cleared. The data does not persis. However, if the function returned another function that was defined in its scope, the return function maintain access to the parent's data through closure.

#### When a function with an attached backpack (closure) is called multiple times, does it get a new local memory on each call, and does the backpack persist?

Yes, each function call creates a brand new execution context with brand new local memory. However, the backpack (closure data) persists across all calls and maintains its state between executions.

#### In the following code, what happens to the counter variable when newFunc is called twice?

```javascript
function outer() {
  let counter = 0;
  function addOne() {
    counter++;
  }

  return addOne;
}
const newFunc = outer();
newFunc();
newFunc();
```

The counter variable is stored in the closure attached to newFunc. On the first call, counter is incremented from 0 to 1. On the secodn call, counter is incremented from 1 to 2. The counter persist between calls because it's stored in the backpack/closure.

#### What is the name of the hidden property that stores the link to the outer scope on a function in JavaScript?

The hidden property is named "\[\[scope\]\]", which is denoted with double square brackets. This is how the JavaScript specification refers to its hidden links.

#### What does 'scope' refer to in JavaScript?

Scope refers to what data is available at any given line of code. It determines which variables and data can be accessed at a particular moment during code execution.

#### What is another term for 'local memory' in JavaScript?

Another term for local memory is the 'variable environment', which refers to the data and variables that are available in the surrounding context at a given moment.

#### What is the formal name for the 'backpack' of data that a function carries with it, based on the concept of a closed environment?

The formal name is 'closed over variable environment' (COVE). This refers to the data the surrounding scope that gets enclosed with the function when it's created.

#### What is lexical scoping and how does it differ from dynamic scoping?

Lexical scoping (also called static scoping) means that a function has acess to data based on hwere it was saved or defined in the code, determined by its position on the page. Dynamic scoping would mean a function only has access to data based on where it was called from, not where it was defined.

#### What is a closure in JavaScript and what hidden property enables it?

A closure is a function that maintains access to variable from its outer (enclosing) function's scope event after that outer function has finished execution. This is enabled by the hidden "\[\[scope\]\]" property that JavaScript automatically attaches to the function, creating a 'backpack' of live data from the execution context where the function was defined.

closure is the collection of data that is attach and assigned to the hidden property "\[\[scope\]\]" where the function is defined.

#### when a function is returned from an outer function and stored in a variable, what happens to the variables from the outer function's execution context?

The returned function carries with it a 'backpack' (closure) containing the variables from the outer function's execution context. These variables persist even after the outer function's execution context is popped off the call stack, allowing the inner function to access and modify them across multiple invocations.

#### If you call an outer function twice and each call returns a new inner function, how do the closures of these two inner functions relate to each other?

Each call to the outer function creates a completely separate execution context with its own set of variables. Therefore, each returned inner function gets its own independent closure (backpack) with separate copies of the variables. Modifying variables through one inner function does not affect the variables accessible to the other inner function.

#### What is the order in which JavaScript searches for a variable when it is referenced inside a function?

First it look for the variable in local memory, if not found then check the backpack/closure if not found again look for the global memory

#### If a variable with the same name exists in both a function's local memory and its closure, which one will be used when the variable is referenced?

The variable in the local memory will always be used because JavaScript checks the lcoal execution context first. Even if the variable exists in the closure (backpack), it will never be accessed as long as a variable wit hthe same name exists locally.
