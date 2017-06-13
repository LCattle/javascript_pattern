// 1.建造者模式
/**
 * 建造者模式更注重的是创建对象的过程，甚至于创建对象的每一个细节,比如创建一个人，我们创建的结果不仅仅要得到人的实例，还要关注创建人的时候，这个人应该穿什么衣服，
 * 男的还是女的，兴趣爱好都是什么。
 * 而工厂模式主要是为了创建对象实例或者类簇（抽象工厂）,关心的是最终产出的是什么，且不关心你创建的整个过程，仅仅需要知道你最终创建的结果，所以工厂模式我们得到的都是
 * 对象实例或者类簇。
 * @param {*} param 
 */
// 创建一位人类
var Human = function (param) {
    this.skill = param && param.skill || '保密';
    this.hobby = param && param.hobby || '保密';
}
// 人类原型方法
Human.prototype = {
    getSkill: function () {
        return this.skill;
    },
    getHobby: function () {
        return this.hobby;
    }
}
// 实例化姓名类
var Named = function (name) {
    var that = this;
    // 构造器
    // 构造函数解析姓名的姓与名 
    (function (name, that) {
        that.wholeName = name;
        if (name.indexOf(' ') > -1) {
            that.FirstName = name.slice(0, name.indexOf(' '));
            that.secondName = name.slice(name.indexOf(' '));
        }
    })(name, that);
}
// 实例化职位类
var Work = function (work) {
    var that = this;
    // 构造器
    // 构造函数中通过传入的职位特征来设相应职位以及描述
    (function (work, that) {
        switch (work) {
            case 'code': 
                that.work = '工程师';
                that.workDescript = '每天沉醉于编程！';
                break;
            case 'UI': 
                that.work = '设计师';
                that.workDescript = '设计是一种艺术!';
                break;
            case 'teach': 
                that.work = '老师';
                that.workDescript = '分享是一种快乐!';
                break;
            default: 
                that.work = work;
                that.workDescript = '对不起，我们还不清楚您所选择职位的相关描述!';
        }
    })(work, that);
}
// 更换期望的职位
Work.prototype.changeWork = function (work) {
    this.work = work;
}
// 添加对职位的描述
Work.prototype.changeDescript = function (setence) {
    this.workDescript = setence;
}
/**
 * 应聘者建造者
 * @param {*} name 
 * @param {*} work 
 */
var Person = function (name, work) {
    // 创建应聘者缓存对象
    var _Person = new Human();
    // 创建应聘者姓名解析对象
    _Person.name = new Named(name);
    // 创建应聘者期望职位
    _Person.work = new Work(work);
    // 返回应聘者
    return _Person;
}

console.log('-------------建造者模式----------------------');
var person = new Person('xiao ming', 'code');
console.log(person.name.FirstName);
console.log(person.name.secondName);
console.log(person.work.work);
console.log(person.work.workDescript);
person.work.workDescript = '更改一下职位描述';
console.log(person.work.workDescript);