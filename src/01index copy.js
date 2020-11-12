import './01index.css';
const axios = require('axios');
var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.charset="utf-8";
script.src = 'https://static.zhuxingyun.com/uyun-prod/uyun/api/uyun-aea4822e9c56245523a6ac59f85d6f2f.js';
document.head.appendChild(script);  
script.onload = () => {
  window.uyun.env = 'prod';
  window.uyun.api.authenticateMobileUser('17596576465','wangbo1358', function(err, result) {
    console.log(result);
    App(result);
    window.uyun.util.setToken(result.token)
  });

}  

function App(res) {
  return (
    <div className="App">
      <header className="App-header">
        aaaa
      </header>
    </div>
  );
}

export default App;
