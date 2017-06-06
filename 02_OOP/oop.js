// 1.属性与方法封装
/** 在类创建对象时，每个对象自身都拥有一份并且可以在外部访问到，因些通过this创建的属性可看作是对象共有属性和对象共有方法，而通过this创建的方法，不但可以访问这些对象的共有属性与共有方法， 
 而且还能访问到类(创建时)或对象自身的私有属性和私有方法，由于这些方法权得比较大，所以我们将它看作特权方法。
 在对象创建时通过使用这些特权方法我们可以初始化实例如对象的一些属性，因些这些在创建对象时调用的特权方法还可以看作是类的构造器。
*/
/** 通过javascript函数级作用域的特征来实现在函数内部创建外界就访问不到的私有化变量和私有化方法。
 通过new关键字实例化对象时，由于对类执行一次，所以类的内部this上定义的属性和方法自然就可以复制到新创建的对象上，成为对象公有化的属性和方法，
 其中的一些方法能访问到类的私有属性和方法。
*/
var Book = function (id, name, price) {
    // 私有属性
    var num = 1;
    // 私有方法
    function checkId() {

    }
    // 特权方法
    this.getName = function () { };
    this.getPrice = function () { };
    this.setName = function () { };
    this.setPrice = function () { };
    // 公有属性
    this.id = id;
    // 公有方法
    this.copy = function () { };
    // 构造器
    this.setName = function (name) { };
    this.setPrice = function (price) { };
}

/** 通过new关键字创建新对象时，由于类外面通过点语法添加的属性和方法没有执行到，所以新创建的对象中无法获取他们，但是可以通过类来使用。
    因些在类外面通过点语法定久的属性以及方法被称为类的静态共有属性和方法。
    而类通过prototype创建的属性或者方法在类实例的对象中是可以通过this访问到的，所以我们将prototype对象中的属性和方法称为共有属性和方法。
    如下:
*/
Book.isChinese = true;
Book.resetTime = function () {
    console.log('new Time');
};

Book.prototype = {
    isJSBook: false,
    display: function () {

    }
};

var b = new Book(11, 'JS 设计模式', 50);
console.log(b.num);
console.log(b.isJSBook);
console.log(b.id);
console.log(b.isChinese);
console.log(b.resetTime);

// 2.通过闭包来实现
/**
 * 闭包是有权访问另外一个函数作用域中变量的函数，即在一个函数内部创建另钼个函数。
 * 我们将这个闭包作为创建对象的构造函数(如2.1)，它既是闭包又是可实例对象的函数，即可访问到类函数作用域中的变量，如bookNum这个变量，此时这个变量叫静态私有变量，并且checkBook()
 * 可称之为静态私有方法。当然闭包内部也有其自身的私有变量以及私有方法如price, checkID()。
 * 但是，在闭包外部添加原型属性和方法看上去像脱离了闭包这个类，所以有时候在闭包内部实现一个完整的类然后将其返回(如2.2)。
 */
// 2.1
var Book2 = (function () {
    var bookNum = 0;
    function checkBook() {

    }
    return function (newId, newName, newPrice) {
        var name, price;
        function checkId(id) { }
        this.getName = function () { };
        this.getPrice = function () { };
        this.setName = function () { };
        this.setPrice = function () { };
        this.id = newId;
        this.copy = function () { };
        bookNum++;
        if (bookNum > 100) {
            throw new Error('我们公出版100本书.');
        }
        this.setName(name);
        this.setPrice(price);
    }

})();
// 2.2
// 利用闭包实现，调用时需谨慎(如2.3 / 2.4)
var Book3 = (function () {
    // 静态私有属性
    var bookNum = 0;
    // 静态私有方法
    function checkBook(name) { }
    // 创建类
    function _book(newId, newName, newPrice) {
        // 私有属性
        var name, price;
        // 私有方法
        function checkId() { };
        // 特权方法
        this.getName = function () { };
        this.getPrice = function () { };
        this.setName = function () { };
        this.setPrice = function () { };
        // 公有属性
        this.id = newId;
        this.name = newName;
        // 公有方法
        this.copy = function () { };
        bookNum++;
        if (bookNum > 100) {
            throw new Error('我们仅出版100本书.');
        }
        // 构造器
        this.setName = function (name) { };
        this.setPrice = function (price) { };
    }
    // 构建原型
    _book.prototype = {
        // 静态公有属性
        isJSBook: true,
        // 静态公有方法
        display: function () { }
    };
    // 返回类 
    return _book;
})();
//2.3 当中调用时，如果没有用new关键字，则会把对象下面的所有属性和方法挂载到window下,如何避免这种情况呢？(如2.5)
var bb = Book3(11, '成为前端大神之路', 120);
console.log(window.name);
//2.4 调用时应当使用new关键字进行实例化
var bbb = new Book3(11, '成为前端大神之路', 120);
console.log(bbb.id);

