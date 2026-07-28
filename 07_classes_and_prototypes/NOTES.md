# Classes & Prototypes

**Objects - store functions with heir associated data!**

This is the principle of encapsulation - and it's going to transform how we can 'reason about' our code.

```javascript
const user1 = {
  name: "Ari",
  score: 3,
  increment: function () {
    user1.score++;
  },
};
user1.increment();
```

**Creating user2 using dot notation**

Declare an empty object and add properties with dot notation

```javascript
const user = {};
user2.name = "Jae";
user2.score = 5;
user2.increment = function () {
  user2.score++;
};
```

**Cerating user3 using Object.create**

Object.create going to give us fine-grained control over our object later on

```javascript
const user3 = Object.create(null);
user3.name = "Tam";
user3.score = 9;
user3.increment = function () {
  user3.score++;
};
```

**Introducting the keyword that automates the hard work: new**

When we call the function that returns an object with **new** in front we automate 2 steps:

1. The creation of the object Object.create()
2. Configuring the prototype
3. Returning of the new object

But now we need to adjust how we write the body of User how can we:

- Refer to the auto-created object?
- Know where to put our single copies of functions?

**Interlue - functions are both objects and functions**

```javascript
function multiplyBy2(num) {
  return num * 2;
}

multiplyBy2.stored = 5;
multiplyBy2(3); // 6

multiplyBy2.stored; // 5
multiplyBy2.prototype; // {}
```

**The class 'syntactic sugar'**

We're writing our shared methods separately from our object 'constructor' itself (off in the User.prototype object)

Other languages let us do this all in one place. ES2015 (ES6) lets us too

#### What is the underlying mechanism that JavaScript uses to implement object-oriented programming, which differs from how it's natively implemented in other languages?

JavaScript uses the prototype chain as the underlying mechanism. Unlike other languages where oOP is natively implemented, JavaScript's OOP features sit on top of the prototype chain.

#### What are the two fundamental activities that all programming consists of?

1. Saving data
2. Doing stuff to that data (which might include sending it over a network, displaying it on the UI, or modifying it)

#### What is the main problem that arises when working with large codebases of hundreds of thousands of lines if data and functionality are not properly organized?

The main problem is that functionality could be anywhere in the codebase when you need it. This makes it difficult to find the right functions to change specific data and to ensure that functionality is only used on the correct data.

#### What are the two JavaScript paradigms mentioned for keeping functionality and persistent data together?

1. Object-oriented programming, which bundles data and functionality within objects
2. Functional programming, which uses closures (functions with associated persistent data)

#### What JavaScript keywords are used to automate the work involve in using the prototype chain to emulate traditional object-oriented programming?

The 'new' and 'class' keywords are used to automate object and method creation when emulating traditional OOP using the prototype chain.

#### What is created when a function is called in JavaScript?

A brand new execution context is created, which includes local memory for stroing parameters, variables, and executing the function's code.

#### When passing arguments to a function like User('Ari', 3), where are these values initially stored?

The arguments are assigned to the function's parameter in the local memory at the top of the function's execution context

#### What is a function called when it is stored as a property on an object?

A method. When a function is attached to an object, it becoems a method of that object

#### What is the main efficiency problem with storing a copy of the increment function on every user object?

It wastes memory space by creating duplicate copies of the same function on every single object. If you have 100 user objects and 100 functions, you would have 10,000 copies of function taking up memory, which is completely untenable.

#### What is the ideal number of copies of a shared function like increment that should exists in memory?

One. Instead of having multiple copies of the same function across different objects, there should be a single copy that all objects can access when needed.

#### What JavaScript feature allows objects to access functions that are not directly stored on them?

The prototype chain. It allows JavaScript to look up properties and functions on linked objects when they are not found on the original object, without throwing an error.

#### What is the purpose of passing an object (like userFunctionStore) as an argument to Object.create()?

The argument creates a hidden bond (prototype link) between the newly created empty object and the object passed in. This allows the new object to access functions stored in the passed-in object through the prototype chain, without those functions being directly added to the new object.

#### How does JavaScript's interpreter behave when it doesn't find a function like increment directly on an object creaetd with Object.create()?

