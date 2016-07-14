/*
    TODO
*/
module c3{

    export class EventType{
        // 将显示对象添加到舞台或者显示列表中
        static ADDED = 'added'
        // 从舞台或者显示列表中移除显示对象
        static REMOVED = 'removed'
        // 舞台更新
        static UPDATE = 'update'
        // 添加到舞台
        static RENDER = 'render'
        // 舞台尺寸或UI组件尺寸发生改变
        static RESIZE = 'resize'
    }
}