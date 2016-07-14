module c3{
    var css = `
.c3-stage {
  -webkit-perspective: 800px;
          perspective: 800px;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.c3-stage,
.c3-stage .c3-camera,
.c3-stage .c3-sprite,
.c3-stage .c3-plane,
.c3-stage .c3-cube,
.c3-stage .c3-cylinder {
  position: absolute;
  -webkit-transform-origin: 50% 50% 0px;
          transform-origin: 50% 50% 0px;
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}
.c3-stage .c3-camera {
  top: 50%;
  left: 50%;
  will-change: transform;
}`
  var doc = document
  function writeCss(css){
    var style = doc.createElement('style'),
    head = doc.head
    style.type = 'text/css'
    var id = style.id = 'c3-inject-css-' + Math.random().toString(16).slice(2).toUpperCase()
    if(style['styleSheet']){
      style['styleSheet'].cssText = css 
    }else{
      style.appendChild(doc.createTextNode(css));
    }
    head.appendChild(style)
    return id
  }

  writeCss(css)
}
