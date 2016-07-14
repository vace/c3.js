module c3{

    /**
     * 一个二维平面 ,平面具有width,height,zIndex,material
     * @export
     * @class Plane
     * @extends {Display}
     */

    export class Plane extends Display{
        private $material:Material

        public get material():Material{
            return this.$material
        }
        public set material(material:Material){
            if(this.$material){
                this.$material._removeTarget(this)
            }
            this.$material = material
            material._addTarget(this)
            material.render(this)
        }
        
        constructor(width:number,height:number,zIndex:number = 0){
            super()
            this.size(width,height,zIndex)
            this.className = 'c3-plane'
            this.update()
        }
    }
}