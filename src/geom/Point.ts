/**
 * Point 表示三维对象的某个点
 */

module c3{
	var pointPool:Point[] = []

	export class Point extends HashObject{
		/**
		 * [release 回收对象]
		 * @param {Point} point [description]
		 */
		public static release(point:Point){
			if(point)
				pointPool.push(point)
		}

		/**
		 * 快速创建空间点坐标
		 * @static
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @returns
		 */
		public static create(x:number,y:number,z:number){
			var point = pointPool.pop()
			if(!point){
				point = new Point(x,y,z)
			}
			point.set(x,y,z)
			return point
		}

		public static distance(p1:Point,p2:Point){
			return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
		}

		/**
		 * 空间x坐标 
		 * @type {number}
		 */
		public x:number

		/**
		 * 空间y坐标 
		 * @type {number}
		 */
		public y:number

		/**
		 * 空间z坐标 
		 * @type {number}
		 */
		public z:number

		
		constructor(x?:number,y?:number,z?:number){
			super()
			this.set(x,y,z)
		}

		/**
		 * 设置坐标
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @returns
		 */
		public set(x:number = 0,y?:number,z?:number){
			// console.log(x,y,z)
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
		 * 克隆当前点，返回新的坐标点 
		 * @returns
		 */
		public clone(){
			return new Point(this.x,this.y,this.z)
		}

		/**
		 * 两个点是否代表一个位置
		 * @param {Point} target
		 * @returns
		 */
		public equals(target:Point){
			return this.x === target.x && this.y === target.y && this.z === target.z
		}

		public move(x:number = 1,y?:number,z?:number):Point{
			if(arguments.length === 1){
				y = z = x
			}else if(arguments.length === 2){
				z = 0
			}
			this.x += x
			this.y += y
			this.z += z
			return this
		}
		/**
		 * 当前点距离中心点的长度
		 * @readonly
		 * @type {number}
		 */
		public get length():number{
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		}

		/**
		 * 以String输出结果 
		 * @returns {string}
		 */
		public toString():string {
            return `(x=${this.x}, y=${this.y}, z=${this.z})`
        }
	}
}