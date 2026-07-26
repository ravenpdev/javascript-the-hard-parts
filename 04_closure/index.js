function outer() {
  let counter = 0;
  function add1() {
    counter++;
  }
  return add1;
}

const newFunc = outer();
newFunc();
newFunc();
