var domLoadData = document.getElementById('app');

function callMaster(a, func) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = `${a}.js`;
  head.appendChild(script);

  script.onload = () => {
    func();
  }

}

callMaster('jquery', function () {
  callMaster('axios', function () {
    // const rootDir = '/';
    const rootDir = '/igeiatech.github.io/';

    var datesMM = function () {
      return new Date().getTime();
    }

    var newCount = 0;

    // const times = helper.tanggal().angka;
    const times = datesMM();

    const rootPageData = {}

    function delay(callback, ms) {
      var timer = 0;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, ms || 0);
      };
    }

    const loadJs = function (a = [], func) {
      $('#loadjs script').remove();

      var protocol = location.protocol;

      var host = location.host;

      var baseUrl = protocol + '//' + host;

      var panjangScript = a.length;

      var saatIniUrutan = 0;

      function loadScript() {

        var script = document.createElement('script');
        script.src = `${baseUrl + rootDir + a[saatIniUrutan]}.js?v=` + times;
        document.getElementById('loadjs').appendChild(script);
        script.onload = () => {
          saatIniUrutan += 1;
          if (saatIniUrutan < panjangScript) {
            loadScript()
          } else {
            jQuery(document).ready(async function ($) {
              await func();
            });
          }
        }
      }
      loadScript();
    };


    const loadCss = function (a = [], func) {
      $('link').remove();

      function loadCssFile(filename) {
        var linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("type", "text/css");
        linkElement.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(linkElement);
      }

      var protocol = location.protocol;

      var host = location.host;

      var baseUrl = protocol + '//' + host;

      var panjangScript = a.length;

      var saatIniUrutan = 0;

      function loadScript() {

        var linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("type", "text/css");
        linkElement.setAttribute("href", `${baseUrl + rootDir + a[saatIniUrutan]}.css?v=` + times);
        document.getElementsByTagName("head")[0].appendChild(linkElement);

        linkElement.onload = () => {
          saatIniUrutan += 1;
          if (saatIniUrutan < panjangScript) {
            loadScript()
          } else {
            jQuery(document).ready(async function ($) {
              await func();
            });
          }
        }
      }

      loadScript();

    };

    const callPage = function (a) {

      var protocol = location.protocol;

      var host = location.host;

      var baseUrl = protocol + '//' + host;

      axios.get(baseUrl + '/' + a + '.js?v=' + times).then(function (res) {
        rootPageData[a] = res.data;
      }, function (error) {
      })
    };

    const loadPage = function (a, func) {

      var panjang = a.length;

      var html = '';

      var numR = 0;

      function call() {

        var protocol = location.protocol;

        var host = location.host;

        var baseUrl = protocol + '//' + host;

        var url = baseUrl + rootDir + a[numR] + '.htm?v=' + times;

        axios.get(url).then(function (res) {
          html += res.data;
          numR += 1;
          if (numR === panjang) {
            document.getElementById('root').innerHTML = html;
            setTimeout(() => {
              jQuery(document).ready(function ($) {
                func();
              });
            }, 100)
          } else {
            call();
          }
        }, function (error) {
        })
      }
      call()
    };

    var historyRoot = 0;

    const fuckMan = delay(function (b) {
      jQuery(document).ready(function ($) {
        helper.fungsiBaru.apply(null, b);
      });
    }, 100);


    const rootCall = async function (a, b, c = '') {

      axios.get(a + '.js')
        .then(response => {
          return response.data
        })
        .then(data => {
          $(document).ready(async function () {
            try {

              eval(
                `
                       helper.fungsiBaru = ${data}

                     `
              );

              newCount += Number(1);
              fuckMan(b);
              $('#preload').fadeOut(300);
            }
            catch (rejectedValue) {
              rootCall(a, b);
            }
          })
        })
        .catch(error => {
          console.log(error.response.data.error)
        })
    };
    var root = {}
    // data rooting
    root.data = {}
    root.verifydata = {}
    root.verifydata.data = {}

    root.navSelect = function (a) {
    }

    root.get = function (a, func, verify = false) {
      root.data['#' + a] = func, 100;
      root.verifydata.data['#' + a] = verify;
    }

    root.start = function (a) {
      newCount = 0;
      document.getElementById('preload').setAttribute('class', 'transition');

      var location = window.location;
      if (location.hash != "") {
        var link = location.hash;
        var target = location.hash;

        var [a, b] = target.split('/');

        var moc = a + '/' + b;

        var rootKey = Object.keys(root.data);
        rootKey = rootKey.filter(function (item) {
          if (moc === item) {
            return item;
          }
        })[0];
        target = target.replace(rootKey, "").split("/");
        var sif = target.shift();
        window.location.hash = link;
        if (root.data[rootKey] != undefined) {
          if (root.verifydata.data[rootKey] === true) {
            if (root.verify(rootKey) != false) {
              root.verify(rootKey)
            } else {
              root.data[rootKey].apply(null, target);
            }
          } else if (root.verifydata.data[rootKey] === false) {
            root.data[rootKey].apply(null, target);
          }
        } else {
          root.err();
        }
      } else {
        location.hash = "#" + a;
        var link = location.hash;
        var target = location.hash;

        var [a, b] = target.split('/');

        var moc = a + '/' + b;

        var rootKey = Object.keys(root.data);
        rootKey = rootKey.filter(function (item) {
          if (moc === item) {
            return item;
          }
        })[0];
        target = target.replace(rootKey, "").split("/");
        target.shift();

        window.location.hash = link;
        if (root.data[rootKey] != undefined) {
          if (root.verifydata.data[rootKey] === true) {
            if (root.verify(rootKey) != false) {
              root.verify(rootKey)
            } else {
              root.data[rootKey].apply(null, target);
              root.navSelect(link);
            }
          } else if (root.verifydata.data[rootKey] === false) {
            root.data[rootKey].apply(null, target);
            root.navSelect(link);
          }
        } else {
          root.err();
        }
      }
    }

    window.onhashchange = function () {
      newCount = 0;

      $('#preload').fadeIn(100);

      setTimeout(function () {

        var link = location.hash;
        var target = location.hash;

        var [a, b] = target.split('/');

        var moc = a + '/' + b;

        var rootKey = Object.keys(root.data);
        rootKey = rootKey.filter(function (item) {
          if (moc === item) {
            return item;
          }
        })[0];


        target = target.replace(rootKey, "").split("/");

        target.shift();

        window.location.hash = link;
        if (root.data[rootKey] != undefined) {
          if (root.verifydata.data[rootKey] === true) {
            if (root.verify(rootKey) != false) {
              root.verify(rootKey)
            } else {
              root.data[rootKey].apply(null, target);
              root.navSelect(link);
            }
          } else if (root.verifydata.data[rootKey] === false) {
            root.data[rootKey].apply(null, target);
            root.navSelect(link);
          }
        } else {
          root.err();
        }

      }, 100)
    }
    $('body').on('click', '[root]', function (event) {
      event.preventDefault()
      var link = '#' + event.target.getAttribute('root');
      window.location.hash = link;
    })

    $(document).on("click", "[back]", function (event) {
      event.preventDefault();
      window.history.back();
    })

    setTimeout(function () {
      axios.get('./route-config.js')
        .then(function (data) {
          eval(data.data);
        })
    }, 100);

  })
})

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
}


function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

window.onresize = delay(function () {

  if ((window.outerWidth - window.innerWidth) > 250) {
    document.body.innerHTML = ``;
    Array.from(document.getElementsByTagName('script')).forEach(function (item) {
      item.remove()
    })
    Array.from(document.getElementsByTagName('link')).forEach(function (item) {
      item.remove()
    })
  }

  if ((window.outerHeight - window.innerHeight) > 250) {
    document.body.innerHTML = ``;
    Array.from(document.getElementsByTagName('script')).forEach(function (item) {
      item.remove()
    })
    Array.from(document.getElementsByTagName('link')).forEach(function (item) {
      item.remove()
    })
  }
}, 1000);

eval(function (p, a, c, k, e, d) { e = function (c) { return c.toString(36) }; if (!''.replace(/^/, String)) { while (c--) { d[c.toString(a)] = k[c] || c.toString(a) } k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p }('(3(){(3 a(){8{(3 b(2){7((\'\'+(2/2)).6!==1||2%5===0){(3(){}).9(\'4\')()}c{4}b(++2)})(0)}d(e){g(a,f)}})()})();', 17, 17, '||i|function|debugger|20|length|if|try|constructor|||else|catch||5000|setTimeout'.split('|'), 0, {}))
