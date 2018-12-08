module.exports = (function() {
  // mock server 端口
  const port = process.env.PORT || 10003;
  // 要做代理的 api 前缀
  const prefixAPI = ['/api', '/channel', '/menu']
  //  代理配置
  const proxyTable = {}
  // const target = `http://localhost:${port}`
  const target = `http://47.99.229.44:${port}`;
  // const target = `http://192.168.2.58:${port}`;

  for (let i = 0; i < prefixAPI.length; i ++) {
    proxyTable[prefixAPI[i]] = {
      target: target,
      changeOrigin: true,
      /* pathRewrite:{
        [`^${prefixAPI[i]}`]:''
      },
      ws: true */
    }
  }
  
  return {
    mockPort: port,
    proxyTable: proxyTable
  }
})()