Instead of panicking or throwing an error, the interpreter follows the prototype chain to look for the function on the linked object (the object that was passed to Object.create()). If it finds the function there, it uses it.

#### What is the main advantage of using Object.create() to create objects with a prototype chain instead of copying functions directly onto each object?

Using Object.create() allows multiple objects to share a single copy of functions stored in a prototype object. Instead of having duplicate copies of function like increment on user1, user2, user400, tec. all objects can access one shared version through the prototype chain, while still being able to call methods on their specific data.

#### What method can be used to check if an object has a specific property as its own property (not inherited)?

The hasOwnProperty() method can be used to check if an object has a specific property as its own property, not inherited from its prototype chain.

#### Where does JavaScript look when a property or method is not found on an object itself?

JavaScript looks at the object's prototype (accessed via the hidden \[\[Prototype\]\] property) to find the property or method. If not found there, it continues up to prototype chain until it reaches Object.prototype or null.

#### What is Object.prototype and why is it significant in JavaScript?

Object.prototype is a built-in object that contains useful methods (like hasOwnProperty) that all objects in JavaScript have access to by default through the prototype chain. It sits at the top of the prototype chain for most objects.

#### What happens when JavaScript doesn't find a property on Object.prototype?

When JavaScript doesn't find a property on Object.prototype, it reaches null, which is the end of prototype chain. At this point, the property lookup fails and return undefined.

#### What is the relationship between an object created with Object.create() and the prototype chain?

When using Object.create(), the newly created object's hidden \[\[Prototype\]\] property points to the object passed as an argument, rather than directly to Object.prototype. This allows for custom prototype chains while still maintaining access to Object.prototype methods through chain

#### What is the implicit parameter automatically created when a function is called as a method on an object?

The implicit parameter is 'this', which is automatically set the object to the left of the dot when the method is called.

#### When a regular function is defined and called inside a method (not using arrow syntax), what does 'this' refer to inside the inner function?

'this' inside the inner function refers to the global object (window in browsers), not the object on which the outer method was called.

#### How does 'this' behave differently in arrow function compared to regular functions?

In arrow functions, 'this' is lexically scoped and is set to the value 'this' where the arrow function was defined, reather than being determined by how the function is called.

#### What three automated tasks does the new keyword perform when calling a constructor function in JavaScript?

The _new_ keyword automates: 1) the createion of new object, 2) the linking of that object to a shared store of functions (via the prototype chain), and 3) the returning of the newly created object from the function.

#### What keyword is used to refer to the automatically created object when using the new keyword with a constructor function?

The _this_ keyword is used to refer to the automatically created object when using the _new_ keyword with constructor function.

#### What is the dual nature of functions in JavaScript?

Functions in JavaScript are both functions and objects. When treated as a function (using parentheses), you access its function behavior. When treated as an object (using dot.notation), you can access and assign properties to it like any other object.

#### What property do all functions in JavaScript automatically have on their object side, and what is its default value?

All functions in JavaScript automatically have a prototype property on their object side, which by default is an empty object.

#### What two things does a function become as soon as it is declared in JavaScript?

A function becomes both a function and an object when it is declared in JavaScript

#### What property does every function automatically have on its object form, and what is its initial value?

prototype property with a default value of empty object

#### When accessing a function's object properties versus executing it, what syntactic difference indicates which operation you're performing?

Using dot notation accesses the object bit, while using parentheses executes the function bit.

#### In the context of using the 'new' keyword, what does the 'this' keyword refer to inside the function?

the new empty object that created automatically that the new keyword generates when the function is called.

#### What happens if you call a constructor function without the new keyword when the function contains references to this?

this will point to the global window object (or be undefined in strict mode). Properties assigned to this will be added to the window object (e.g., window.name, window.score), which can cause unintented side effects.

#### In the context of JavaScripts' object-oriented features, what does "syntactic sugar" means?

Syntactic sugar refers to syntax that doesn't change what happens under the hood but makes the code easier to read and write. JavaScript classes are syntactic sugar over the prototype-based constructor function pattern.

