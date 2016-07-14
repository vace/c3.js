var c3;
(function (c3) {
    var css = "\n.c3-stage {\n  -webkit-perspective: 800px;\n          perspective: 800px;\n  top: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.c3-stage,\n.c3-stage .c3-camera,\n.c3-stage .c3-sprite,\n.c3-stage .c3-plane,\n.c3-stage .c3-cube,\n.c3-stage .c3-cylinder {\n  position: absolute;\n  -webkit-transform-origin: 50% 50% 0px;\n          transform-origin: 50% 50% 0px;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n}\n.c3-stage .c3-camera {\n  top: 50%;\n  left: 50%;\n  will-change: transform;\n}";
    var doc = document;
    function writeCss(css) {
        var style = doc.createElement('style'), head = doc.head;
        style.type = 'text/css';
        var id = style.id = 'c3-inject-css-' + Math.random().toString(16).slice(2).toUpperCase();
        if (style['styleSheet']) {
            style['styleSheet'].cssText = css;
        }
        else {
            style.appendChild(doc.createTextNode(css));
        }
        head.appendChild(style);
        return id;
    }
    writeCss(css);
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    /*! The MIT License (MIT) https://github.com/vace/style.js */
    var prefixes = ['-webkit-', '-moz-', '-ms-'];
    var camelPrefixes = ['Webkit', 'Moz', 'ms'];
    var _cache = Object.create(null);
    var hyphenateRE = /([a-z\d])([A-Z])/g;
    var camelizeRE = /-(\w)/g;
    var testEl = null;
    var hyphenate = function (str) { return str.replace(hyphenateRE, '$1-$2').toLowerCase(); };
    var camelize = function (str) { return str.replace(camelizeRE, function (e, c) { return c ? c.toUpperCase() : ''; }); };
    var normalize = function (prop) {
        if (_cache[prop]) {
            return _cache[prop];
        }
        var res = prefix(prop);
        return (_cache[prop] = _cache[res] = res);
    };
    var prefix = function (prop) {
        prop = hyphenate(prop);
        var camel = camelize(prop);
        var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
        if (!testEl) {
            testEl = document.createElement('div');
        }
        var i = prefixes.length;
        var prefixed;
        while (i--) {
            prefixed = camelPrefixes[i] + upper;
            if (prefixed in testEl.style) {
                return prefixes[i] + prop;
            }
        }
        if (camel in testEl.style) {
            return prop;
        }
    };
    var doc = document;
    var toArr = function (obj) { return [].slice.call(obj); };
    var qsa = function (sel) { return toArr(doc.querySelectorAll(sel)); };
    var addStyle = function (el, styles) {
        if (!(el instanceof Element)) {
            return;
        }
        var name, prop, value;
        // str
        if (isStr(styles)) {
            el.style.cssText = styles;
            return;
        }
        // object
        for (name in styles) {
            if (styles.hasOwnProperty(name)) {
                value = styles[name];
                prop = normalize(name);
                if (value !== null) {
                    value += '';
                }
                if (value) {
                    el.style.setProperty(prop, value);
                }
                else {
                    el.style.removeProperty(prop);
                }
            }
        }
    };
    var isStr = function (str) { return typeof str === 'string'; };
    function style(els, styles, val /*value*/) {
        if (isStr(styles)) {
            if (arguments.length === 3) {
                styles = (_a = {}, _a[styles] = val, _a);
            }
        }
        if (isStr(els)) {
            els = qsa(els);
        }
        else if (Array.isArray(els)) {
            var newels = [];
            els.forEach(function (el) { return newels = newels.concat(isStr(el) ? qsa(el) : el); });
            els = newels;
        }
        else if (typeof els === 'object' && els.length) {
            els = toArr(els);
        }
        else {
            els = [els];
        }
        els.forEach(function (el) { return addStyle(el, styles); });
        var _a;
    }
    c3.style = style;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    function rnd(min, max) {
        return Math.random() * (max - min) + min;
    }
    c3.rnd = rnd;
    function rndInt(min, max) {
        return Math.round(rnd(min, max));
    }
    c3.rndInt = rndInt;
    function rndColor() {
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }
    c3.rndColor = rndColor;
})(c3 || (c3 = {}));
/**
 * 框架内所有对象的基类，为对象实例提供唯一的hashCode值。
 */
