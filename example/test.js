
var stage,sprite
window.addEventListener('load',function(){
	// dev area
	stage = new c3.Stage(window.innerWidth,window.innerHeight)
	stage.css({'backgroundColor':'rgb(204, 204, 204)'})
	stage.attach('.c3-view')
	// 一个分组盛放面集合
	var group1 = new c3.Sprite()
	stage.addChild(group1)
	// 面
    var plane = new c3.Plane(100,100)
	plane.position(100,0,0)
	.rotate(45,0,0).update()
	group1.addChild(plane)

	var material = new c3.Material({
		color:'white',
		opacity:0.6,
		backface:true
		// ,image:'url(images/crash.gif)',
		// size:'100% 100%'
	})

	plane.material = material

	// cube
	var cube = new c3.Cube(200,100,100)
	cube.position(0,0,0).rotate(20,30,40).translate(0,200,0).update()
	cube.material = material
	group1.addChild(cube)
	

	var cylinder = new c3.Cylinder(100,300,8)

	cylinder.material = material

	group1.addChild(cylinder)

	cylinder.translate(0,-100,0).update()


	
	function update(){
		cube.rotate(0,0,'-1').update()
		requestAnimationFrame(update)
	}

	// update()
})