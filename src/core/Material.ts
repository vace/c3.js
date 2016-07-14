/**
 * 材料，材料是由背景构成，一个材料可被多个对象使用
 */
module c3{
    enum KEYS {
        color,position,size,repeat,origin,clip,attachment,
        image,filter,hidden,visible,backface,opacity
    }

    export interface Itexture{
        color?:string,
        position?:string,
        size?:string,
        repeat?:string,
        origin?:string,
        clip?:string,
        attachment?:string,
        image?:string,
        filter?:string,
        /**
         * 隐藏材质 相当于 background:none 
         * @type {boolean}
         */
        hidden?:boolean,
        visible?:boolean,
        backface?:boolean,
        opacity?:number
    }

    export class Material extends HashObject {
        private $_attrs = [
            'transparent',//color
            '0% 0%',//position
            'auto auto',//size
            'repeat',//repeat
            '',//origin
            '',//clip
            '',//attachment
            '',//image
            '',//filter
            false,//hidden
            true,//visible
            true,//backface
            1//opacity
        ]

        public $targets:Display[] = []

        constructor(material:Itexture = {}){
            super()
            this.update(material)
        }

        public render(target?:Display){
            var attrs = this.$_attrs

            var css = {background:'none'},filter = '',t = this,bg = 'background'

            if(!attrs[KEYS.hidden]){
                css[bg] = `${attrs[KEYS.color]} ${attrs[KEYS.image]} ${attrs[KEYS.position]} ${attrs[KEYS.repeat]}`
                // console.log(css)
                attrs[KEYS.size] && (css[bg + 'Size'] = attrs[KEYS.size])
                attrs[KEYS.attachment] && (css[bg + 'Attachment'] = attrs[KEYS.attachment])
                attrs[KEYS.clip] && (css[bg + 'Clip'] = attrs[KEYS.clip])
                attrs[KEYS.origin] && (css[bg + 'Origin'] = attrs[KEYS.origin])

                if(attrs[KEYS.filter]){
                    css['filter'] = attrs[KEYS.filter]
                }
            }

            css['visibility'] = attrs[KEYS.visible] ? 'visible' : 'hidden'
            css['backface-visibility'] = attrs[KEYS.backface] ? 'visible' : 'hidden'

            if(typeof attrs[KEYS.opacity] === 'number'){
                css['opacity'] = attrs[KEYS.opacity]
            }

            var renderDisplay = (display:Display) => {
                display.css(css)
            }
            if(target){
                renderDisplay(target)
            }else{
                this.$targets.forEach(renderDisplay)
            }
        }

        public clone(){
            var material = new Material(),
                attrs = this.$_attrs
            var newobj = {}
            attrs.forEach((attr,index) => {
                newobj[KEYS[index]] = attr
            })
            material.update(newobj)

            return material
        }

        public update(material:Itexture = {}){
            var attrs = this.$_attrs,key,attr
            for(attr in material){
                key = KEYS[attr]
                if(typeof key === 'number'){
                    attrs[key] = material[attr]
                }
            }
            this.render()
        }

        public getAttr(attr:string):any{
            return this.$_attrs[KEYS[attr]]
        }

        public _addTarget(target:Display){
            this.$targets.push(target)
        }
        public _removeTarget(target:Display){
            var index = this.$targets.indexOf(target)
            if(index !== -1){
                this.$targets.splice(index,1)
            }
        }
    }
}