module c3{
    export class Stage extends Sprite{

        private $camera:Camera

        constructor(x?:number,y?:number,z?:number){
            super()
            this.size(x,y,z)
            // 全局容器
            this.className = 'c3-stage'
            // 相机容器
            var camera = this.$camera = new Camera()
            super.addChild(camera)        
        }

        public get camera():Camera{
            return this.$camera
        }

        public addChild(display:Display){
            this.$camera.addChild(display)
        }

        public removeChild(display:Display){
            this.$camera.removeChild(display)
        }

        public attach(el:Element|string){
            var ele:Element
            if(typeof el === 'string'){
                ele = document.querySelector(el)
            }else{
                ele = el
            }
            ele.appendChild(this.el)
        }

        public update(){
            var size = this.$size
            var fox = 0.5 / Math.tan((this.$camera.fov * 0.5) * MatrixMathUtil.DEGREES_TO_RADIANS) * size.y
            var perspective = Math.round(fox)
            this.css({perspective:perspective + 'px'})
            // this.$camera.translate(size.x / 2,size.y / 2,fox)
            this.$camera.update()
            // this.$camera.x,y,z
            this.translate(0,0,0)
            // super.update()
        }
    }
}