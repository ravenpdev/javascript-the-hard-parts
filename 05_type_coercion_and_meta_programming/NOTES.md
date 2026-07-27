# Type Coercion, Operators & metaprogramming

- Hidden and infamously powerful system built to be flexible to browser I/O
- Depends on a deep understaing of _primitives_, _operators_ and _memory_ under the hood
- Introduces _Symbols_ to give us manual control over coercion & even metaprogramming
- If understood, we can write code that's more bug resistant and answer interview's favorit JS quirk questions from first principles!

Operators _dispatch_ an action - do stuff (like multiply) to operands

```javascript
const price = 7;
let quantity; // document.getElementById("q").value
let total; // initially undefined

function onSubmit() {
  total = price * quantity; // ? * "3"
}

onSubmit();
```

**Nope! Introducing Type coercion**

As soon as JavaScript sees the math operator * our "3" get automatically turned into 3
A 'TotalNumber' _type coercion_ is kicked off

- Then just a regular * operation

What about other math-y operator? Do they 'coerce' ToNumber?

```javascript
const price = 7;
let quantity;
const max = 10;
let total;

function onSubmit() {
  total = price * quantity;
  if (quantity < max) {
    console.log("All good!");
  }
}

onSubmit();
```

Use the _'+' operator_ to add a donation

```javascript
const price = 7;
let quantity; // DOM gives us "3"
let donation; // DOM gives us "10"
let total; // undefined

function onSubmit() {
  total = price * quantity + donation;
  // 7 * 3 + "10" // 21 + "10"
  // 21 + "10" // "2110"
}
onSubmit();
```

Add (ie '+') it to our total

- But if either side of '+' is a string JS automatically kicks off a different coercion: 'ToString'
- Giving us some odd results

Most math operators (-, *,/,%,**) always -> ToNumber, '+' only does legit math if both sides are numbers

What can we do at this DOM boundary to be predictable?

**We need to take manual control of type coercion**

If we want to guarantee we're working w numbers we use _unary operator +/- - or Number()_ to manually kick off ToNumber coercion

If we want to guarantee strings we can use _String() & `${}`_ to kick off 'ToString' coercion

There's probably no other coercions right?

**Strict equality** do not kick off any coercion

**ToNumber**

- "3" -> 3, "-3", -> -3
- true -> 1, false -> 0, null -> 0
- undefined -> NaN (itself a number)

**ToString**

- 5 -> "5", -5 -> "-5"
- true/false, null -> "true"/"false", "null"
- undefined, NaN -> "undefined", "NaN"

**ToBoolean**

- 0, "", null, undefined, NaN -> false
- Everything else -> true

And each coercion is kicked off by operators or actions

- **Math** (*,-,/,%,**) -> ToNumber
- **unary** (+, - right in front) -> ToNumber
- **+** -> ToString (unless both are numbers)
- **Relationship** (<,>,<=,>=) -> first try ToNumber then ToString
- **Loose equality** (==) -> all over the place (avoid)
- **Conditional** (if, ||, &&, !) -> ToBoolean
- `${}` and Browser APIs -> ToString

**The stack vs the heap**

All our values we've seen so far 7, "3", and true have been _primitives_ stored directly where we save them the _stack_ (as they're a predictable size & single)

Our coercion rules so far applied to primitives

But object combine primitives & can be big as we want

- Instead of storing directly they're stored in a flexible store - the _heap_. All that's saved to the stack is a link or _reference_ anotherLink just has a copy of userStored's link to the heap!
- To compare objects content we have to manually _traverse_ them
- Shame as there's 2 objects we could compare to seriously improve our UX

**'Time objects' could prevent accidental submissions**

Built-in objects from _Date()_ that gives exact time (to improve UX)
Store on hidden property \[\[DateValue\]\]

- The time is stored as 'total ms starting at 0' since _Jan 1 1970 00:00:00 (midnight)_

Suppose we're running Date() at:

- Jan 15 2027 00:00::00 (midnight)
- How many ms since 0 is that

**Surely there's no way to compare the objects directly?**

Could we subtract the objects from each other to see if difference is < 2000ms?

- We'd just be comparing links no?

