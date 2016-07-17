# c3.js

**a lightweight and fast 3d css library.md,just 20KB, gzip:6.4 KB!!!**



## Demo

- [jsfiddle](https://jsfiddle.net/vace/xvvcc83u/embed/result,js,html,css/dark)
- [预览](https://vace.me/a/c3js/space.html)
- [平面，立方体，多面圆柱展示](https://vace.me/a/c3js/index.html)
- [材质贴图](https://vace.me/a/c3js/material.html)
- [仿3d全景](https://vace.me/a/c3js/pano.html)
- [魔方](https://vace.me/a/c3js/rubik.html)
- [带贴图的魔方](https://vace.me/a/c3js/superrubik.html)

## 安装 

1. 安装`typescript`: `npm install -g tsc`
2. 安装`uglify` : `npm install -g uglify`
3. 编译`npm run build`

## 使用

`npm install c3.js`

**CDM**

`var c3 = require('c3')`

**AMD**

`define(['c3'],function(c3){})`

**ES6**

`import c3 from 'c3'`

### html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>voxel.css</title>
        <link rel="stylesheet" href="css/voxel.css"></link>
    </head>
    <body>
        <script src="c3.js"></script>
        <script type="text/javascript">
        	// your js
        </script>
    </body>
</html>

```

### javascript

```javascript
// 创建舞台
var stage = new c3.Stage(window.innerWidth,window.innerHeight)
// 挂载舞台到页面,元素
stage.attach('body')
// 添加平面
var plane = new c3.Plane(width,height,zIndex)
// 添加立方体
var cube = new c3.Cube(xWidth,yWidth,zWidth)
// 添加分组
var group = new c3.Sprite()
// 添加多面体
var cylinder = new c3.Cylinder(width,height,number)
// 材质
var material = new c3.Material()
// 添加材质
cylinder.material = material
// 显示对象加到舞台中
stage.addChild(plane)
```

## Demo


## API

------------

### HashObject

`c3.js`的顶级对象。框架内所有对象的基类，为对象实例提供唯一的`hashCode`值。

#### 公共属性

* hashCode:string [只读] 返回此对象唯一的哈希值,用于唯一确定一个对象

------------

### Display Class extend HashObject

Display 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时中显示的所有对象。

#### 公共属性

* visible:boolean 显示对象是否可见
* backface:boolean 显示对象背面是否可见
* className:string 显示对象class类名
* opacity:number 显示对象的透明度

#### 公共方法

**大部分方法支持链式调用，其中`position`,`rotate`,`translate`,`scale`参数其中一个为字符串时表示变化值，如`rotate('+0.5',0,0)` => `rotate.x += 0.5`**

* `css(param:Object):Display` 为当前显示对象设置样式 如 `css({color:'red'})`
* `on(type:string,cb:Function[,capture:boolean]):Display` 为显示对象添加事件
* `once(type:string,cb:Function[,capture:boolean]):Display` 为显示对象添加事件,只触发一次
* `off(type:string,cb:Function[,capture:boolean]):Display` 删除对象中删除侦听器
* `position(x:number|string,y?:number|string,z?:number|string):Display` 设置显示对象的位置
* `getPosition():Point` 获取显示对象的位置
* `size(x:number|string,y?:number|string,z?:number|string):Display` 设置显示对象的尺寸和显示优先级
* `getSize():Point` 获取显示对象的尺寸
* `rotate(x:number|string,y?:number|string,z?:number|string):Display` 设置显示对象的旋转
* `getRotate():Quaternion` 获取显示对象的旋转四元数
* `scale(x:number|string,y?:number|string,z?:number|string):Display` 设置显示对象缩放
* `getScale():Vector3D` 获取显示对象的缩放
* `translate(x:number|string,y?:number|string,z?:number|string):Display` 设置显示对象位移
* `getTranslate():Vector3D` 获取显示对象的位移
* `update():void` 更新场景中的(position,translate,rotate,scale) 的设置


------------
### Sprite Class extends Display

Sprite 是基本显示列表构造块：一个可包含子项的显示列表节点。

#### 公共属性

* children:Display[] ,[只读]当前Sprite下的所有子显示对象
* numChildren:number ,[只读]当前Sprite下子项的数量
* material:Material[] 设置或者获取显示对象组的材质

#### 公共方法

* addChild(...displays:Display[]):void 添加显示对象到组内
* removeChild(...displays:Display[]):void 从组内移除对象


------------

### Stage Class extend Sprite

stage 为所有显示元件的顶级父对象，一个场景只能有一个stage。

#### 构造方法

`var stage = new c3.Stage(stageWidth,stageHeight)`

* `stageWidth` 舞台宽度
* `stageHeight` 舞台高度

#### 公共属性

* camera:c3.Camera 获取当前场景的`camera`

#### 公共方法

* attach(seletor:string) 挂载到某个元素上


------------

### Camera Class extend Sprite

camera 为 stage 的直接子元素。可以通过 `stage.camera` 引用

#### 属性

* `fov` 相机视锥体垂直视角

------------

### Plane Class extends Display 

一个二维平面 ,平面具有width,height,zIndex,material

#### 构造方法

`var plane = new c3.Plane(width,height,zIndex = 0)`

* width:number 平面宽度
* height:number 平面高度
* zIndex:number 平面的z-index

#### 属性

* material:Material 设置或者获取平面的材质


--------

### Cube Class extends Sprite

一个三维立方体空间

#### 构造方法

`var cube = new c3.Cube(x,y,z)`

* x:number 立方体x轴宽度
* y:number 立方体y轴宽度
* z:number 你放图z轴宽度

------

### Cylinder Class extends Sprite

多面圆柱，所有的面长宽是相等的

#### 构造方法

`var cylinder = new c3.Cylinder(width,height,num)`

* width:number 面宽
* height:number 面高
* num:number 面的个数

----------

### Material Class extends HashObject

一个材质可以被多个显示对象使用，每个显示对象只能有一个材质，这里的材质实质上是对于显示对象的css操作

#### 构造方法

`var material = new C3.Material(param:Itexture = {})`

Itexture 包括

* color?:string css:background-color
* position?:string css:background-position
* size?:string css:background-size
* repeat?:string css:background-repeat
* origin?:string css:background-origin
* clip?:string css:background-clip
* attachment?:string css:background-attachment
* image?:string css:background-image
* filter?:string css:filter
* hidden?:boolean css:background:none
* visible?:boolean css:visible
* backface?:boolean css:backface-visibility
* opacity?:number  css:opacity

#### 方法

* clone() 克隆当前材质
* update(param:Itexture = {}) 更新材质
* getAttr(attr) 获取材质属性值
* render(target?:Display) 将材质渲染到某个显示对象上


----------

### 辅助函数

* `c.style(el,param)` 为元素添加css,api可以见[style.js](https://github.com/vace/style.js)
* `c.rnd(min,max)` 生成指定区间的随机数
* `c.rndInt(min,max)` 生成指定区间的随机整数
* `c.rndColor()` 生成随机色值