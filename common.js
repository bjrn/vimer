/**
 * IntersectionObserver magic from https://aerotwist.com/
 * Snow effect, from: HTML5 Rocks
 * https://github.com/html5rocks/www.html5rocks.com/blob/9318b5755c8c17a4bd1761bca6b1b491e7fd17b8/content/index.html
 */
!(function() {
  var masthead = document.querySelector('.masthead');
  if (!masthead) {
    return;
  }

  function j() {
    (f = c.clientWidth),
      (g = c.clientHeight),
      (d.width = f),
      (d.height = g),
      (e.fillStyle = '#FFF');
    var a = i;
    (i = f > 600), !a && i && requestAnimationFrame(n);
  }
  function n() {
    if ((e.clearRect(0, 0, f, g), i)) {
      for (h = 0; b > h; h++)
        (m = l[h]),
          (m.y += m.vy),
          (m.x += m.vx),
          (e.globalAlpha = m.o),
          e.beginPath(),
          e.arc(m.x, m.y, m.r, 0, 2 * Math.PI, !1),
          e.closePath(),
          e.fill(),
          m.y > g && m.reset();
      requestAnimationFrame(n);
    }
  }
  var a = new Date().getMonth();
  // if (11 === a) {
  if (1 === 1) {
    var b = 100,
      c = masthead;
    if (c) {
      var d = document.createElement('canvas'),
        e = d.getContext('2d'),
        f = c.clientWidth,
        g = c.clientHeight,
        h = 0,
        i = !1,
        k = function() {
          (this.x = 0),
            (this.y = 0),
            (this.vy = 0),
            (this.vx = 0),
            (this.r = 0),
            this.reset();
        };
      (k.prototype.reset = function() {
        (this.x = Math.random() * f),
          (this.y = Math.random() * -g),
          (this.vy = 1 + 3 * Math.random()),
          (this.vx = 0.5 - Math.random()),
          (this.r = 1 + 2 * Math.random()),
          (this.o = 0.5 + 0.5 * Math.random());
      }),
        (d.style.position = 'absolute'),
        (d.style.left = d.style.top = '0');
      var m,
        l = [];
      for (h = 0; b > h; h++) (m = new k()), m.reset(), l.push(m);
      (window.requestAnimFrame = (function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(a) {
            window.setTimeout(a, 1e3 / 60);
          }
        );
      })()),
        j(),
        window.addEventListener('resize', j, !1),
        c.appendChild(d);
    }
  }

  if (new Date().getMonth() !== 11) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    return;
  }

  var observer = new IntersectionObserver(
    function(entries) {
      entries.sort(function(a, b) {
        return b.time - a.time;
      });

      var isActive = i;
      i = entries[0].intersectionRatio > 0.01;

      if (i && !isActive) {
        console.log('snow: on');
        requestAnimationFrame(n);
      } else {
        if (i !== isActive) {
          console.log('snow: off');
        }
      }
    },
    { rootMargin: '0px', threshold: 0.01 }
  );

  observer.observe(masthead);
})();
