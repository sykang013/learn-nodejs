const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};

console.time("전체 시간");
console.log("평범한 로그입니다. 쉼표로 구분해 여러 값을 나타낼 수 있습니다.");
console.log(string, number, boolean);
console.error("에러 메시지는 console.error에 담기. 입력값이 잘못되었습니다.");

console.table([
  { name: "Gatsby", birth: 1875 },
  { name: "Demian", birth: 1830 },
]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time("시간 측정");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}
function a() {
  b();
}
a();
