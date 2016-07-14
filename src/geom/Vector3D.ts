module c3 {
    export class Vector3D {

        /**
        * X轴坐标 (1,0,0).
        */
        public static X_AXIS: Vector3D = new Vector3D(1, 0, 0);

        /**
        * Y轴坐标 (0,1,0).
        */
        public static Y_AXIS: Vector3D = new Vector3D(0, 1, 0);

        /**
        * Z轴坐标 (0,0,1).
        */
        public static Z_AXIS: Vector3D = new Vector3D(0, 0, 1);

        /**
        * 在三维空间中x坐标，默认值是0
        */
        public x: number = 0;


        /**
        * 在三维空间中y坐标，默认值是0
        */
        public y: number = 0;


        /**
        * 在三维空间中z坐标，默认值是0
        */
        public z: number = 0;

        /**
        * 可作为一种透视投影的三维位置或投影
        * 也可以做四元数中的w
        */
        public w: number = 0;

        

        /**
        * 向量的长度，原点(0, 0, 0)到(x, y, z)的距离
        */
        public get length(): number {
            return Math.sqrt(this.lengthSquared);
        }

        /**
        * 3维向量的坐标x的平方加 y的平方加 z的平方
        */
        public get lengthSquared(): number {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
        * 创建一个对象实例，默认为(0, 0, 0, 0)
        */
        constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

    
        /**
        * 向量相加，结果返回一个新实例
        * @returns Vector3D 结果返回
        */
        public add(a: Vector3D): Vector3D {
            return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w)
        }

        /**
        * 克隆一个Vector3D
        * @returns 返回克隆后的实例
        */
        public clone(): Vector3D {
            return new Vector3D(this.x, this.y, this.z, this.w);
        }

        /**
        * 复制Vector3D对象
        * @param src 数据源
        */
        public copyFrom(src: Vector3D): void {
            this.x = src.x;
            this.y = src.y;
            this.z = src.z;
            this.w = src.w;
        }

        
        /**
        * 两个Vector3D进行叉乘 this 叉乘 a
        * 叉乘后的结果是这两条向量的垂直向量
        * @param a 
        * @returns Vector3D 返回叉乘结果
        */
        public crossProduct(a: Vector3D): Vector3D {
            return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
        }


        /**
        * 当前向量减去a向量，结果赋值给自己
        * @param a 减去的向量
        */
        public decrementBy(a: Vector3D) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
        }

        /**
        * 计算两个Vector3D之间的距离
        * @param pt1 坐标1
        * @param pt2 坐标2
        * @returns number 两个Vector3D之间的距离
        */
        static distance(pt1: Vector3D, pt2: Vector3D): number {
            var x: number = (pt1.x - pt2.x);
            var y: number = (pt1.y - pt2.y);
            var z: number = (pt1.z - pt2.z);
            return Math.sqrt(x * x + y * y + z * z);
        }

       
        /**
        * 计算两个Vector3D的点积,返回两个Vector3D之间的夹角关系
        * @param a 另一个Vector3D
        * @returns number 返回两个Vector3D之间的夹角关系
        */
        public dotProduct(a: Vector3D): number {
            return this.x * a.x + this.y * a.y + this.z * a.z;
        }

        /**
        * 求两个Vector3D的值是否全等
        * @param toCompare 与些Vector3D进行比较
        * @param allFour 默认参数为1，是否比较w分量
        * @returns boolean 全等返回true
        */
        public equals(toCompare: Vector3D, allFour: boolean = false): boolean {
            return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
        }

       
        /**
        * 当前Vector3D加等于a Vector3D，只加x y z 3个分量
        * @param a 加等a
        */
        public incrementBy(a: Vector3D) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
        }

        /**
        * 当前Vector3D除分量 或者 除Vector3D
        * @param v 如果是number就是除分量 如果为Vector3D 就是除Vector3D
        * @return Vector3D 返回自己，计算之后的结果
        */
        public divide(v): Vector3D {
            if (v instanceof Vector3D) return new Vector3D(this.x / v.x, this.y / v.y, this.z / v.z);
            else {
                this.x = this.x / v;
                this.y = this.y / v;
                this.z = this.z / v;
            }
            return this;
        }

        /**
        * 当前Vector3D x y z 3个分量取反
        */
        public negate(): void {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        }

        /**
        * 当前Vector3D标准化
        * @param thickness 默认参数为1，使当前Vector3D的长度为thickness 原点(0, 0, 0)到(x, y, z)的距离
        */
        public normalize(thickness: number = 1) {
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                this.z *= invLength;
                return;
            }
        }

        /**
        * 当前Vector3D扩大s倍
        * @param s 扩大的倍数
        */
        public scaleBy(s: number): void {
            this.x *= s;
            this.y *= s;
            this.z *= s;
        }


        /**
        * 填充当前Vector3D的x, y, z
        * @param xa 
        * @param yz 
        * @param za 
        * @param wz
        */
        public setTo(xa: number, ya: number, za: number, wa:number = 1): void {
            this.x = xa;
            this.y = ya;
            this.z = za;
            this.w = wa;
        }

        public set(x:number = 0,y?:number,z?:number){
            
			// 处理 +1，-1的动画运算
			if(typeof x === 'string' || typeof y === 'string' || typeof z === 'string'){
				x = Number(x)
				y = Number(y)
				z = Number(z)

				if(x) this.x += x
				if(y) this.y += y
				if(z) this.z += z
				return this
			}
			if(y === void 0){
				y = z = 0
			}else if(z === void 0){
				z = 0
			}
			this.x = x
			this.y = y
			this.z = z
			return this
		}

        /**
        * 当前Vector3D减去a Vector3D 结果返回新实例
        * @param a 减去的Vector3D
        * @param target 默认参数为null,如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 结果返回
        */
        public subtract(a: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }
            target.setTo(this.x - a.x, this.y - a.y, this.z - a.z);
            return target;
        }

                
        /**
        * 当前Vector3D以字符串形式返回
        * @returns string
        */
        public toString(): string {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        }
                        
        /**
        * 解析字符串为Vector3D
        * @param str 格式用空格间隔开，只解析为x,y,z,x y z
        */
        public parsing(str: string): void {

            var strS: string[] = str.split(str.indexOf(',') !== -1 ? ',' : ' ')

            if (strS.length < 3)
                return;

            this.x = parseFloat(strS[0])
            this.y = parseFloat(strS[1])
            this.z = parseFloat(strS[2])
        }
    }
}
