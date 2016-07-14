module c3{
    export class Cylinder extends Sprite{
        private w:number
        private h:number
        private n:number
        constructor(width:number,height:number,num:number){
            super()
            this.className = 'c3-cylinder'
            this.w = width
            this.h = height
            this.n = num
            var plane
            while (num--) {
                plane = new Plane(0,0)
                this.addChild(plane)
            }
            this.updateCube()
        }

        updateCube(){
            var {w,h,n} = this
            var planes = this.$children
            var r = w / 2 / Math.tan(360 / n / 2   / 180 * Math.PI)
            var angle = 360 / n

            planes.forEach((plane,index) => {
                plane.size(w,h).position(0,0,r).rotate(0,index * angle).update()
            })
        }
    }
}