// 2.5 通过instanceof这个关键字来进行判断对比
var Book4 = (function () {
    // 静态私有属性
    var bookNum = 0;
    // 静态私有方法
    function checkBook(name) { }
    // 创建类
    function _book2(newId, newName, newPrice) {
        // 判断执行过程序中this是否是当前这个对象
        if (this instanceof Book4) {
            // 私有属性
            var name, price;
            // 私有方法
            function checkId() { };
            // 特权方法
            this.getName = function () { };
            this.getPrice = function () { };
            this.setName = function () { };
            this.setPrice = function () { };
            // 公有属性
            this.id = newId;
            this.name = newName;
            // 公有方法
            this.copy = function () { };
            bookNum++;
            if (bookNum > 100) {
                throw new Error('我们仅出版100本书.');
            }
            // 构造器
            this.setName = function (name) { };
            this.setPrice = function (price) { };
            // 否则重新创建这个对象
        } else {
            return new _book2(newId, newName, newPrice);
        }
    }
    // 构建原型
    _book2.prototype = {
        // 静态公有属性
        isJSBook: true,
        // 静态公有方法
        display: function () { }
    };
    // 返回类
    return _book2;
})();
// 通过启动安全模式，在代码中用instanceof这个关键字进行判断比较之后，可以不使用new关键字也同样可以进行添加
var c = Book4(11, '成为前端大神之路4', 120);
console.log(c.name);

// =================================================== 继承 ============================================================================
// 3.类式继承
/** 
 * 简单理解： 生命两个类，不过类式继承需要将第一个类的实例赋值给第二个类的原型。
 * 类的原型对象的作用就是为类的原型添加共有方法，但类不能直接访问这些属性和方法，必须通过原型prototype来访问。
 * 而我们实例化一个父类时，新创建的对象复制了父类的构造函数内的属性与方法并且将原型_proto_指向了父类的原型对象，这样就拥有了父类原型对象上的属性与方法，
 * 并且这个新创建的对象可直接访问到父类原型对象上的属性和方法。如果我们将这个新创建的对象赋值给子类的原型，那么子类的原型就可以访问到父类的原型属性和方法。
 * 新创建的对象不仅仅可以访问到父类原型上的属性和方法，同样也可以访问从父类构造函数中复制的属性和方法。将这个对象赋值给子类的原型，
 * 那么这个子类的原型同样可以访问父类原型上的属性和方法与父类构造中复制的属性和方法。
 * 
 * 同样可以用instanceof来判断某个对象是否继承了某个类。如3.1
*/
function SuperClass() {
    this.superVal = true;
}
SuperClass.prototype.getSuperVal = function () {
    return this.superVal;
}
function SubClass() {
    this.subVal = false;
}
SubClass.prototype = new SuperClass();
SubClass.prototype.getSubVal = function () {
    return this.subVal;
}

var instance = new SubClass();
console.log(instance.getSuperVal());
console.log(instance.getSubVal());

// 3.1
console.log('3.1 instanceof 判断类继承的实例------------------');
console.log(instance instanceof SuperClass);
console.log(instance instanceof SubClass);
console.log(SubClass instanceof SuperClass);
// 为什么SubClass instanceof SuperClass 得到的结果为false?
/**
 * 原理: instanceof 是判断前面的对象是否是后面类的实例，它并不表示两者之间的继承
 * 如上3.0，是把SuperClass的实例赋值给SubClass的原型，所以是SubClass.prototype继承了SuperClass
 */
console.log('3.1 用instanceof判断子类的prototype------------------------------');
console.log(SubClass.prototype instanceof SuperClass)

