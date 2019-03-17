var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 5

autoSetCanvas(yyy)
listenToUser(yyy)

/*橡皮擦*/
var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

/*自适应设置canvas宽高*/
function autoSetCanvas(canvas){
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }

  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height =  pageHeight
  }
}

/*监听用户鼠标事件*/
function listenToUser(canvas){
  var using = false
  var lastPoint = {x: undefined, y: undefined}

  if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        lastPoint = {x:x, y:y}
      }     
    }

    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if(!using){
        return
      }
      if(eraserEnabled){
          context.clearRect(x-5,y-5,10,10)
      }else{
        var newPoint = {x:x, y:y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      using = false
    } 
  }else{
    //非触屏设备
    canvas.onmousedown = function(aaa){
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        lastPoint = {x:x, y:y}
      }     
    }
    
    canvas.onmousemove = function(aaa){
      var x = aaa.clientX
      var y = aaa.clientY
      if(!using){
        return
      }
      if(eraserEnabled){
          context.clearRect(x-5,y-5,10,10)
      }else{
        var newPoint = {x:x, y:y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function(){
      using = false
    } 
  }

}

/*canvasApi*/
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,2*Math.PI);
  context.fill()
}
function drawLine(x1, y1, x2, y2){
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
} 

/*其他颜色*/
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  $(this).addClass('active')
  .siblings()
  .removeClass('active')
}

red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  $(this).addClass('active')
  .siblings()
  .removeClass('active')
}

green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  $(this).addClass('active')
  .siblings()
  .removeClass('active')
}

blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  $(this).addClass('active')
  .siblings()
  .removeClass('active')
}


/* 新增选项 */
thin.onclick = function(){
  lineWidth = 5
}

thick.onclick = function(){
  lineWidth = 10
}
clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}
save.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的图画'
  a.target = '_blank'
  a.click()
}