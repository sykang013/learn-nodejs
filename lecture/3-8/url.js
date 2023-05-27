const url = require("url");

const { URL } = url;
const myURL = new URL("https://www.daseo.com/js-module-require/");

console.log("new URL():", myURL);
console.log("url.format():", url.format(myURL));

// new URL(): URL {
//   href: 'https://www.daseo.com/js-module-require/',
//   origin: 'https://www.daseo.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'www.daseo.com',
//   hostname: 'www.daseo.com',
//   port: '',
//   pathname: '/js-module-require/',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: ''
// }
// url.format(): https://www.daseo.com/js-module-require/
