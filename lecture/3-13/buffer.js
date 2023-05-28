const buffer = Buffer.from("나를 버퍼로 바꿔봐");
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

// 조각조각 들어온 buffer는 Buffer.concat으로 합칠 수 있다.
const array = [Buffer.from("조각"), Buffer.from("조각"), Buffer.from("떨어짐")];
console.log(Buffer.concat(array).toString());

// 데이터는 없는데 버퍼 만들 때 (10바이트짜리)
console.log(Buffer.alloc(10));
