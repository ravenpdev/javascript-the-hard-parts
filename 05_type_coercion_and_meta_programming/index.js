// const price = 7;
// let quantity = 3;
// let total = price * quantity;

// const price = 7;
// let quantity; // document.getElementById("q").value
// let total; // initially undefined

// function onSubmit() {
//   total = price * quantity; // ? * "3"
// }

// onSubmit();

// manual type coercion

// const price = 7;
// let quantity = "3"; // DOM gives us "3"
// let donation = ""; // DOM gives us "10"
// let total;
// function onSubmit() {
//   // using the unary + operator
//   // total = +price * +quantity + +donation;

//   // Using the Number()
//   // total = Number(price) + Number(quantity) + Number(donation);

//   // 7 * 3 + 10 = 31

//   // console.log(total);

//   // if (donation == 0) {
//   //   console.log("0 donation, no problem");
//   // } else {
//   //   console.log("Want to donate?");
//   // }

//   if (donation === 0) {
//     console.log("0 donation, no problem");
//   } else {
//     console.log("Want to donate?");
//   }
// }
// onSubmit();

// const time1 = new Date();
// console.log(`time1: ${time1}`);
// let time2;
// // use setTimeout here to delay seting time2
// setTimeout(() => (time2 = new Date()), 1500);
// // since setTimeout only excuted when all code in global context is done and the the call stack is empty to console at subtract, if I don't put the console.log(time2 - time1) it will be executed immediately and time2 is still undefined and javascript automatically coerce time2 to number which is undefined that becomes NaN, so NaN - number will return NaN
// // I watch the course async section first 😉
// setTimeout(() => {
//   const month = "jul";
//   time1[month] = true;
//   time2[month] = true;

//   // javascript will automatically coerced time1 and time2 to ToPrimitive - ToNumber because the of (-) operator
//   if (time2 - time1 < 2000) {
//     console.log("Accident?");
//   }
// }, 5000);
// // console.log(time2 - time1);

// implement @@toPrimitive
// We need to manually update the hidden @@toPrimitive property on our objects with a function that state how to coerce the objects into numbers
const userStored = { name: "Will", id: 105 };
const userSubmitted = { name: "Will", id: 105 };

function onSubmit() {
  // if (+userStored === +userSubmitted) {
  //   console.log("equal");
  // }
  if (`${userStored}` === `${userSubmitted}`) {
    console.log("equal");
  }
}

function coerce(hint) {
  if (hint === "number") {
    console.log("hint is number");
    return 105;
  }

  console.log("hint is string");
  return "user";
}

userStored[Symbol.toPrimitive] = coerce;
userSubmitted[Symbol.toPrimitive] = coerce;

onSubmit();
