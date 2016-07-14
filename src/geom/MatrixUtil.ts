///<reference path="./Matrix3D.ts" />
///<reference path="./Vector3D.ts" />
///<reference path="./Quaternion.ts" />

module c3 {
    /**
    * 可使用 MatrixMathUtil 类 进行3d矩阵的计算
    */
    export class MatrixMathUtil {

        /**
        * 1弧度为多少角度
        */
        public static RADIANS_TO_DEGREES: number = 180 / Math.PI;

        /**
        * 1角度为多少弧度
        */
        public static DEGREES_TO_RADIANS: number = Math.PI / 180;

        /**
        * @private
        * 1角度为多少弧度
        */
        public static RAW_DATA_CONTAINER: Float32Array = new Float32Array(16);

        /**
        * @private
        */
        public static CALCULATION_MATRIX: Matrix3D = new Matrix3D();

        /**
        * @private
        */
        public static CALCULATION_QUATERNION: Quaternion = new Quaternion();

        /**
        * @private
        */
        public static CALCULATION_VECTOR3D: Vector3D = new Vector3D();

        /**
        * 四元数转矩阵
        * @param quarternion 源四元数
        * @param m 目标矩阵 默认为null 如果为null将会new 一个Matrix3D
        * @returns 返回转出矩阵
        */
        public static quaternion2matrix(quarternion: Quaternion, m: Matrix3D = null): Matrix3D {
            var x: number = quarternion.x;
            var y: number = quarternion.y;
            var z: number = quarternion.z;
            var w: number = quarternion.w;

            var xx: number = x * x;
            var xy: number = x * y;
            var xz: number = x * z;
            var xw: number = x * w;

            var yy: number = y * y;
            var yz: number = y * z;
            var yw: number = y * w;

            var zz: number = z * z;
            var zw: number = z * w;

            var raw: Float32Array = MatrixMathUtil.RAW_DATA_CONTAINER;
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
            } else
                return new Matrix3D(new Float32Array(raw));
        }
    }
} 