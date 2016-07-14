/**
 * 框架内所有对象的基类，为对象实例提供唯一的hashCode值。
 */

module c3{

	export interface IHashObject{
		/**
		 * [hashCode 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。]
		 * @type {number}
		 */
		hashCode:number
	}

	export var $hashCount = 0

	export class HashObject{
		private $hashCode:number

		constructor(){
			this.$hashCode = $hashCount++
		}

		public get hashCode():number{
			return this.$hashCode
		}
	}

}