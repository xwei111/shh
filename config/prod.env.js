'use strict'
const buildtype = process.argv.slice(2)[0];
let obj = {
  NODE_ENV:'"production"'
}
switch(buildtype) {
case 'pro'://生产
  process.env.srconfig = 'pro'
  obj.srconfig = '"pro"'
  break;
case 'test'://测试环境
  process.env.srconfig = 'test'
  obj.srconfig = '"test"'
  break;
default://默认开发
  process.env.srconfig = ''
  obj.srconfig = '""'
  break;
}
module.exports = obj;
