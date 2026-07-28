// Object literal
// const user1 = {
//   name: "Ari",
//   score: 3,
//   increment: function () {
//     user1.score++;
//   },
// };
// user1.increment();
// console.log(user1);

// Dot notation
// const user = {};
// user2.name = "Jae";
// user2.score = 5;
// user2.increment = function () {
//   user2.score++;
// };

// Object.create
// const user3 = Object.create(null);
// user3.name = "Tam";
// user3.score = 9;
// user3.increment = function () {
//   user3.score++;
// };

// function User(name, score) {
//   const user = {};
//   user.name = name;
//   user.score = score;
//   user.increment = function () {
//     user.score++;
//   };
//   return user;
//   // return {
//   //   name: name,
//   //   score: score,
//   //   increment: function () {
//   //     this.score++;
//   //   },
//   // };
// }
// const user1 = User("Ari", 3);
// user1.increment();
// console.log(user1);

// Using the prototype chain
// const userFunctionStore = {
//   increment: function () {
//     //   that = this;
//     //   function add() {
//     //     that.score++;
//     //   }
//     //   add();
//     // this.score++;

//     const add = () => this.score++;
//     add();
//   },
//   login: function () {
//     console.log("logged in");
//   },
// };

// function User(name, score) {
//   const user = Object.create(userFunctionStore);
//   user.name = name;
//   user.score = score;
//   return user;
// }
// const user1 = User("Ari", 3);
// const user2 = User("Jae", 5);
// user1.increment();
// console.log(user1);

// The new keyword automates a lot of our manual work
// function User(name, score) {
//   this.name = name;
//   this.score = score;
// }

// User.prototype.increment = function () {
//   this.score++;
// };

// const user1 = new User("Ari", 3);
// user1.increment();
// console.log(user1);

// The class 'syntactic sugar'

// this is just a function and object combo
// class User {
//   constructor(name, score) {
//     this.name = name;
//     this.score = score;
//   }

//   increment() {
//     this.score++;
//   }

//   login() {
//     console.log("login");
//   }

//   static describe() {
//     console.log("Creates users");
//   }
// }

// const user1 = new User("Ari", 3);
// user1.increment();
// console.log(user1);

class User {
  static #count = 0; // private static fields no tampering
  #score; // sets up a private property
  constructor(name, score) {
    if (User.#count >= 2) throw Error("Max users reached");
    this.name = name;
    this.#score = score;
    User.#count++;
  }

  increment() {
    this.#score++;
  }

  login() {
    console.log("login");
  }

  setScore(score) {
    this.#score = score;
  }

  getScore() {
    return this.#score;
  }

  static describe() {
    console.log("Creates users");
  }
}
const user1 = new User("Ari", 3);
User.prototype = {};
user1.increment();
console.log(user1.getScore());

// console.log(user1);
// console.log(user1.getScore());
// console.log(user1["#score"]);

const user2 = new User("Jae", 5);
console.log(user2);
// const user3 = new User("Tam", 9);