var c3;
(function (c3) {
    c3.$hashCount = 0;
    var HashObject = (function () {
        function HashObject() {
            this.$hashCode = c3.$hashCount++;
        }
        Object.defineProperty(HashObject.prototype, "hashCode", {
            get: function () {
                return this.$hashCode;
            },
            enumerable: true,
            configurable: true
        });
        return HashObject;
    })();
    c3.HashObject = HashObject;
})(c3 || (c3 = {}));
/**
 * Point 表示三维对象的某个点
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var c3;
(function (c3) {
    var pointPool = [];
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(x, y, z) {
            _super.call(this);
            this.set(x, y, z);
        }
        /**
         * [release 回收对象]
         * @param {Point} point [description]
         */
        Point.release = function (point) {
            if (point)
                pointPool.push(point);
        };
        /**
         * 快速创建空间点坐标
         * @static
         * @param {number} x
         * @param {number} y
         * @param {number} z
         * @returns
         */
        Point.create = function (x, y, z) {
            var point = pointPool.pop();
            if (!point) {
                point = new Point(x, y, z);
            }
            point.set(x, y, z);
            return point;
        };
        Point.distance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
        };
        /**
         * 设置坐标
         * @param {number} x
         * @param {number} y
         * @param {number} z
         * @returns
         */
        Point.prototype.set = function (x, y, z) {
            if (x === void 0) { x = 0; }
            // console.log(x,y,z)
            // 处理 +1，-1的动画运算
            if (typeof x === 'string' || typeof y === 'string' || typeof z === 'string') {
                x = Number(x);
                y = Number(y);
                z = Number(z);
                if (x)
                    this.x += x;
                if (y)
                    this.y += y;
                if (z)
                    this.z += z;
                return this;
            }
            if (y === void 0) {
                y = z = 0;
            }
            else if (z === void 0) {
                z = 0;
            }
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        /**
         * 克隆当前点，返回新的坐标点
         * @returns
         */
        Point.prototype.clone = function () {
            return new Point(this.x, this.y, this.z);
        };
        /**
         * 两个点是否代表一个位置
         * @param {Point} target
         * @returns
         */
        Point.prototype.equals = function (target) {
            return this.x === target.x && this.y === target.y && this.z === target.z;
        };
        Point.prototype.move = function (x, y, z) {
            if (x === void 0) { x = 1; }
            if (arguments.length === 1) {
                y = z = x;
            }
            else if (arguments.length === 2) {
                z = 0;
            }
            this.x += x;
            this.y += y;
            this.z += z;
            return this;
        };
        Object.defineProperty(Point.prototype, "length", {
            /**
             * 当前点距离中心点的长度
             * @readonly
             * @type {number}
             */
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 以String输出结果
         * @returns {string}
         */
        Point.prototype.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ", z=" + this.z + ")";
        };
        return Point;
    })(c3.HashObject);
    c3.Point = Point;
})(c3 || (c3 = {}));
/**
 * 材料，材料是由背景构成，一个材料可被多个对象使用
 */
