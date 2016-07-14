module c3{
    var f0 = x => Math.round(x)

    enum FACE {
        FRONT,BACK,LEFT,RIGHT,UP,DOWN
    }
    /**
     * 一个立方体，立方体由六个面组成 
     * 
     * @export
     * @class Cube
     * @extends {Sprite}
     */
    export class Cube extends Sprite{
        constructor(x?:number,y?:number,z?:number){
            super()

            this.className = 'c3-cube'

            var plane:Plane
            for(var i = 0; i < 6 ; i++){
                plane = new Plane(0,0)
                this.addChild(plane)
            }
            this.xWidth = x
            this.yWidth = y
            this.zWidth = z
            this.updateCube()
        }


        protected xWidth:number = 0
        protected yWidth:number = 0
        protected zWidth:number = 0
        updateCube(){
            var {xWidth,yWidth,zWidth} = this,
                planes = this.$children,
                _w = f0(xWidth / 2),
                _h = f0(yWidth / 2),
                _d = f0(zWidth / 2)
            // console.log(_w,_h,_d)
            planes[FACE.FRONT].size(_w, _h, 0).translate(0, 0, -_d / 2).rotate(0, 0, 0).update()
            planes[FACE.BACK].size(_w, _h, 0).translate(0, 0, _d / 2).rotate(0, 180, 0).update()
            planes[FACE.LEFT].size(_d, _h, 0).translate(-_w / 2, 0, 0).rotate(0, 90, 0).update()
            planes[FACE.RIGHT].size(_d, _h, 0).translate(_w / 2, 0, 0).rotate(0, -90, 0).update()
            planes[FACE.UP].size(_w, _d, 0).translate(0, -_h / 2, 0).rotate(-90, 0, 0).update()
            planes[FACE.DOWN].size(_w, _d, 0).translate(0, _h / 2, 0).rotate(90, 0, 0).update()
        }
    }
}