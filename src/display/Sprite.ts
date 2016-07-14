module c3{

    /** 
     * 一个展示组
     * @export
     * @class Sprite
     * @extends {Display}
     */

    export class Sprite extends Display{
        public $children:Display[] = []

        constructor(){
            super()
            this.el.className = 'c3-sprite'
        }

        public get children():Display[]{
            return this.$children
        }
        public get numChildren():number{
            return this.$children.length
        }

        public addChild(...displays:Display[]):void{
            displays.forEach(display => {
                this.$children.push(display)
                this.el.appendChild(display.el)
                display.$parent = this
            })
        }

        public removeChild(...displays:Display[]):void{
            displays.forEach(display => {
                var index = this.$children.indexOf(display)
                if(index !== -1){
                    this.el.removeChild(display.el)
                    this.$children.splice(index,1)
                    display.$parent = null
                }
            })
        }

        // 展示组具有材质属性
        private $material:Material[]

        public get material():Material[]{
            return this.$material
        }

        public set material(material:Material[]){
            var render = []
            if(!Array.isArray(material)){
                render = [material]
            }else{
                render = material
            }
            this.$material = render
            // 如果只有一个材质，则重复使用这个材质
            var len = render.length

            if(len !== 1 && len !== this.$children.length){
                throw "材质为1个或者与子Plane数量相同";
            }
            this.$children.forEach((plane:Plane,index) => plane.material = render[len === 1 ? 0 : index])
        }

    }
}