#### When using the class syntax in JavaScript, where are methods defined inside the class body (excluding the constructor) actually stored?

Methods defined in the class body are automatically added to the constructor function's prototype property. They are store on the function object combo's prototype object, making them available to all instances through the prototype chain.

#### What is the primary difference between defining methods inside a class versus using the traditional prototype syntax?

In a class, methods are listed directly within the class defintion (e.g., increment, login) and are automatically added to the prototype object. With traditional syntax methods must be explicitly added using User.prototype.methodName for each method separately.

#### What does the 'static' keyword do when used with a method in a JavaScript?

The 'static' keyword adds the method directly to the function object itself (the class), rather than to the prototype object. This means the method is associated with the class as a whole, not with instances created from the class.

#### When a class is defined in JavaScript, what is actually created under the hook?

A function-object combo is created. The class syntax is syntactic sugar that creates a function with an associated object that has a prototype property. The constructor becomes the function definition, and methods are added to the prototype object.

#### Where are methods defined in a class stored in the underlying JavaScript structure?

Methods defined in a class are stored in the prototype object of the function-object combo. This prototype object is automatically created as property of the function when the class is defined.

#### What happens when you access a static method on a class (e.g., User.describe())?

The static method is found directly on the function object itself (not on the prototype). It can be executed immediately without creating an instance of the class, and it has access to the function object but not to instance-specific data.

#### What does the _new_ keyword automatically create as the first step when instantiating an object from a class?

The _new_ keyword creates a brand new empty object and assigns it to the label _this_ in the execution context.

#### When using the _new_ keyword with a class constructor, what does JavaScript automatically set the \[\[prototype\]\] (hidden prototype) reference to point to?

the reference is set to point to the prototype object on the function object combo (the constructor's property), which is User.prototype in the example

#### What is a public instance field in JavaScript classes and where is it initially stored?

A public instance field is a property that is available on every new object created from a class, where each object gets its own copy. It is initially stored in the hidden _fields_ property of the function object combo created via the class keyword.

#### When does JavaScript automatically add public instance fields to a newly created object?

JavaScript automatically adds public instance fields to the object during the constructor execution, before any manually written constructor code runs. The new keyword grabs anything saved in the fields hidden property and assigns it to the auto-created object.

#### What happens when you try to access a method on an object that doesn't exist directly on that object?

JavaScript looks for the method on the object first. If not found, it follows the prototype chain through the hidden _prototype_ reference to the constructor's prototype object where method like _increment_ and _login_ are stored.

#### What is the purpose of private fields in object-oriented programming?

Private fields prevent developers from directly accessing and modifying object properties from outside the object. They ensure that properties can only be changed through designated methods, maintaining predictable patterns and preventing accidental modifications in large codebases.

#### How do you declare a private field in a JavaScript class?

You declare a private field using the hashtag (#) symbol before the property name within the class definition. For example #score would create a private score field.

#### Where are private fields stored on an object in JavaScript?

Private fields are stored in a separate hidden, inaccessible portion of properties known as private element properties. They are not stored in the regular properties of the object, making them inaccessible from outside the class methods.

#### When a method like increment90 is called on an object instance, where is the method found

The method is found on the prototype object. The JavaScript engine looks up the prototype chain through the hidden prototype property to find the method on the prototype, where shared methods are stored.

#### When the new keyword is used with a constructor function in JavaScript, what happens to the _this_ keyword inside the constructor?

_this_ is automatically set to a new empty object. This object is then automatically given a hidden prototype link to the constructor functions's prototype property, and the object is returned at the end of the function execution.

#### How does JavaScript;s prototypal inheritance system differ fundamentally from classical object-oriented inheritance in other languages?

JavaScript users a prototype chain where objects have a hidden prototype link to other objects to access shared methods and properties. This is fundamentally different from classical OOP languages that use true classes. JavaScript's class syntax is syntactic sugar built on top of this prototypal system.

#### What happens when you call a class constructor in JavaScript without the new keyword versus with it?

Without the new keyword, the constructor runs as a regular function. With the new keyword, JavaScript automatically creates an empty object, set this to that object, create prototype link to the constructor's prototype property, and returns the object.
