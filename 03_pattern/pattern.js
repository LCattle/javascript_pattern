// 1.简单工厂模式 simple factory
/**
 * 这种方式很像寄生式继承，只不过没有继承任何类或对象。
 * @param {*} name 
 * @param {*} time 
 * @param {*} type 
 */
function createBook (name, time, type) {
    var o = new Object();
    o.name = name;
    o.time = time;
    o.type = type;
    o.getName = function (){
        console.log(this.name);
    }
    return o;
}
console.log('---------------------简单工厂模式----------------------');
var Book1 = createBook('java', '2017', 'java');
var Book2 = createBook('javascript', '2019', 'js');
Book1.getName();
Book2.getName();
