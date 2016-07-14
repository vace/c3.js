module c3{
    /*! The MIT License (MIT) https://github.com/vace/style.js */

    const prefixes = ['-webkit-', '-moz-', '-ms-']
    const camelPrefixes = ['Webkit', 'Moz', 'ms']
    const _cache = Object.create(null)

    var hyphenateRE = /([a-z\d])([A-Z])/g
    var camelizeRE = /-(\w)/g

    let testEl = null

    var hyphenate = str => str.replace(hyphenateRE,'$1-$2').toLowerCase()
    var camelize = str => str.replace(camelizeRE,(e,c) => c ? c.toUpperCase() : '')

    var normalize = prop => {
        if (_cache[prop]){
            return _cache[prop]
        }
        var res = prefix(prop)
        return (_cache[prop] = _cache[res] = res)
    }

    var prefix = prop => {
        prop = hyphenate(prop)
        var camel = camelize(prop)
        var upper = camel.charAt(0).toUpperCase() + camel.slice(1)
        if(!testEl){
            testEl = document.createElement('div')
        }
        var i = prefixes.length

        var prefixed

        while (i--) {
            prefixed = camelPrefixes[i] + upper
            if (prefixed in testEl.style) {
                return prefixes[i] + prop
            }
        }
        
        if (camel in testEl.style) {
            return prop
        }
    }
    var doc = document
    var toArr = obj => [].slice.call(obj)
    var qsa = sel => toArr(doc.querySelectorAll(sel))

    var addStyle = (el,styles) => {
        if(!(el instanceof Element)){
            return 
        }
        var name,prop,value

        // str
        if(isStr(styles)){
            el.style.cssText = styles
            return 
        }
        // object
        for(name in styles){
            if(styles.hasOwnProperty(name)){
                value = styles[name]
                prop = normalize(name)
                if(value !== null){
                    value += ''
                }
                if(value){
                    el.style.setProperty(prop,value)
                }else{
                    el.style.removeProperty(prop)
                }
            }
        }
    }

    var isStr = str => typeof str === 'string'


    export function style(els,styles:any,val?:any/*value*/){
        if (isStr(styles)){
            if(arguments.length === 3){
                styles = {[styles]:val}
            }
        }
        if(isStr(els)){
            els = qsa(els)
        }else if(Array.isArray(els)){
            var newels = []
            els.forEach(el => newels = newels.concat(isStr(el) ? qsa(el) : el))
            els = newels
        }else if(typeof els === 'object' && els.length){
            els = toArr(els)
        }else{
            els = [els]
        }
        els.forEach(el => addStyle(el,styles))
    }

}