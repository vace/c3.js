module c3 {
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
    export class Quaternion  extends Vector3D{
        constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
            super(x,y,z,w)
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
        public fromEulerAngles(ax: number, ay: number, az: number):Quaternion {
            ax *= MatrixMathUtil.DEGREES_TO_RADIANS;
            ay *= MatrixMathUtil.DEGREES_TO_RADIANS;
            az *= MatrixMathUtil.DEGREES_TO_RADIANS;

            var halfX: number = ax * 0.5, halfY: number = ay * 0.5, halfZ: number = az * 0.5;
            var cosX: number = Math.cos(halfX), sinX: number = Math.sin(halfX);
            var cosY: number = Math.cos(halfY), sinY: number = Math.sin(halfY);
            var cosZ: number = Math.cos(halfZ), sinZ: number = Math.sin(halfZ);

            this.w = cosX * cosY * cosZ + sinX * sinY * sinZ;
            this.x = sinX * cosY * cosZ - cosX * sinY * sinZ;
            this.y = cosX * sinY * cosZ + sinX * cosY * sinZ;
            this.z = cosX * cosY * sinZ - sinX * sinY * cosZ;

            return this;
        }
        private _x:number = 0
        private _y:number = 0
        private _z:number = 0
        public set(x:number = 0,y?:number,z?:number){
			// 处理 +1，-1的动画运算
			if(typeof x === 'string' || typeof y === 'string' || typeof z === 'string'){
				x = Number(x)
				y = Number(y)
				z = Number(z)

				if(x) this._x += x
				if(y) this._y += y
				if(z) this._z += z

                this.fromEulerAngles(this._x,this._y,this._z)
				return this
			}
			if(y === void 0){
				y = z = 0
			}else if(z === void 0){
				z = 0
			}
            this._x = x
            this._y = y
            this._z = z
			this.fromEulerAngles(x,y,z)
			return this
		}

        /**
        * 以字符串形式返回四元数的值
        * @returns string
        * @version Egret 3.0
        */
        public toString(): string {
            return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")";
        }

       
        /**
        * 把一个四元数转换成矩阵
        * @param target 返回转换后的矩阵，如果为null就新建一个对象返回
        * @see egret3d.Matrix3D
        * @returns  Matrix3D 返回转换后的矩阵
        * @version Egret 3.0
        */
        public toMatrix3D(target: Matrix3D = null): Matrix3D {
            var rawData: Float32Array = MatrixMathUtil.RAW_DATA_CONTAINER;
            var xy2: number = 2.0 * this.x * this.y, xz2: number = 2.0 * this.x * this.z, xw2: number = 2.0 * this.x * this.w;
            var yz2: number = 2.0 * this.y * this.z, yw2: number = 2.0 * this.y * this.w, zw2: number = 2.0 * this.z * this.w;
            var xx: number = this.x * this.x, yy: number = this.y * this.y, zz: number = this.z * this.z, ww: number = this.w * this.w;

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
                return new Matrix3D(new Float32Array(rawData));

            target.copyRawDataFrom(rawData);

            return target;
        }

        /**
        * 克隆一个四元数
        * @returns Quaternion 当前四元数复制后返回.
        * @version Egret 3.0
        */
        public clone(): Quaternion {
            return new Quaternion(this.x, this.y, this.z, this.w);
        }
        
    }

} 