And yet, we can...

- Introducing **ToPrimitive coercion**

Automatically coerces both objects to a primitive - here, to a number \[\[DateValue\]\] (the ms since jan 1 1970)

- But how?

**Via the hidden @@toPrimitive property**

The math (time2 - time1) kicks off object -> primitive coercion

JS automatically looks for hidden property @@toPrimitive on the objects (we can't refer to it directly)

JS has stored instructions there to coerce both time1 and time2 to their (also hidden) \[\[DateValue\]\] numbers!

**We now have control of our object -> primitive coercion!**

We can even add different rules depending on whether we're coercing the object to a number or a string!

When JS runs the function stored on hidden property @@toPrimitive it auto inserts:

- "number" if ToNumber: e.g., +userStored or Number()
- "string" if ToString: e.g., `${userStore}`

We just have to write the conditionals!

What are these 'hidden properties' with so much power? Even logging Symbol.toPrimitive won't show @@toPrimitive

**Introducing Symbols - ES6 features for adding semi-hidden properties to objects**

Labels (unique 'identifiers') that cannot be written out directly and so won't override developer's existing code

- @@toPrimitive is not a string & won't override developers existing 'toPrimitive' property
- Looping through an object's properties won't find @@toPrimitive

But JavaScript let's us use them to give us access to under-the-hood features of the language

- E.g. the ability to manually control ToPrimitive coercion flow (both ToNumber and ToString)
- These built-in symbols that JS recognizes are known as 'well-known symbols'

**And symbols open up 'metaprogramming'**

Beyond coercion - we can access many behaviors

- From iterators, to async features to the behavior of classes

By ensuring backwards-compatibility and semi-hidden status, JavaScript can safely let us control and override default language rules and make explicit implicit behaviors

We know we can manually control our ToNumber, ToSTring and ToBoolean coercion steps

With symbols we can now fully control our coercion pipeline taking full control of our object ToPrimitive coercion

**Making our type coercion explicit gives us both flexibility and predictability**

**Coercion everywhere:** Every operator or API call may trigger hidden coercions - but with a clear map you can predict these instead of being surprised

**Explicit control over flexibility** JS has type flexibility to create readable code at the browser edge but it's mostly too unpredictable & requires explicit handling

**Symbols & metaprogramming** OUr well-known symbols give fine-graned backward-compatible control over type coercion and other built-in JS features

**TypeScript** Automates type control but understanding type coercion under-the-hood remains crucial to wielding JS effectively (& passing interviews)

#### Why does user input from a web page arrive in JavaScript as a string, even when the user enters a number?

When a user enters data into a form field on a web page and it's passed into JavaScript from the DOM, it always comes into as a string, regardless of whether the user typed numbers or letters.

#### How do operators differ from functions in JavaScript in terms of how they receive their inputs?

Operators act on data positioned adjacent to them (on either side), while functions act on data passed inside parentheses. For example, an operator like * acts on operands positioned to its left and right (e.g., 7*3), whereas a function receives its input as argument within parentheses(e.g., multiply(7,3))

#### What are operands in the context of JavaScript operators?

Operand are the values or variables that an operator acts upon. In an expression like 'price * quantity', 'price', and 'quantity' are the operands, while the * (multiplication symbol) is teh operator that performs the action on those operands.

#### What happens when JavaScript's multiplication operator encounters a string value?

The multiplication operator automatically triggers the toNumber coercion, converting the string to a number before performing the multiplication. For example, "3" * 7 would coerce "3" to the number 3, resulting in 21

#### How do relational operators (like less than <) handle type coercion in JavaScript?

Relational operators kick off toNumber coercion when comparing values. For example, when checking if the string "3" is less than the number 10, JavaScript will coerce the string "3" to the number 3 before performing the comparison.

#### What type coercion does the addition operator (+) perform when one operand is a string?

If either side of the plus operator is a string, JavaScript automatically kicks off toString coercion instead of toNumber. This converts both operands to strings and performs string concatenation rather than mathematical addition.

#### What is the result of the expression 21 + "10" in JavaScript and why?

The result is the string "2110". Since one operand("10") is a string, JavaScript performs toString coercion on the number 21, converting it to a string, then concatenates the two strings together instead of performing mathematical addition.

#### What behavior do most math operators (minus, multiplication, divide, modulo, exponentation) have regarding type coercion?

Most math operators always perform toNumber coercion, converting string operands to numbers before performing the operation. The exception is the plus operator, which only does mathematical addition if both sides are already numbers.

#### What two values are commonly problematic when validating user input for quantity fields in JavaScript?

Empty string and the number 0 are commonly problematic. An empty string occurs when a user hasn't typed anything yet, and 0 might occur if a user explicitly enters zero. Both may need to be prevented from submission depending on the context.

#### What happens when you use a value like 0 or an empty string in a JavaScript conditional Statement?

JavaScript applies boolean coercion (to boolean conversion). Both 0 and emptry string are coerced to false, which means the conditional will not execute and will skip to the else block or next statement.

#### What happens when you use the double equals (==) operator to compare the number 0 with an empty string in JavaScript?

The comparison returns true because the double equals operator trigger type coercion. The empty string is coerced to the number 0, making both sides equal to 0, so the comparison evaluates to true.

#### Why might you want to distinguis between a 0 value and an empty string when validating a donation field?

A 0 value might indicate an intentional choice to not donate (which is acceptable), while an empty string indicates the user hasn't filled in the field yet (which might require prompting the user to make a decision).

#### What is the difference between the double equals (==) and triple equals (===) operators in JavaScript?

The double equals (==) operator performs type coercion before comparison, converting values to matching types. The triple equals (===) operator compares values without any type coercion, checking both value and type directly.

#### In JavaScript, what is the difference between how primitive values and objects are stored in memory?

Primitive values (like number, strings, and booleans) are stored directly in memory where they are declared. Objects, however, are stored in a flexible memory area called the heap, and only a reference (or pointer) to that location is stored in the variable itself.

#### Why does comparing two objects with identical properties using == or === return false in JavaScript?

When comparing objects, JavaScript compares their references (memory addresses) rather than their actual contents. Even if two objects have identical properties and values, they occupy different positions in the heap, so their references are different and the comparison returns false.

#### What happens when you assign one object variable to another in JavaScript, such as backup = useStored?

You are copying the reference (pointer) to the object, not the object's content. Both variables now point to the same location in memory, so changes made through one variable will be reflected when accessing through the other. This is not creating a backup or copy of the object.

#### What is the heap in JavaScript and what type of data is stored there?

The heap is a flexible area of memory where non-primitive data (objects, arrays, functions) is stored. It can accomodate data structures of varying sizes. Variables in JavaScript don't store these data structures directly but instead hold references to their locations in the heap.

#### What is the epoch date from which JavaScript's Date Object counts milliseconds?

January 1st, 1970 at midnight. This is the starting point (epoch) from which milliseconds are counted in JavaScript's Date system.

#### When using square bracket notation to set a property on an object, such as timeOne\[month\] = true where month = 'Jan', what property name is actually created?

The property name created is 'Jan'. The square bracket notation evaluates the variable month first, retrieves its value ('jan'), and then uses the value as the property name. The variable name itself is not used as the property name.

#### If a Date object is created at a timestamp of 1.8 trillion milliseconds, and another Date object is created 3 seconds later, what would be the dateValue of the second object?

1.8 trillion plus 3000 milliseconds (1,800,000,003,000). Sicne 3 seconds equals 3000 milliseconds, the second timestamp would be the original timestamp plugs 3000.

#### What is a practical use case for comparing timestamps from two Date objects, such as preventing an action if insufficient time has passed.

Preventing double sumbissions within quick succession. By comparing timestamps, you can check if a user has pressed submit recently (e.g., within the last 2000-3000 milliseconds) and prevent resubmission if insufficient time has passed.

#### What does the toPrimitive coercion mechanism do when attempting to subtract two Date objects from each other?

toPrimitive automatically coerces both Date objects to primitive values, specifically numbers. In the case of Date objects, it converts them to their hidden date value property, which represents milliseconds since the Unix epoch, allowing mathematical operations to be performed on them.

#### What is the @@toPrimitive property and how does it enable coercion of objects?

The @@toPrimitive property is a hidden property that contains functionality with instructions on how to convert an object into a primitive value. When mathematical operations are performed on objects, JavaScript look for this property and runs it to coerce the object into a primitive, specifically into a number or string depending on the operation.

#### In the following code, what will be the result if time1 represent midnight on january 15th, 2027 and time2 represent 1 second later?

```javascript
if (time2 - time1 < 2000) {
  console.log("accident");
}
```

The code will log 'accident' to the console. The Date object are coerced to their date value in milliseconds. Since time2 is 1 second (1000 milliseconds) after time1, the difference (1000) is less than 2000 milliseconds, making the condition true.

#### What determines whether toPrimitive corces an object to a string or a number?

The operator being used determines the type of coercion. Mathematical operators trigger toPrimitive with a number hint, causing the object to be coerced to a number. Other contexts may trigger coercion to a string. The hint is passed as an argument to the toPrimitive function.

#### What happens when you attempt to perform mathematical operations on two objects that have @@toPrimitive properties?

JavaScript kicks off a toPrimitive coercion flow that runs the @@toPrimitive function on both objects. This function returns primitive values (typically numbers for mathematical operations) which can then be used in the mathematical operation. The object themselves are not compared by their memory position, but by their coerced primitive values.

#### What is the purpose of the @@toPrimitive property on JavaScript objects?

The @@toPrimitive property is a hidden property that contains a function defining how an object should be coerced to a primitive value (like a number or string). When JavaScript tries to coerce an object, it checks for this property and executes the function stored there to determine the primitive value.

#### How do you add a @@toPrimitive property to a custom JavaScript object?

You cannot directly write the @@toPrimitive property. Instead, you must use the Symbol.toPrimitive label with square bracket notation. For example: userStored\[Symbol.toPrimitive\] = coerceFunction

This accesses the hidden label stored on the built-in Symbol object and assigns your custom function to it.

#### What happens when you console.log Symbol.toPrimitive?

You don't see the actual hidden @@toPrimitive label. Instead you get a stringified version that display as 'Symbol(Symbol.toPrimitive)'. The actual hidden label cannot be directly viewed in the console, but it can be referenced and used.

#### Given the following code, what will be the result of the comparison and why?

```javascript
function coerce() {
  return 105;
}
userStored[Symbol.toPrimitive] = coerce;
userSubmitted[Symbol.toPrimitive] = coerce;

+userStroed === +userSubmitted;
```

The comparison will return true. The unary operator (+) triggers the toPrimitive coercion pipeline. JavaScript check each object for the @@toPrimitive property, find s the coerce function, and executes it. Both function return 105, so the comparison becomes 105 === 105, which evaluates to true

#### what does the JavaScript engine automatically insert as a parameter when it runs a function stored on the @@toPrimitive property?

The JavaScript engine automatically inserts information about what the two primitive specifics are - either the string "number" or the string "string" - depending on the context of the coercion. This paremter (commonly called "hint") allows the function to determine whether to return a number or string representation.

#### What is the purpose of the Symbol data type in JavaScript, particularly in relation to object properties?

Symbols are unique identifiers that serve as semi-hidden properties on objects. They allow JavaScript to add new features without breaking backwards compatibility with existing code. Since Symbols cannot be written out directly as strings, they won't override developers existing properties with the same name.

#### Why can't JavaScript simply use a regular string property called toPrimitive instead of @@toPrimitive as a Symbol?

Using a regular string property would break backwards compatibility. Many developers may already have a toPrimitive property on their objects for their own purposes. If JavaScript started automatically accessing those properties for built-in coercion behavior, it would cause unexpected behavior in existing code that was never designed for that purpose.

#### What are "well-known Symbols" in JavaScript?

Well-known Symbols are built-in Symbols that JavaScript explicitly recognizes and uses to control various language behaviors. Examples include @@toPrimitive for coercion control, and others that affect iterators, async features, and classes. They enable metaprogramming and allow developers to override default language rules safely.

#### What is metaprogramming in the context of JavaScript Symbols?

The ability to override default language behavior and access built-in features like iterators, async features, and coercion
