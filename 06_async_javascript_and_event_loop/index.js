// slow function blocks further code from running (JS single thread)
//
// dummy code
// const videos = getVideo("https://tiktok.com/will/1")
// 350ms wait while a request is sent to Tiktok's HQ
//
// displayVideo(videos)
// But we do need to wait for the videos to display them
//
// console.log("I want to runnnn!")

// function printHello() {
//   console.log("Hello");
// }
// // Manually make our code wait (block?) 1000ms
// setTimeout(printHello, 0);

console.log("Me first!");

function display(data) {
  console.log(data);
}
function printHello() {
  console.log("Hello");
}
function blockFor300ms() {
  /* blocks js thread for 300ms */
}

setTimeout(printHello, 0);

const signal = AbortSignal.timeout(200);
const futureData = fetch("tiktok.com/will", { signal: signal });
futureData.then(display);
futureData.catch(display);

blockFor300ms();
console.log("Me first!");