//3.2 
/**
 *  用这种类式继承有两个缺点： 
 *  其一，由于子类通过其原型prototype对父类实像化，继承了父类。
 *      父类中的共有属性要是引用类型，就会在子类中衩所有实例共用，因此一个子类的实例更改子类原型从父类构造函数中继承来的共有属性就会直接影响到其他子类。
 *  其二，由于子类实现的继承是靠原型prototype对父类的实例化实现的，因些在创父类的时候，是无法向父母类传递参数的，
 *      因为在实例化父类的时候也无法对父类构造函数内的属性进行初始化。 
 *  如下代码块:
 *  如何解决这个共享和传参的问题呢？ 如4
 */

function SuperClass() {
    this.books = ['javascript', 'java', 'css'];
}
function SubClass() { };
SubClass.prototype = new SuperClass();
var instance1 = new SubClass();
var instance2 = new SubClass();
console.log('类型继承，引用类型无论是修改还是删除都有对所有继承了父类的子类进行操作---------------------------------');
console.log(instance1.books);
instance2.books.push('html');
console.log(instance2.books);
console.log(instance1.books);


// 4.构造函数继承
/**
 * call() 这个方法是构造函数式继承的精华，由于call这个方法可以更改函数的作用环境，因些在子类中，调用这个方法就是将子类中的变量在父类中执行一遍，
 * 由于父类中是给this绑定属性扣，因此子类自然也就继承了父类的共有属性。由于这种类型的继承没有涉及prototype，所以父类的原型方法自然不会被子类继承，
 * 而如果要想被子类继承就必须要放在构造函数中，这样创建出来的每个实例都会单独拥有一份而不能共用，这样就违背了代码的复用性，
 * 为了综合这两种模式的有点，后来有了组合式继承(如5)。
 * @param {* number} id 
 */
function SuperClass(id) {
    // 引用类型共有属性
    this.books = ['javascript', 'html', 'css'];
    // 值类型共有属性
    this.id = id;
}
SuperClass.prototype.showBooks = function () {
    console.log(this.books);
};
function SubClass(id) {
    SuperClass.call(this, id);
};
console.log('构造函数继承--------------------');
var instance1 = new SubClass(14);
var instance2 = new SubClass(12);
console.log(instance1.books);
console.log(instance1.id);
console.log(instance2.books);
console.log(instance2.id);

// 5.组合式继承
/**
 * 在子类构造函数中执行父类构造函数，在子类原型上实例化父类就是组合模式，这样就融合了类式继承和构造函数继承的优点，并且过滤掉其缺点。
 * 但有一缺点：在使用构造函数继承时，执行了一遍父类的构造函数，而在实现子类原型的类式继承时又调用了一遍构造函数。如何解决呢？(如6)
 * @param {* string} name 
 */
function SClass(name) {
    this.name = name;
    this.books = ['html', 'css', 'javascript'];
}

SClass.prototype.getName = function () {
    console.log(this.name);
}

function SubClass2(name, time) {
    SClass.call(this, name);
    this.time = time;
}

SubClass2.prototype = new SClass();
SubClass2.prototype.getTime = function () {
    console.log(this.time);
}
console.log('组合式继承------------------------------------');
var obj1 = new SubClass2('cattle', 23);
var obj2 = new SubClass2('john', 24);
obj1.getName();
obj2.getName();
obj1.getTime();
obj2.getTime();


// 6.原型式继承
/**
 * 它是对类式继承的一个封装，其实其中的过渡对象就相当于类式继承中的子类，只不过在原型式中作为一个过渡对象出现的，目的是为了了创建要返回的新的对实例化对象。
 * 跟类式继承一样，父类对象Book中的值类型的属性被复制，引用类型的属性被共用。
 * @param {* Object } o 
 */
function inheritObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

var booka = {
    name: 'js Book', // 值类型
    alikeBooks: ['html', 'css', 'javascript'] // 引用类型
}
console.log('原型式继承------------------------------');
var newB1 = inheritObj(booka);
var newB2 = inheritObj(booka);
newB1.name = 'ajax book';
newB1.alikeBooks.push('xml Book');
newB2.name = 'flash book';
newB2.alikeBooks.push('as Book');
console.log(newB1.name);
console.log(newB1.alikeBooks);
console.log(newB2.name);
console.log(newB2.alikeBooks);

