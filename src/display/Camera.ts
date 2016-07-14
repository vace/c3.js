module c3{
    export class Camera extends Sprite{
        private $view:Sprite

        // 相机视锥体垂直视角
        public fov = 50

        // public aspect //— 相机视锥体宽高比
        // public near //— 相机视锥体近裁剪面
        // public far //— 相机视锥体远裁剪面。

        constructor(){
            super()
            this.className = 'c3-camera'
        }
        update(){
            this.css({transform:this._getMatrix3dString()});
        }

        // lookAt(at:Display){
        //     var eye = 
        // }
    } 
}