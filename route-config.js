// jika halaman tidak ada
// membuat login system

root.err = function(){
  location.href = `#/home`;
}

root.verify = function(a){

    // make verify
    if (localStorage.getItem('login') === null) {
        location.href = "#/home"
    }else{
        return false;
        console.log('more')
    }

}

const dataCss = [
  'font/css/all',
  'css/customeb',
  'bootstrap3/css/bootstrap.min',
];

const dataJs = [
  'bootstrap3/js/bootstrap.min',
  'plugin/particles/particles',
  'plugin/particles/stats',
  'plugin/particles/app',
  'plugin/particles/app2',
]

root.get('/home', function(){
  var arg = arguments;
    loadCss(dataCss, function(){
      loadPage([
          'page/nav/nav',
          'page/landing/landing',
          'page/nav/foo'
        ], function(){
          loadJs(dataJs, function(){
            rootCall('page/landing/landing', arg);
          })
        })
    })
})

root.get('/download', function(){
  var arg = arguments;
    loadCss(dataCss, function(){
      loadPage([
          'page/nav/nav',
          'page/download/download',
          'page/nav/foo'
        ], function(){
          loadJs(dataJs, function(){
            rootCall('page/download/download', arg);
          })
        })
    })
})

// halaman pertama kali di load
root.start('/home');