// 7.寄生式继承
/**
 * 寄生式继承就是对原型继承第二次封装，并且在这第二次封装过程序中对继承的对象进行拓展，这样新创建的对象不仅仅有父类中的属性和方法百且还添加新的属性和方法。
 */
var book7 = {
    name: 'js book',
    allBooks: ['html', 'css', 'javascript']
}
function createBook(obj) {
    var o = new inheritObj(obj);
    o.getName = function () {
        console.log(name);
    }
    return o;
}

// 8.寄生组合式继承(理解有一点难度)
/**
 * 寄生式继承与构造函数继承的组合，但是寄生式继承有些特殊，在这里这处理的不是对象，而是类的原型。
 * @param {* sub Obj} a 
 * @param {* super Obj} b 
 */
function inheritPrototype(a, b) {
    // 复制一份父类的原型副本保存存在变量中
    var p = inheritObj(b.prototype);
    // 修正因为重写子类原型导致子类的constrouctor属性被修改
    p.constructor = a;
    // 设置子类的原型
    a.prototype = p;
}

function SB(name) {
    this.name = name;
    this.colors = ['red', 'whiter', 'green'];
}
SB.prototype.getName = function () {
    console.log(this.name);
}
function SA(name, time) {
    SB.call(this, name);
    this.time = time;
}
inheritPrototype(SA, SB);
SA.prototype.getTime = function () {
    console.log(this.time);
}
console.log('寄生组合模式------------------------------------');
var in1 = new SA('cattle', 2015);
var in2 = new SA('cattle', 2016);
in1.colors.push('bule');
console.log(in1.colors);
console.log(in2.colors);
in2.getName();
in2.getTime();


// 9.多继承
// 9.1 单继承 属性复制
/**
 * 这个extend方法是一个浅复制过程，它只能复制值类型的属性，对引用类型的无能为力，
 * 而在jquery等一些框架中实现了深复制，就是将源对象中的引用类型的属性再执行一遍extend方法而实现的。
 * @param {*} target 
 * @param {*} source 
 */
var extend = function (target, source) {
    // 遍历原对象中的属性
    for (var property in source) {
        // 将源对象中的属性复制到目标对象中
        target[property] = source[property];
    }
    // 返回目标对象
    return target;
}

var bookC = {
    name: 'javascript',
    alike: ['css', 'js', 'html']
}
var anotherBook = {
    color: 'blue'
}
console.log('----------------单继承----------------------');
extend(anotherBook, bookC);
console.log(anotherBook.name);
console.log(anotherBook.alike);


// 9.2 多继承 属性复制
/**
 * 将传入多个对象的属性复制到源对象中，在使用的时候，需要传入目标对象，即需要继承的对象。
 * 也可以直接绑定到Object对象上面（如9.3），这样就可以直接调用了。
 */
var mix = function () {
    var i = 1,
        len = arguments.length,
        target = arguments[0],
        arg;
    for (; i < len; i++) {
        arg = arguments[i];
        for (var property in arg) {
            target[property] = arg[property];
        }
    }
    return target;
}

// 9.3 绑定到Object的多继承
Object.prototype.mix = function () {
    var i = 0,
    len = arguments.length,
    arg;
    for (; i < len; i++) {
        arg = arguments[i];
        for (var property in arg) {
            this[property] = arg[property];
        }
    }
}
console.log('-----------多继承--------------------');
var otherBook2 = {};
otherBook2.mix(anotherBook, bookC);
console.log(otherBook2);



// 10.多态
/**
 * 根据传入不同的参数做相应的操作，将不同的操作方法封装在类里面，通过逻辑结构来进行识别
 */
function add() {
    function zero () {
        return 10;
    }
    function one (n) {
        return 1;
    }
    function two (n, m) {
        return 2;
    }
    this.add = function () {
        var arg = arguments,
        len = arg.length;
        switch (len) {
            case 0 : 
                return zero();
            case 1: 
            return one();
            case 2:
            return two();
        }
    }
}
console.log('------------多态-----------------');
var a = new add();
console.log(a.add());
console.log(a.add(5));
console.log(a.add(7, 8));