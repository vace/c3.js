module c3 {
   

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
    export class Matrix3D {
        
        /**
        * 一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一行或一列
        */
        public rawData: Float32Array;
        private result: Float32Array = new Float32Array(16);
        private m: Float32Array = new Float32Array(16);
        /**
        * 构造
        * @param datas {number[16]}
        */
        constructor(datas: Float32Array = null) {
            if (datas)
            {
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
        public lookAt(eye: Vector3D, at: Vector3D, up: Vector3D) {
            var zaxis: Vector3D = at.subtract(eye);
            zaxis.normalize();
            var xaxis: Vector3D = up.crossProduct(zaxis);
            xaxis.normalize();
            var yaxis = zaxis.crossProduct(xaxis);

            var rawData = this.rawData

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
        }
       

        
        /**
        * 返回一个当前矩阵的克隆矩阵
        * @returns Matrix3D 克隆后的矩阵
        */
        public clone(): Matrix3D {
            var ret: Matrix3D = new Matrix3D();
            ret.copyFrom(this);
            return ret;
        }

        /**
        * 把一个矩阵的值赋给当前矩阵.
        * @param sourceMatrix3D 源矩阵.
        * @returns 返回当前矩阵
        */
        public copyFrom(sourceMatrix3D: Matrix3D): Matrix3D {
            var len: number = sourceMatrix3D.rawData.length;
            for (var c: number = 0; c < len; c++)
                this.rawData[c] = sourceMatrix3D.rawData[c];
            return this;
        }

        /**
        * 把一个 float 数组赋值给当前矩阵.
        * @param vector 源数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        */
        public copyRawDataFrom(vector: Float32Array, index: number = 0, transpose: boolean = false): void {
            if (transpose)
                this.transpose();

            var len: number = vector.length - index;
            for (var c: number = 0; c < len; c++)
                this.rawData[c] = vector[c + index];

            if (transpose)
                this.transpose();
        }

        /**
        * 单位化当前矩阵
        */
        public identity() {
            for(var i = 0 ; i < 16 ; i++){
                this.rawData[i] = i % 5 ? 0 : 1
            }
        }

        /**
        * 填充当前矩阵
        * @param value 填充的值
        */
        public fill( value:number ) {
            for(var i = 0 ; i < 16 ; i++){
                this.rawData[i] = value
            }
        }

      
        
        /**
        * 生成一个变换矩阵
        * @param pos  位移
        * @param scale 缩放
        * @param rot 旋转
        */
        public makeTransform(pos: Vector3D, scale: Vector3D, rot: Quaternion) {
            var rawData = this.rawData,
                matrix = MatrixMathUtil.CALCULATION_MATRIX.rawData

            rot.toMatrix3D(MatrixMathUtil.CALCULATION_MATRIX);

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
        }

       

        


        private oRawData: Float32Array = new Float32Array(16);
                
        /**
        * 当前矩阵转置
        */
        public transpose() {
           var rawData = this.rawData,
               orawData = this.oRawData

            for (var i: number = 0; i < orawData.length; i++ ){
                orawData[i] = this.rawData[i] ;
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
        }
                        
        /**
        * 生成一个(以x,y,z为中心轴旋转degrees角度)的矩阵
        * @param x 中心轴的x
        * @param y 中心轴的y
        * @param z 中心轴的z
        * @param degrees 旋转角度
        * @returns Matrix3D 矩阵
        */
        public static getAxisRotation(x: number, y: number, z: number, degrees: number): Matrix3D {
            var m: Matrix3D = new Matrix3D();

            var rad = degrees * (Math.PI / 180);
            var c: number = Math.cos(rad);
            var s: number = Math.sin(rad);
            var t: number = 1 - c;
            var tmp1: number, tmp2: number;

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
        }


        /**
        * 以字符串返回矩阵的值
        *  
        * @returns string 字符
        */
        public toString(): string {
            var strArr = [],raw = this.rawData
            for(var i = 0; i < 16; i++){
                strArr.push(Math.round(raw[i] * 1000) / 1000)
            }
            return `matrix3d(${strArr.join(',')})`
        }

    }
}