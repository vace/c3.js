module c3{
    export function rnd(min,max) {
		return Math.random() * (max - min) + min
 	}

	export function rndInt(min,max){
		return Math.round(rnd(min,max))
	}

	export function rndColor(){
		return "#"+((1<<24)*Math.random()|0).toString(16)
	}
}