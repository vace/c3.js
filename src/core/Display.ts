module c3{
    const PX = 'px'

    /**
     * 所有的3d展示元素基类
     * @export
     * @class Display
     * @extends {HashObject}
     */
    export class Display extends HashObject{
        // 由子类实现
        public el:HTMLElement
        protected $position = new Point(0,0,0)

        // css3,matrix3d
        protected $translate = new Vector3D(0,0,0)
        protected $scale = new Vector3D(1,1,1)
        protected $rotate = new Quaternion(0,0,0)
        protected $matrix3D = new Matrix3D()
        
        // 展示元素的尺寸，x:width,y:height，z:zIndex
        protected $size = new Point()

        /**
         * 
         * 展示元素父类 
         * @type {Display}
         */
        public $parent:Display = null

        public css(param){
            c3.css(this.el,param)
            return this
        }

        public on(type,cb,capture=false){
            this.el.addEventListener(type,cb.bind(this),capture)
            return this
        }
        public off(type,cb,capture=false){
            this.el.removeEventListener(type,cb.bind(this),capture)
            return this
        }
        public once(type,cb,capture=false){
            cb.bind(this)
            var el = this.el
            var once = () => {
                cb()
                el.removeEventListener(type,once,capture)
            }
            el.addEventListener(type,once,capture)
            return this
        }

        /**
         * 设置显示对象的位置
         * @param {number} x
         * @param {number} [y]
         * @param {number} [z]
         * @returns {Display}
         */
        public position(x:number,y?:number,z?:number):Display{
            this.$position.set(x,y,z)
            return this
        }

        public getPosition():Point{
            return this.$position
        }

        public size(x:number,y?:number,z?:number):Display{
            this.$size.set(x,y,z)
            this._doUpdateSize()
            return this
        }
        public getSize():Point{
            return this.$size
        }

        private _doUpdateSize(){
            var css = {
                width:this.$size.x + PX,
                height:this.$size.y + PX
            }
            if(this.$size.z){
                css['zIndex'] = this.$size.z
            }
            this.css(css)
        }
        
        public translate(x?:number,y?:number,z?:number):Display{
            this.$translate.set(x,y,z)
            return this
        }
        public getTranslate():Vector3D{
            return this.$translate
        }
        public rotate(x?:number,y?:number,z?:number):Display{
            this.$rotate.set(x,y,z)
            return this
        }
        public getRotate():Quaternion{
            return this.$rotate
        }
        public scale(x?:number,y?:number,z?:number):Display{
            this.$scale.set(x,y,z)
            return this
        }
        public getScale():Vector3D{
            return this.$scale
        }

        public update(){
            var pos = this.$position,trans = ''
            if(pos.x || pos.y || pos.z){
                trans = ` translate3d(${pos.x}px,${pos.y}px,${pos.z}px) `
            }
            this.css({transform:`translate3d(-50%, -50%, 0px) ` + this._getMatrix3dString() + trans})
        }
        
        protected _getMatrix3dString(){
            this.$matrix3D.makeTransform(this.$translate,this.$scale,this.$rotate)
            return this.$matrix3D.toString()
        }

        constructor(){
            super()
            this.el = document.createElement('div')
            this._initialize()
        }

        protected _initialize(){}

        private $visible:boolean = true
        public set visible(visib:boolean){
            this.$visible = visib
            this.el.style.opacity = visib ? 'visible' : 'hidden'
        }
        public get visible():boolean{
            return this.$visible
        }

        private $opacity:number = 1
        public get opacity():number{
            return this.$opacity
        }
        public set opacity(val:number){
            this.$opacity = val
            this.el.style.opacity = val.toString()
        }

        private $backface:boolean = true
        public set backface(backface:boolean){
            this.$backface = backface
            this.css({visibility:backface ? 'visible':'hidden'})
        }

        public get backface():boolean{
            return this.$backface
        }

        private $className = ''
        public set className(_class:string){
            this.$className = _class
            this.el.className = _class
        }
        public get className():string{
            return this.$className
        }

    }
}