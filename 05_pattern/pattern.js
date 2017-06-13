// 1. 抽象工厂模式
/**
 * 原理：
 * 抽象工厂其实是一个实现子类继承的方法，在这个方法中我们需要通过传递子类以及要继承父类（抽象类）的名称，并且在抽象在厂方法中又增加了一次对抽象类存在情的一次判断，
 * 如果存在，则将子类继承父类的方法。然后子类通过寄生式继承，继承父类过程序中有一个地方需要注意，就是在对过渡类的原型继承时，我们不是继承父类的原型，
 * 而是通过new关键字复制的父类的一个实例，这么做是因为过渡类不应仅仅继承父类的原型方法，还要继承父类的对象属性，所以要通过new 关键字将父类的构造函数执行一遍来复制构
 * 造函数中的属性和方法。对抽象工厂添加抽象类也很特殊，因为抽象工厂是个方法不需要实例化对象，故只需要一份，因此直接为抽象工厂添加类的属性即可。
 * 
 * 总结:
 * 抽象工厂模式是设计模式中最抽象的一种，也是创建模式中唯一一种抽象化创建模式。该模式创建出的结果不是一个真实的对象实例，而是一个类簇，它制定了类的结构，
 * 这也就区别于简单工厂模式创建单一对象，工厂方法模式创建多类对象。当然由于javascript中不支持抽象化创建与虚拟方法，所以导致这种模式不能像其他面向对象语言中应用得到那么广泛。
 * 
 * @param {*} subType 
 * @param {*} superType 
 */
var VehicleFactory = function (subType, superType) {
    // 判断抽象工厂中是否有该抽象类
    if (typeof VehicleFactory[superType] === 'function'){
        // 缓存类
        function F() { };
        // 继承父类属性和方法
        F.prototype = new VehicleFactory[superType]();
        // 将子类constructor指向子类
        subType.constroctor = subType;
        // 子类原型继承'父类'
        subType.prototype = new F();
    } else {
        // 不存在该抽象类则抛出异常
        throw new Error('未创建抽象类');
    }
}
VehicleFactory.Car = function () {
    this.type = 'car';
}
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
}

VehicleFactory.Bus = function () {
    this.type = 'bus';
}

VehicleFactory.Bus.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getPassengerNum: function (){
        return new Error('抽象方法不能调用');
    }
}

VehicleFactory.Truck = function () {
    this.type = 'truck';
}
VehicleFactory.Truck.prototype = {
    getPrice: function (){
        return new Error('抽象方法不能调用');
    },
    getTrainload: function () {
        return new Error('抽象方法不能调用');
    }
}

var BMW = function (price, speed) {
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function (){
    return this.price;
}
BMW.prototype.getSpeed = function () {
    return this.speed;
}
console.log('------------抽象工厂模式-------------------');
var bmw = new BMW(10000000, 10000);
console.log(bmw.getPrice());
console.log(bmw.getSpeed());