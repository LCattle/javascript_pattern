// 1.用对象收编变量
var checkObj = {
    checkName: function () {},
    checkEmail: function () {},
    checkPassword: function () {}
}

// 2.另一种形式
// 在使用new关键字创建新对象时，新对象并不能继承以下的三个方法
var checkObj2 = function () {};
checkObj2.checkName = function () {},
checkObj2.checkEmail = function () {},
checkObj2.checkPassword = function () {}

// 3.为了解决上面用new关键字创建新对象时，可以将这些方法放在一个函数对象中
// 虽然能实现了每个人在使用时就互不影响，但并不是一个真的类，所以我们需要稍微改造一下(如4)
var checkObj3 =function () {
    return {
        checkName: function () {},
        checkEmail: function () {},
        checkPassword: function (){}
    }
}

// 5.那么这就是一个真正的类了
// 把所有的方法放在函数内部了，通过this定义的，所以每一次通过new关键字创建新对象的时候，新创建的对象都会对类的this上的属性进行复制，这样做会
// 造成比较多的消耗所以我们还需要稍微改造一下(如6)
var checkObj4 = function () {
    this.checkName = function () {},
    this.checkEmail = function () {},
    this.checkPassword = function () {}
}

// 6.这种方式可以减少消耗
var checkObj5 = function () {};
// 6.1 创建出来的对象所用有的方法就都是一个，因为它们都要依赖prototype原型依次寻找，而找到的都是同一个，它们都绑定在prototype上，但我们要书写多次的prototype，所以可以改造一下(如6.2)
checkObj5.prototype.checkName = function () {};
checkObj5.prototype.checkEmail = function () {};
checkObj5.prototype.checkPassword = function () {};
// 6.2 虽然减少书写prototype，但为了可维护和直观，建议不要和6.1的书写方式混写，否则在后面为对象的原型对象赋值新对象时，会覆盖掉之前的prototype对象赋值的方法
// 但这样写在调用时会多次书写对象，如: checkObj5.xxxx(); checkObj5.xxx()....,我们稍微改造一下(如7)
checkObj5.prototype = {
    checkName: function () {},
    checkEmail: function () {},
    checkPassword: function () {}
}

// 7.在调用的时候不需要书写多次对象名，如: checkObj6.checkName().checkEmail().xxxx()...
// 同样也可以放在原型书写的方式中(如8)
var checkObj6 = {
    checkName: function () {
        return this;
    },
    checkEmail: function () {
        return this;
    },
    checkPassword: function () {
        return this;
    }
}

// 8.在使用的时候，也要用new关键字来进行创建对象，在调用方法时(如7)
var checkObj7 = function() {};
checkObj7.prototype = {
    checkName: function () {
        return this
    },
    checkEmail: function () {
        return this;
    },
    checkPassword: function () {
        return this;
    }
}
//==========================================================以下是Prototype.js对javascript func的拓展=================================================
// 9.prototype拓展函数
// 这种拓展方法一般不用，因为污染了全局，别人创建的对象同样被污染，所以为了造成不必要的开销，我们稍微改一下(如10)
Function.prototype.checkName = function () {};
// 9.1函数式调用
var f = function() {}
f.checkName();
// 9.2类式调用
var ff = new Function();
ff.checkName();

// 10.下面两种方式(10.1 / 10.2)都不会污染全局
// 10.1
Function.prototype.addMethod = function (name, fn) {
    this[name] = fn;
};
// 10.2
// 这样写的话，同样要把对象进行多次的书写，那么我们稍微改造一下，改为可以链式调用(如11)
var methods = new Function();
methods.addMethod('checkName', function () {});
methods.addMethod('checkEmail', function () {});
methods.checkName();
methods.checkEmail();

//11.下面两种(11.1 / 11.2)都可以实现链式调用添加的主方法，一种是函数式(11.1)，一种是类式(11.2)
// 11.1 函数式书写
Function.prototype.addMethod = function (name, fn) {
    this[name] = fn;
    return this;
}
var methods = function () {};
methods.addMethod('checkName', function () {
    return this;
}).addMethod('checkEmail', function () {
    return this;
});
methods.checkName().checkEmail();
//11.2 类式书写, 区别在于把添加的方法挂载到原型上，调用时需要使用new关键字
Function.prototype.addMethod = function (name, fn) {
    this.prototype[name] = fn;
    return this;
}
var methods = function () {};
methods.addMethod('checkName', function () {
    return this;
}).addMethod('checkEmail', function () {
    return this;
})
var m = new methods();
m.checkName().checkEmail();

