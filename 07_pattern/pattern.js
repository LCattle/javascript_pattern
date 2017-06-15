// 1.原型模式
/**
 * 原型模式就是将可复用的，可共享的，耗时大的从基类中提出来然后放在其原型中，然后子类通过组合继承或者寄生组合式继承而将方法和属性继承下来，
 * 对于子类中那些需要重写的主应运进行重写，这样子类创建的对象即具有子类的属性和方法也共享了其类的原型方法。
 */
/**
 * 假设页面中有多个焦点图，那么我们要实现这些焦点图最好的方式就是通过创建对象来一一实现，所以我们就需要有一个焦点图类，比如我们把这个类定义为LoopImage.
 * 
 * 如下1.1
 * @param {*} imgArr 
 * @param {*} container 
 */
// 1.1
var LoopImage = function (imgArr, container) {
    this.imagesArray = imgArr;
    this.container = container;
    this.createImage = function () { };
    this.changeImage = function () { };
}
/**
 * 如果一个页面中有多个这类的焦点图，其切换动画一般是多样化的，有的可能是上下切换，有的可能是左右切换，有的可能是渐隐切换，有的可以是放缩切换等等，
 * 因此创建的轮播图片结构应该是多样化的，同样切换的效果也应该是多样化的，因此我们应该抽象出一个基类，让不同特效类去继承这个基类，
 * 然后对于差异化的需求通过重写这些继承下来的属性或者方法来解决。当然不同的子类之间可能存在不同的结构样式，比如有的包含一右切换的箭头。
 * 
 * 如下1.2
 */
// 1.2
var SlideLoopImg = function (imgArr, container) {
    LoopImage.call(this, imgArr, container);
    this.changeImage = function () {
        console.log('SlideLoopImg changeImage function');
    }
}

var FadeLoopImg = function (imgArr, container, arrow) {
    LoopImage.call(this, imgArr, container, arrow);
    this.arrow = arrow;
    this.changeImage = function () {
        console.log('FadeLoopImg changeImage function');
    }
}
console.log('原型模式-------------------------');
var imgs = ['1.jpg', '2.jpg', '3.jpg'];
var arrows = ['left.jpg', 'right.jpg'];
var fadeImg = new FadeLoopImg(imgs, 'slide', arrows);
fadeImg.changeImage();

/**
 * 然而(1.2)还是存在一些问题的：
 * 首先我们看基类LoopImage，作为基类是要被子类继承的，那么此时将属性和方法都写在基类的构造函数里会有一些问题，比如每次子类继承都要创建一次父类，
 * 假如说父类的构造函数中创建时存在很多耗时较长的逻辑，或者说每次初始化都做一些重复性的东西，这样的性能消耗还是蛮大的，为了提高性能，
 * 我们需要有一种共享机制，这样每当创建基类时，对于每次创建的一些简单而又差异化的属性我们可以放在构造函数中，而我们将一些消耗资源比较大的方法放在基类的原型中，
 * 这样就会避免很多不必要的消耗，这也就是原型模式的一个雏形。
 */
var LoopImages = function (imgArr, container) {
    this.imagesArray = imgArr;
    this.container = container;
}
LoopImages.prototype = {
    createImage: function () {
        console.log('LoopImages createImage function');
    },
    changeImage: function () {
        console.log('LoopImages changeImage function');
    }
}
var SlideImg = function (imgArr, container) {
    LoopImages.call(this, imgArr, container);
}
SlideImg.prototype = new LoopImages();
SlideImg.prototype.changeImage = function () {
    console.log('SlideImg changeImages function');
}

var FadeImg = function (imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container);
    this.arrow = arrow;
}
FadeImg.prototype = new LoopImages();
FadeImg.prototype.changeImage = function () {
    console.log('FadeImg changeImage function');
}
/**
 * 原型模式有一个特点就是在任何时候都可以对基类或者子类进行方法的拓展，而且所有被实例化的对象或者类都能获取这些方法，这样给给予我们对功能拓展的自由性。
 * 但是有一点要注意，正是由于这种方式太自由了，所以不要随意去做，否则如果修改类的其他属性或者方法很有可以会影响其他人。
 */
LoopImages.prototype.getImageLength = function () {
    return this.imagesArray.length;
}
FadeImg.prototype.getContainer = function () {
    return this.container;
}

console.log('重写后的原型----------------------------');
var imgArrs = ['a.jpg', '2.jpg', '3.jpg'];
var arrows = ['top.jpg', 'bottom.jpg'];
var fadeImg = new FadeImg(imgArrs, 'slide', arrows);
console.log(fadeImg.container);
fadeImg.changeImage();
console.log(fadeImg.getContainer());
console.log(fadeImg.getImageLength());


// 2.原型继承
/**
 * 不过原型模式更多的是用在对对象的创建上，比如创建一个实例对象的构造函数比较复杂，或者耗时比较长，或者通过创建多个对象来实现，此时我们最好不要用new关键字去复制这在类，
 * 但可以通过对这些对象属性或者方法进行复制来实现创建，这是原型模式的最初思想，如果涉及多个对象，我们也可以通过原型模式来实现对新对象的创建，
 * 那么首先要有一个原型模式的对象复制方法
 * 如下2.1
 */
// 2.1
/**
 * 基于已经存在的模板对象克隆出新对象的模式
 * 注意：这里对模板引用类型的属性实质上进行了浅复制（引用类型属性共享），当然根据需求可以自行深复制（引用类型属性复制）
 */
function prototypeExtend() {
    var F = function () { },    // 缓存类，实例化返蜀犬吠日对象临时创建
        args = arguments,       // 模板对象参数序列
        i = 0,
        len = args.length;
    for (; i < len; i++) {
        // 遍历每个模板对象中的属性
        for (var j in args[i]) {
            // 将这些属性复制到缓存类原型中
            F.prototype[j] = args[i][j];
        }
    }
    return new F();
}

var penguin = prototypeExtend(
    {
        speed: 20,
        swim: function () {
            console.log('游泳速度 ' + this.speed);
        }
    }, {
        run: function (speed) {
            console.log('奔跑速度 ' + speed);
        }
    }, {
        jump: function () {
            console.log('跳跃动作！');
        }
    });

penguin.swim();
penguin.run(10);
penguin.jump();