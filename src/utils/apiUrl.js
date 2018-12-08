let url = '';
switch(process.env.srconfig) {
case 'pro'://生产
  url = 'https://dhout.jikezhuanzhuan.com/api'
  break;
case 'test':
  url = 'http://47.110.211.73/api'
  break;
default://默认开发
  url = 'http://47.99.229.44:10003'
  break;
}
module.exports = {
  url:url
}