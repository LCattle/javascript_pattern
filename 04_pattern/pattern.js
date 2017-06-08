//1.安全工厂方法
/**
 * 将实际创建对象工作推迟到子类当中。这样核心类就成了抽象类，不过对于javascript不必这么深究，javascript没有像传统创建抽象类那样的方式轻易创建抽象类，
 * 所经在javascript中实现工厂方法模式我们只需要参考它的核心思想即可。
 * 所经将工厂方法看作是一个实例化对象的工厂类。
 * 为了安全起见，我们采用安全模式，而我们将创建对象的基类放在工厂方法类的原型即可。
 * 
 * 所谓的安全模式，就是通过instaceof关键字来判断当前this是不是类，如果是则通过new关键字创建并且返回回去，如果不是说明类在全局作用域中执行，
 * 当然this就指向了window了，这样我们就要重新返回新创建的对象了。
 * 
 * 
 * 工厂模式解决的问题是：
 * 每添加相同的某些类，就需要改动多处地方
 * @param {*} type 
 * @param {*} content 
 */
// 安全模式创建工厂类
var Factory = function (type, content) {
    if (this instanceof Factory) {
        var s = new this[type](content);
        return s;
    } else {
        return new Factory(type, content);
    }
}
// 工厂原型中设置创建所有类型数据对象的基类
// 每次添加新对象时，必须在Factory原型中注册
Factory.prototype = {
    java: function (content) {
        this.content = content;
        (function () {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid #000';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    javaScript: function (content) {
        this.content = content;
        (function () {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid #000';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    UI: function (content) {
        this.content = content;
        (function () {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid #000';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    php: function (content) {
        this.content = content;
        (function () {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid #000';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    ps: function (content) {
        this.content = content;
        (function () {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid #000';
            document.getElementById('container').appendChild(div);
        })(content);
    }
}

var data = [
    { type: 'javaScript', content: 'javascript很强势!' },
    { type: 'java', content: 'java很强势!' },
    { type: 'UI', content: 'UI很强势!' },
    { type: 'php', content: 'php很强势!' },
    { type: 'ps', content: 'ps很强势!' },
];

for (var i = 0; i < data.length; i++) {
    Factory(data[i].type, data[i].content)
}