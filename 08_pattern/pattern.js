// 1.单例模式
/**
 * 用来定义一个命名空间
 * 命名空间就是人们所说的namespace，有人也叫它名称空单。它解决的问题是：为了让代码更容易懂，人们常常用单词或者拼音定义变量或者方法，但由于人们可用的单词或者拼音是有限的，
 * 所以不同的人定义的变量使用的单词名称很有可能重复，此时就需要用命名空间来约束每个人定义的变显来解决这类问题。如下1.1
 */
// 1.1 模块分明
/**
 * 其实在javascript中单例模式除了定义命名空间外，还有一个作用你需要知道，就是通过单例模式来管理代码库各个模块，如下代码：
 */
var A = {
    // 常用工具模块
    Util: {
        util_method1: function () {
            console.log('util_method1');
        },
        util_method2: function () {
             console.log('util_method2');
        },
    },
    // 共用工具模块
    Tool: {
        tool_method1: function () {
             console.log('tool_method1');
        },
        tool_method2: function () {
            console.log('tool_method2');
        }
    },
    // Ajax封装模块
    Ajax: {
        get: function () {
            console.log('Ajax get');
        },
        post: function () {
            console.log('Ajax post');
        }
    }
}
console.log('单例模式-------------------------------');
A.Util.util_method1();
A.Util.util_method2();
A.Tool.tool_method1();
A.Tool.tool_method2();
A.Ajax.get();
A.Ajax.post();