var c3;
(function (c3) {
    var KEYS;
    (function (KEYS) {
        KEYS[KEYS["color"] = 0] = "color";
        KEYS[KEYS["position"] = 1] = "position";
        KEYS[KEYS["size"] = 2] = "size";
        KEYS[KEYS["repeat"] = 3] = "repeat";
        KEYS[KEYS["origin"] = 4] = "origin";
        KEYS[KEYS["clip"] = 5] = "clip";
        KEYS[KEYS["attachment"] = 6] = "attachment";
        KEYS[KEYS["image"] = 7] = "image";
        KEYS[KEYS["filter"] = 8] = "filter";
        KEYS[KEYS["hidden"] = 9] = "hidden";
        KEYS[KEYS["visible"] = 10] = "visible";
        KEYS[KEYS["backface"] = 11] = "backface";
        KEYS[KEYS["opacity"] = 12] = "opacity";
    })(KEYS || (KEYS = {}));
    var Material = (function (_super) {
        __extends(Material, _super);
        function Material(material) {
            if (material === void 0) { material = {}; }
            _super.call(this);
            this.$_attrs = [
                'transparent',
                '0% 0%',
                'auto auto',
                'repeat',
                '',
                '',
                '',
                '',
                '',
                false,
                true,
                true,
                1 //opacity
            ];
            this.$targets = [];
            this.update(material);
        }
        Material.prototype.render = function (target) {
            var attrs = this.$_attrs;
            var css = { background: 'none' }, filter = '', t = this, bg = 'background';
            if (!attrs[KEYS.hidden]) {
                css[bg] = attrs[KEYS.color] + " " + attrs[KEYS.image] + " " + attrs[KEYS.position] + " " + attrs[KEYS.repeat];
                // console.log(css)
                attrs[KEYS.size] && (css[bg + 'Size'] = attrs[KEYS.size]);
                attrs[KEYS.attachment] && (css[bg + 'Attachment'] = attrs[KEYS.attachment]);
                attrs[KEYS.clip] && (css[bg + 'Clip'] = attrs[KEYS.clip]);
                attrs[KEYS.origin] && (css[bg + 'Origin'] = attrs[KEYS.origin]);
                if (attrs[KEYS.filter]) {
                    css['filter'] = attrs[KEYS.filter];
                }
            }
            css['visibility'] = attrs[KEYS.visible] ? 'visible' : 'hidden';
            css['backface-visibility'] = attrs[KEYS.backface] ? 'visible' : 'hidden';
            if (typeof attrs[KEYS.opacity] === 'number') {
                css['opacity'] = attrs[KEYS.opacity];
            }
            var renderDisplay = function (display) {
                display.css(css);
            };
            if (target) {
                renderDisplay(target);
            }
            else {
                this.$targets.forEach(renderDisplay);
            }
        };
        Material.prototype.clone = function () {
            var material = new Material(), attrs = this.$_attrs;
            var newobj = {};
            attrs.forEach(function (attr, index) {
                newobj[KEYS[index]] = attr;
            });
            material.update(newobj);
            return material;
        };
        Material.prototype.update = function (material) {
            if (material === void 0) { material = {}; }
            var attrs = this.$_attrs, key, attr;
            for (attr in material) {
                key = KEYS[attr];
                if (typeof key === 'number') {
                    attrs[key] = material[attr];
                }
            }
            this.render();
        };
        Material.prototype.getAttr = function (attr) {
            return this.$_attrs[KEYS[attr]];
        };
        Material.prototype._addTarget = function (target) {
            this.$targets.push(target);
        };
        Material.prototype._removeTarget = function (target) {
            var index = this.$targets.indexOf(target);
            if (index !== -1) {
                this.$targets.splice(index, 1);
            }
        };
        return Material;
    })(c3.HashObject);
    c3.Material = Material;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    var PX = 'px';
    /**
     * 所有的3d展示元素基类
     * @export
     * @class Display
     * @extends {HashObject}
     */
    var Display = (function (_super) {
        __extends(Display, _super);
        function Display() {
            _super.call(this);
            this.$position = new c3.Point(0, 0, 0);
            // css3,matrix3d
            this.$translate = new c3.Vector3D(0, 0, 0);
            this.$scale = new c3.Vector3D(1, 1, 1);
            this.$rotate = new c3.Quaternion(0, 0, 0);
            this.$matrix3D = new c3.Matrix3D();
            // 展示元素的尺寸，x:width,y:height，z:zIndex
            this.$size = new c3.Point();
            /**
             *
             * 展示元素父类
             * @type {Display}
             */
            this.$parent = null;
            this.$visible = true;
            this.$opacity = 1;
            this.$backface = true;
            this.$className = '';
            this.el = document.createElement('div');
            this._initialize();
        }
        Display.prototype.css = function (param) {
            c3.css(this.el, param);
            return this;
        };
        Display.prototype.on = function (type, cb, capture) {
            if (capture === void 0) { capture = false; }
            this.el.addEventListener(type, cb.bind(this), capture);
            return this;
        };
        Display.prototype.off = function (type, cb, capture) {
            if (capture === void 0) { capture = false; }
            this.el.removeEventListener(type, cb.bind(this), capture);
            return this;
        };
        Display.prototype.once = function (type, cb, capture) {
            if (capture === void 0) { capture = false; }
            cb.bind(this);
            var el = this.el;
            var once = function () {
                cb();
                el.removeEventListener(type, once, capture);
            };
            el.addEventListener(type, once, capture);
            return this;
        };
        /**
         * 设置显示对象的位置
         * @param {number} x
         * @param {number} [y]
         * @param {number} [z]
         * @returns {Display}
         */
        Display.prototype.position = function (x, y, z) {
            this.$position.set(x, y, z);
            return this;
        };
        Display.prototype.getPosition = function () {
            return this.$position;
        };
        Display.prototype.size = function (x, y, z) {
            this.$size.set(x, y, z);
            this._doUpdateSize();
            return this;
        };
        Display.prototype.getSize = function () {
            return this.$size;
        };
        Display.prototype._doUpdateSize = function () {
            var css = {
                width: this.$size.x + PX,
                height: this.$size.y + PX
            };
            if (this.$size.z) {
                css['zIndex'] = this.$size.z;
            }
            this.css(css);
        };
        Display.prototype.translate = function (x, y, z) {
            this.$translate.set(x, y, z);
            return this;
        };
        Display.prototype.getTranslate = function () {
            return this.$translate;
        };
        Display.prototype.rotate = function (x, y, z) {
            this.$rotate.set(x, y, z);
            return this;
        };
        Display.prototype.getRotate = function () {
            return this.$rotate;
        };
        Display.prototype.scale = function (x, y, z) {
            this.$scale.set(x, y, z);
            return this;
        };
        Display.prototype.getScale = function () {
            return this.$scale;
        };
        Display.prototype.update = function () {
            var pos = this.$position, trans = '';
            if (pos.x || pos.y || pos.z) {
                trans = " translate3d(" + pos.x + "px," + pos.y + "px," + pos.z + "px) ";
            }
            this.css({ transform: "translate3d(-50%, -50%, 0px) " + this._getMatrix3dString() + trans });
        };
        Display.prototype._getMatrix3dString = function () {
            this.$matrix3D.makeTransform(this.$translate, this.$scale, this.$rotate);
            return this.$matrix3D.toString();
        };
        Display.prototype._initialize = function () { };
        Object.defineProperty(Display.prototype, "visible", {
            get: function () {
                return this.$visible;
            },
            set: function (visib) {
                this.$visible = visib;
                this.el.style.opacity = visib ? 'visible' : 'hidden';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display.prototype, "opacity", {
            get: function () {
                return this.$opacity;
            },
            set: function (val) {
                this.$opacity = val;
                this.el.style.opacity = val.toString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display.prototype, "backface", {
            get: function () {
                return this.$backface;
            },
            set: function (backface) {
                this.$backface = backface;
                this.css({ visibility: backface ? 'visible' : 'hidden' });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Display.prototype, "className", {
            get: function () {
                return this.$className;
            },
            set: function (_class) {
                this.$className = _class;
                this.el.className = _class;
            },
            enumerable: true,
            configurable: true
        });
        return Display;
    })(c3.HashObject);
    c3.Display = Display;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    /**
     * 一个展示组
     * @export
     * @class Sprite
     * @extends {Display}
     */
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.call(this);
            this.$children = [];
            this.el.className = 'c3-sprite';
        }
        Object.defineProperty(Sprite.prototype, "children", {
            get: function () {
                return this.$children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "numChildren", {
            get: function () {
                return this.$children.length;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.addChild = function () {
            var _this = this;
            var displays = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displays[_i - 0] = arguments[_i];
            }
            displays.forEach(function (display) {
                _this.$children.push(display);
                _this.el.appendChild(display.el);
                display.$parent = _this;
            });
        };
        Sprite.prototype.removeChild = function () {
            var _this = this;
            var displays = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displays[_i - 0] = arguments[_i];
            }
            displays.forEach(function (display) {
                var index = _this.$children.indexOf(display);
                if (index !== -1) {
                    _this.el.removeChild(display.el);
                    _this.$children.splice(index, 1);
                    display.$parent = null;
                }
            });
        };
        Object.defineProperty(Sprite.prototype, "material", {
            get: function () {
                return this.$material;
            },
            set: function (material) {
                var render = [];
                if (!Array.isArray(material)) {
                    render = [material];
                }
                else {
                    render = material;
                }
                this.$material = render;
                // 如果只有一个材质，则重复使用这个材质
                var len = render.length;
                if (len !== 1 && len !== this.$children.length) {
                    throw "材质为1个或者与子Plane数量相同";
                }
                this.$children.forEach(function (plane, index) { return plane.material = render[len === 1 ? 0 : index]; });
            },
            enumerable: true,
            configurable: true
        });
        return Sprite;
    })(c3.Display);
    c3.Sprite = Sprite;
})(c3 || (c3 = {}));
/*! vace_Vlm */
///<reference path="less/c3css.ts" />
///<reference path="utils/style.ts" />
///<reference path="utils/helper.ts" />
///<reference path="core/HashObject.ts" />
///<reference path="geom/Point.ts" />
///<reference path="core/Material.ts" />
///<reference path="core/Display.ts" />
///<reference path="display/Sprite.ts" />
var c3;
(function (c3) {
    function css(el, params) {
        if (params === void 0) { params = {}; }
        c3.style(el, params);
    }
    c3.css = css;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        // public aspect //— 相机视锥体宽高比
        // public near //— 相机视锥体近裁剪面
        // public far //— 相机视锥体远裁剪面。
        function Camera() {
            _super.call(this);
            // 相机视锥体垂直视角
            this.fov = 50;
            this.className = 'c3-camera';
        }
        Camera.prototype.update = function () {
            this.css({ transform: this._getMatrix3dString() });
        };
        return Camera;
    })(c3.Sprite);
    c3.Camera = Camera;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    var f0 = function (x) { return Math.round(x); };
    var FACE;
    (function (FACE) {
        FACE[FACE["FRONT"] = 0] = "FRONT";
        FACE[FACE["BACK"] = 1] = "BACK";
        FACE[FACE["LEFT"] = 2] = "LEFT";
        FACE[FACE["RIGHT"] = 3] = "RIGHT";
        FACE[FACE["UP"] = 4] = "UP";
        FACE[FACE["DOWN"] = 5] = "DOWN";
    })(FACE || (FACE = {}));
    /**
     * 一个立方体，立方体由六个面组成
     *
     * @export
     * @class Cube
     * @extends {Sprite}
     */
    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(x, y, z) {
            _super.call(this);
            this.xWidth = 0;
            this.yWidth = 0;
            this.zWidth = 0;
            this.className = 'c3-cube';
            var plane;
            for (var i = 0; i < 6; i++) {
                plane = new c3.Plane(0, 0);
                this.addChild(plane);
            }
            this.xWidth = x;
            this.yWidth = y;
            this.zWidth = z;
            this.updateCube();
        }
        Cube.prototype.updateCube = function () {
            var _a = this, xWidth = _a.xWidth, yWidth = _a.yWidth, zWidth = _a.zWidth, planes = this.$children, _w = f0(xWidth / 2), _h = f0(yWidth / 2), _d = f0(zWidth / 2);
            // console.log(_w,_h,_d)
            planes[FACE.FRONT].size(_w, _h, 0).translate(0, 0, -_d / 2).rotate(0, 0, 0).update();
            planes[FACE.BACK].size(_w, _h, 0).translate(0, 0, _d / 2).rotate(0, 180, 0).update();
            planes[FACE.LEFT].size(_d, _h, 0).translate(-_w / 2, 0, 0).rotate(0, 90, 0).update();
            planes[FACE.RIGHT].size(_d, _h, 0).translate(_w / 2, 0, 0).rotate(0, -90, 0).update();
            planes[FACE.UP].size(_w, _d, 0).translate(0, -_h / 2, 0).rotate(-90, 0, 0).update();
            planes[FACE.DOWN].size(_w, _d, 0).translate(0, _h / 2, 0).rotate(90, 0, 0).update();
        };
        return Cube;
    })(c3.Sprite);
    c3.Cube = Cube;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    var Cylinder = (function (_super) {
        __extends(Cylinder, _super);
        function Cylinder(width, height, num) {
            _super.call(this);
            this.className = 'c3-cylinder';
            this.w = width;
            this.h = height;
            this.n = num;
            var plane;
            while (num--) {
                plane = new c3.Plane(0, 0);
                this.addChild(plane);
            }
            this.updateCube();
        }
        Cylinder.prototype.updateCube = function () {
            var _a = this, w = _a.w, h = _a.h, n = _a.n;
            var planes = this.$children;
            var r = w / 2 / Math.tan(360 / n / 2 / 180 * Math.PI);
            var angle = 360 / n;
            planes.forEach(function (plane, index) {
                plane.size(w, h).position(0, 0, r).rotate(0, index * angle).update();
            });
        };
        return Cylinder;
    })(c3.Sprite);
    c3.Cylinder = Cylinder;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    /**
     * 一个二维平面 ,平面具有width,height,zIndex,material
     * @export
     * @class Plane
     * @extends {Display}
     */
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(width, height, zIndex) {
            if (zIndex === void 0) { zIndex = 0; }
            _super.call(this);
            this.size(width, height, zIndex);
            this.className = 'c3-plane';
            this.update();
        }
        Object.defineProperty(Plane.prototype, "material", {
            get: function () {
                return this.$material;
            },
            set: function (material) {
                if (this.$material) {
                    this.$material._removeTarget(this);
                }
                this.$material = material;
                material._addTarget(this);
                material.render(this);
            },
            enumerable: true,
            configurable: true
        });
        return Plane;
    })(c3.Display);
    c3.Plane = Plane;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage(x, y, z) {
            _super.call(this);
            this.size(x, y, z);
            // 全局容器
            this.className = 'c3-stage';
            // 相机容器
            var camera = this.$camera = new c3.Camera();
            _super.prototype.addChild.call(this, camera);
        }
        Object.defineProperty(Stage.prototype, "camera", {
            get: function () {
                return this.$camera;
            },
            enumerable: true,
            configurable: true
        });
        Stage.prototype.addChild = function (display) {
            this.$camera.addChild(display);
        };
        Stage.prototype.removeChild = function (display) {
            this.$camera.removeChild(display);
        };
        Stage.prototype.attach = function (el) {
            var ele;
            if (typeof el === 'string') {
                ele = document.querySelector(el);
            }
            else {
                ele = el;
            }
            ele.appendChild(this.el);
        };
        Stage.prototype.update = function () {
            var size = this.$size;
            var fox = 0.5 / Math.tan((this.$camera.fov * 0.5) * c3.MatrixMathUtil.DEGREES_TO_RADIANS) * size.y;
            var perspective = Math.round(fox);
            this.css({ perspective: perspective + 'px' });
            // this.$camera.translate(size.x / 2,size.y / 2,fox)
            this.$camera.update();
            // this.$camera.x,y,z
            this.translate(0, 0, 0);
            // super.update()
        };
        return Stage;
    })(c3.Sprite);
    c3.Stage = Stage;
})(c3 || (c3 = {}));
/*
    TODO
*/
var c3;
(function (c3) {
    var EventType = (function () {
        function EventType() {
        }
        // 将显示对象添加到舞台或者显示列表中
        EventType.ADDED = 'added';
        // 从舞台或者显示列表中移除显示对象
        EventType.REMOVED = 'removed';
        // 舞台更新
        EventType.UPDATE = 'update';
        // 添加到舞台
        EventType.RENDER = 'render';
        // 舞台尺寸或UI组件尺寸发生改变
        EventType.RESIZE = 'resize';
        return EventType;
    })();
    c3.EventType = EventType;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    /**
     * @class egret3d.Matrix3D
     * @classdesc
     * Matrix3D 类表示一个转换矩阵，该矩阵确定三维 (3D) 显示对象的位置和方向。
     * 该矩阵可以执行转换功能，包括平移（沿 x、y 和 z 轴重新定位）、旋转和缩放（调整大小）.
     * Matrix3D 类还可以执行透视投影，这会将 3D 坐标空间中的点映射到二维 (2D) 视图.
     * 单一矩阵可以将多个转换组合在一起，并一次性对 3D 显示对象应用这些转换.
     * 例如，可以将一个矩阵应用于 3D 坐标，以便依次执行旋转和平移.
     *
     */
    var Matrix3D = (function () {
        /**
        * 构造
        * @param datas {number[16]}
        */
        function Matrix3D(datas) {
            if (datas === void 0) { datas = null; }
            this.result = new Float32Array(16);
            this.m = new Float32Array(16);
            this.oRawData = new Float32Array(16);
            if (datas) {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        /**
        * 生成一个注视目标的矩阵.
        * @param eye 眼睛的位置.
        * @param at 目标的位置.
        * @param up 向上的方向.
        */
        Matrix3D.prototype.lookAt = function (eye, at, up) {
            var zaxis = at.subtract(eye);
            zaxis.normalize();
            var xaxis = up.crossProduct(zaxis);
            xaxis.normalize();
            var yaxis = zaxis.crossProduct(xaxis);
            var rawData = this.rawData;
            rawData[0] = xaxis.x;
            rawData[1] = yaxis.x;
            rawData[2] = zaxis.x;
            rawData[3] = 0;
            rawData[4] = xaxis.y;
            rawData[5] = yaxis.y;
            rawData[6] = zaxis.y;
            rawData[7] = 0;
            rawData[8] = xaxis.z;
            rawData[9] = yaxis.z;
            rawData[10] = zaxis.z;
            rawData[11] = 0;
            rawData[12] = -xaxis.dotProduct(eye);
            rawData[13] = -yaxis.dotProduct(eye);
            rawData[14] = -zaxis.dotProduct(eye);
            rawData[15] = 1;
        };
        /**
        * 返回一个当前矩阵的克隆矩阵
        * @returns Matrix3D 克隆后的矩阵
        */
        Matrix3D.prototype.clone = function () {
            var ret = new Matrix3D();
            ret.copyFrom(this);
            return ret;
        };
        /**
        * 把一个矩阵的值赋给当前矩阵.
        * @param sourceMatrix3D 源矩阵.
        * @returns 返回当前矩阵
        */
        Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
            var len = sourceMatrix3D.rawData.length;
            for (var c = 0; c < len; c++)
                this.rawData[c] = sourceMatrix3D.rawData[c];
            return this;
        };
        /**
        * 把一个 float 数组赋值给当前矩阵.
        * @param vector 源数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        */
        Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            if (transpose)
                this.transpose();
            var len = vector.length - index;
            for (var c = 0; c < len; c++)
                this.rawData[c] = vector[c + index];
            if (transpose)
                this.transpose();
        };
        /**
        * 单位化当前矩阵
        */
        Matrix3D.prototype.identity = function () {
            for (var i = 0; i < 16; i++) {
                this.rawData[i] = i % 5 ? 0 : 1;
            }
        };
        /**
        * 填充当前矩阵
        * @param value 填充的值
        */
        Matrix3D.prototype.fill = function (value) {
            for (var i = 0; i < 16; i++) {
                this.rawData[i] = value;
            }
        };
        /**
        * 生成一个变换矩阵
        * @param pos  位移
        * @param scale 缩放
        * @param rot 旋转
        */
        Matrix3D.prototype.makeTransform = function (pos, scale, rot) {
            var rawData = this.rawData, matrix = c3.MatrixMathUtil.CALCULATION_MATRIX.rawData;
            rot.toMatrix3D(c3.MatrixMathUtil.CALCULATION_MATRIX);
            rawData[0] = matrix[0] * scale.x;
            rawData[1] = matrix[1] * scale.y;
            rawData[2] = matrix[2] * scale.z;
            rawData[3] = 0;
            rawData[4] = matrix[4] * scale.x;
            rawData[5] = matrix[5] * scale.y;
            rawData[6] = matrix[6] * scale.z;
            rawData[7] = 0;
            rawData[8] = matrix[8] * scale.x;
            rawData[9] = matrix[9] * scale.y;
            rawData[10] = matrix[10] * scale.z;
            rawData[11] = 0;
            rawData[12] = pos.x;
            rawData[13] = pos.y;
            rawData[14] = pos.z;
            rawData[15] = 1;
        };
        /**
        * 当前矩阵转置
        */
        Matrix3D.prototype.transpose = function () {
            var rawData = this.rawData, orawData = this.oRawData;
            for (var i = 0; i < orawData.length; i++) {
                orawData[i] = this.rawData[i];
            }
            orawData[1] = orawData[4];
            orawData[2] = orawData[8];
            orawData[3] = orawData[12];
            orawData[4] = orawData[1];
            orawData[6] = orawData[9];
            orawData[7] = orawData[13];
            orawData[8] = orawData[2];
            orawData[9] = orawData[6];
            orawData[11] = orawData[14];
            orawData[12] = orawData[3];
            orawData[13] = orawData[7];
            orawData[14] = orawData[11];
        };
        /**
        * 生成一个(以x,y,z为中心轴旋转degrees角度)的矩阵
        * @param x 中心轴的x
        * @param y 中心轴的y
        * @param z 中心轴的z
        * @param degrees 旋转角度
        * @returns Matrix3D 矩阵
        */
        Matrix3D.getAxisRotation = function (x, y, z, degrees) {
            var m = new Matrix3D();
            var rad = degrees * (Math.PI / 180);
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var t = 1 - c;
            var tmp1, tmp2;
            m.rawData[0] = c + x * x * t;
            m.rawData[5] = c + y * y * t;
            m.rawData[10] = c + z * z * t;
            tmp1 = x * y * t;
            tmp2 = z * s;
            m.rawData[1] = tmp1 + tmp2;
            m.rawData[4] = tmp1 - tmp2;
            tmp1 = x * z * t;
            tmp2 = y * s;
            m.rawData[8] = tmp1 + tmp2;
            m.rawData[2] = tmp1 - tmp2;
            tmp1 = y * z * t;
            tmp2 = x * s;
            m.rawData[9] = tmp1 - tmp2;
            m.rawData[6] = tmp1 + tmp2;
            return m;
        };
        /**
        * 以字符串返回矩阵的值
        *
        * @returns string 字符
        */
        Matrix3D.prototype.toString = function () {
            var strArr = [], raw = this.rawData;
            for (var i = 0; i < 16; i++) {
                strArr.push(Math.round(raw[i] * 1000) / 1000);
            }
            return "matrix3d(" + strArr.join(',') + ")";
        };
        return Matrix3D;
    })();
    c3.Matrix3D = Matrix3D;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    var Vector3D = (function () {
        /**
        * 创建一个对象实例，默认为(0, 0, 0, 0)
        */
        function Vector3D(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            /**
            * 在三维空间中x坐标，默认值是0
            */
            this.x = 0;
            /**
            * 在三维空间中y坐标，默认值是0
            */
            this.y = 0;
            /**
            * 在三维空间中z坐标，默认值是0
            */
            this.z = 0;
            /**
            * 可作为一种透视投影的三维位置或投影
            * 也可以做四元数中的w
            */
            this.w = 0;
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Object.defineProperty(Vector3D.prototype, "length", {
            /**
            * 向量的长度，原点(0, 0, 0)到(x, y, z)的距离
            */
            get: function () {
                return Math.sqrt(this.lengthSquared);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3D.prototype, "lengthSquared", {
            /**
            * 3维向量的坐标x的平方加 y的平方加 z的平方
            */
            get: function () {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 向量相加，结果返回一个新实例
        * @returns Vector3D 结果返回
        */
        Vector3D.prototype.add = function (a) {
            return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
        };
        /**
        * 克隆一个Vector3D
        * @returns 返回克隆后的实例
        */
        Vector3D.prototype.clone = function () {
            return new Vector3D(this.x, this.y, this.z, this.w);
        };
        /**
        * 复制Vector3D对象
        * @param src 数据源
        */
        Vector3D.prototype.copyFrom = function (src) {
            this.x = src.x;
            this.y = src.y;
            this.z = src.z;
            this.w = src.w;
        };
        /**
        * 两个Vector3D进行叉乘 this 叉乘 a
        * 叉乘后的结果是这两条向量的垂直向量
        * @param a
        * @returns Vector3D 返回叉乘结果
        */
        Vector3D.prototype.crossProduct = function (a) {
            return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
        };
        /**
        * 当前向量减去a向量，结果赋值给自己
        * @param a 减去的向量
        */
        Vector3D.prototype.decrementBy = function (a) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
        };
        /**
        * 计算两个Vector3D之间的距离
        * @param pt1 坐标1
        * @param pt2 坐标2
        * @returns number 两个Vector3D之间的距离
        */
        Vector3D.distance = function (pt1, pt2) {
            var x = (pt1.x - pt2.x);
            var y = (pt1.y - pt2.y);
            var z = (pt1.z - pt2.z);
            return Math.sqrt(x * x + y * y + z * z);
        };
        /**
        * 计算两个Vector3D的点积,返回两个Vector3D之间的夹角关系
        * @param a 另一个Vector3D
        * @returns number 返回两个Vector3D之间的夹角关系
        */
        Vector3D.prototype.dotProduct = function (a) {
            return this.x * a.x + this.y * a.y + this.z * a.z;
        };
        /**
        * 求两个Vector3D的值是否全等
        * @param toCompare 与些Vector3D进行比较
        * @param allFour 默认参数为1，是否比较w分量
        * @returns boolean 全等返回true
        */
        Vector3D.prototype.equals = function (toCompare, allFour) {
            if (allFour === void 0) { allFour = false; }
            return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
        };
        /**
        * 当前Vector3D加等于a Vector3D，只加x y z 3个分量
        * @param a 加等a
        */
        Vector3D.prototype.incrementBy = function (a) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
        };
        /**
        * 当前Vector3D除分量 或者 除Vector3D
        * @param v 如果是number就是除分量 如果为Vector3D 就是除Vector3D
        * @return Vector3D 返回自己，计算之后的结果
        */
        Vector3D.prototype.divide = function (v) {
            if (v instanceof Vector3D)
                return new Vector3D(this.x / v.x, this.y / v.y, this.z / v.z);
            else {
                this.x = this.x / v;
                this.y = this.y / v;
                this.z = this.z / v;
            }
            return this;
        };
        /**
        * 当前Vector3D x y z 3个分量取反
        */
        Vector3D.prototype.negate = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        };
        /**
        * 当前Vector3D标准化
        * @param thickness 默认参数为1，使当前Vector3D的长度为thickness 原点(0, 0, 0)到(x, y, z)的距离
        */
        Vector3D.prototype.normalize = function (thickness) {
            if (thickness === void 0) { thickness = 1; }
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                this.z *= invLength;
                return;
            }
        };
        /**
        * 当前Vector3D扩大s倍
        * @param s 扩大的倍数
        */
        Vector3D.prototype.scaleBy = function (s) {
            this.x *= s;
            this.y *= s;
            this.z *= s;
        };
        /**
        * 填充当前Vector3D的x, y, z
        * @param xa
        * @param yz
        * @param za
        * @param wz
        */
        Vector3D.prototype.setTo = function (xa, ya, za, wa) {
            if (wa === void 0) { wa = 1; }
            this.x = xa;
            this.y = ya;
            this.z = za;
            this.w = wa;
        };
        Vector3D.prototype.set = function (x, y, z) {
            if (x === void 0) { x = 0; }
            // 处理 +1，-1的动画运算
            if (typeof x === 'string' || typeof y === 'string' || typeof z === 'string') {
                x = Number(x);
                y = Number(y);
                z = Number(z);
                if (x)
                    this.x += x;
                if (y)
                    this.y += y;
                if (z)
                    this.z += z;
                return this;
            }
            if (y === void 0) {
                y = z = 0;
            }
            else if (z === void 0) {
                z = 0;
            }
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        /**
        * 当前Vector3D减去a Vector3D 结果返回新实例
        * @param a 减去的Vector3D
        * @param target 默认参数为null,如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 结果返回
        */
        Vector3D.prototype.subtract = function (a, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Vector3D();
            }
            target.setTo(this.x - a.x, this.y - a.y, this.z - a.z);
            return target;
        };
        /**
        * 当前Vector3D以字符串形式返回
        * @returns string
        */
        Vector3D.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        };
        /**
        * 解析字符串为Vector3D
        * @param str 格式用空格间隔开，只解析为x,y,z,x y z
        */
        Vector3D.prototype.parsing = function (str) {
            var strS = str.split(str.indexOf(',') !== -1 ? ',' : ' ');
            if (strS.length < 3)
                return;
            this.x = parseFloat(strS[0]);
            this.y = parseFloat(strS[1]);
            this.z = parseFloat(strS[2]);
        };
        /**
        * X轴坐标 (1,0,0).
        */
        Vector3D.X_AXIS = new Vector3D(1, 0, 0);
        /**
        * Y轴坐标 (0,1,0).
        */
        Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
        /**
        * Z轴坐标 (0,0,1).
        */
        Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
        return Vector3D;
    })();
    c3.Vector3D = Vector3D;
})(c3 || (c3 = {}));
var c3;
(function (c3) {
    /**
     * @class egret3d.Quaternion
     * @classdesc
     * Quaternion类
     *
     * 定义了一个四元数表示物体在空间的旋转。
     * 四元数通常用作替代欧拉角和旋转矩阵的方式来实现平滑插值和避免万向节锁
     * 注意，这四元数类不自动保持四元数标准化。因此，在必要的时候，必须采取单位化的四元数，通过调用单位化方法
     * @version Egret 3.0
     */
    var Quaternion = (function (_super) {
        __extends(Quaternion, _super);
        function Quaternion(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            _super.call(this, x, y, z, w);
            this._x = 0;
            this._y = 0;
            this._z = 0;
        }
        /**
        * 用数值表示给定的欧拉旋转填充四元数对象。
        *
        * @param ax x轴旋转角度
        * @param ay y轴旋转角度
        * @param az z轴旋转角度
        * @return Quaternion 四元数对象
        * @version Egret 3.0
        */
        Quaternion.prototype.fromEulerAngles = function (ax, ay, az) {
            ax *= c3.MatrixMathUtil.DEGREES_TO_RADIANS;
            ay *= c3.MatrixMathUtil.DEGREES_TO_RADIANS;
            az *= c3.MatrixMathUtil.DEGREES_TO_RADIANS;
            var halfX = ax * 0.5, halfY = ay * 0.5, halfZ = az * 0.5;
            var cosX = Math.cos(halfX), sinX = Math.sin(halfX);
            var cosY = Math.cos(halfY), sinY = Math.sin(halfY);
            var cosZ = Math.cos(halfZ), sinZ = Math.sin(halfZ);
            this.w = cosX * cosY * cosZ + sinX * sinY * sinZ;
            this.x = sinX * cosY * cosZ - cosX * sinY * sinZ;
            this.y = cosX * sinY * cosZ + sinX * cosY * sinZ;
            this.z = cosX * cosY * sinZ - sinX * sinY * cosZ;
            return this;
        };
        Quaternion.prototype.set = function (x, y, z) {
            if (x === void 0) { x = 0; }
            // 处理 +1，-1的动画运算
            if (typeof x === 'string' || typeof y === 'string' || typeof z === 'string') {
                x = Number(x);
                y = Number(y);
                z = Number(z);
                if (x)
                    this._x += x;
                if (y)
                    this._y += y;
                if (z)
                    this._z += z;
                this.fromEulerAngles(this._x, this._y, this._z);
                return this;
            }
            if (y === void 0) {
                y = z = 0;
            }
            else if (z === void 0) {
                z = 0;
            }
            this._x = x;
            this._y = y;
            this._z = z;
            this.fromEulerAngles(x, y, z);
            return this;
        };
        /**
        * 以字符串形式返回四元数的值
        * @returns string
        * @version Egret 3.0
        */
        Quaternion.prototype.toString = function () {
            return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")";
        };
        /**
        * 把一个四元数转换成矩阵
        * @param target 返回转换后的矩阵，如果为null就新建一个对象返回
        * @see egret3d.Matrix3D
        * @returns  Matrix3D 返回转换后的矩阵
        * @version Egret 3.0
        */
        Quaternion.prototype.toMatrix3D = function (target) {
            if (target === void 0) { target = null; }
            var rawData = c3.MatrixMathUtil.RAW_DATA_CONTAINER;
            var xy2 = 2.0 * this.x * this.y, xz2 = 2.0 * this.x * this.z, xw2 = 2.0 * this.x * this.w;
            var yz2 = 2.0 * this.y * this.z, yw2 = 2.0 * this.y * this.w, zw2 = 2.0 * this.z * this.w;
            var xx = this.x * this.x, yy = this.y * this.y, zz = this.z * this.z, ww = this.w * this.w;
            rawData[0] = xx - yy - zz + ww;
            rawData[4] = xy2 - zw2;
            rawData[8] = xz2 + yw2;
            rawData[12] = 0;
            rawData[1] = xy2 + zw2;
            rawData[5] = -xx + yy - zz + ww;
            rawData[9] = yz2 - xw2;
            rawData[13] = 0;
            rawData[2] = xz2 - yw2;
            rawData[6] = yz2 + xw2;
            rawData[10] = -xx - yy + zz + ww;
            rawData[14] = 0;
            rawData[3] = 0.0;
            rawData[7] = 0.0;
            rawData[11] = 0;
            rawData[15] = 1;
            if (!target)
                return new c3.Matrix3D(new Float32Array(rawData));
            target.copyRawDataFrom(rawData);
            return target;
        };
        /**
        * 克隆一个四元数
        * @returns Quaternion 当前四元数复制后返回.
        * @version Egret 3.0
        */
        Quaternion.prototype.clone = function () {
            return new Quaternion(this.x, this.y, this.z, this.w);
        };
        return Quaternion;
    })(c3.Vector3D);
    c3.Quaternion = Quaternion;
})(c3 || (c3 = {}));
///<reference path="./Matrix3D.ts" />
///<reference path="./Vector3D.ts" />
///<reference path="./Quaternion.ts" />
var c3;
(function (c3) {
    /**
    * 可使用 MatrixMathUtil 类 进行3d矩阵的计算
    */
    var MatrixMathUtil = (function () {
        function MatrixMathUtil() {
        }
        /**
        * 四元数转矩阵
        * @param quarternion 源四元数
        * @param m 目标矩阵 默认为null 如果为null将会new 一个Matrix3D
        * @returns 返回转出矩阵
        */
        MatrixMathUtil.quaternion2matrix = function (quarternion, m) {
            if (m === void 0) { m = null; }
            var x = quarternion.x;
            var y = quarternion.y;
            var z = quarternion.z;
            var w = quarternion.w;
            var xx = x * x;
            var xy = x * y;
            var xz = x * z;
            var xw = x * w;
            var yy = y * y;
            var yz = y * z;
            var yw = y * w;
            var zz = z * z;
            var zw = z * w;
            var raw = MatrixMathUtil.RAW_DATA_CONTAINER;
            raw[0] = 1 - 2 * (yy + zz);
            raw[1] = 2 * (xy + zw);
            raw[2] = 2 * (xz - yw);
            raw[4] = 2 * (xy - zw);
            raw[5] = 1 - 2 * (xx + zz);
            raw[6] = 2 * (yz + xw);
            raw[8] = 2 * (xz + yw);
            raw[9] = 2 * (yz - xw);
            raw[10] = 1 - 2 * (xx + yy);
            raw[3] = raw[7] = raw[11] = raw[12] = raw[13] = raw[14] = 0;
            raw[15] = 1;
            if (m) {
                m.copyRawDataFrom(raw);
                return m;
            }
            else
                return new c3.Matrix3D(new Float32Array(raw));
        };
        /**
        * 1弧度为多少角度
        */
        MatrixMathUtil.RADIANS_TO_DEGREES = 180 / Math.PI;
        /**
        * 1角度为多少弧度
        */
        MatrixMathUtil.DEGREES_TO_RADIANS = Math.PI / 180;
        /**
        * @private
        * 1角度为多少弧度
        */
        MatrixMathUtil.RAW_DATA_CONTAINER = new Float32Array(16);
        /**
        * @private
        */
        MatrixMathUtil.CALCULATION_MATRIX = new c3.Matrix3D();
        /**
        * @private
        */
        MatrixMathUtil.CALCULATION_QUATERNION = new c3.Quaternion();
        /**
        * @private
        */
        MatrixMathUtil.CALCULATION_VECTOR3D = new c3.Vector3D();
        return MatrixMathUtil;
    })();
    c3.MatrixMathUtil = MatrixMathUtil;
})(c3 || (c3 = {}));
