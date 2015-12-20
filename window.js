/**
 * Created by zhangchao on 15/12/20.
 */
define(function(){
    function Window(){}

    Window.protorype = function(){
        alert:function(){},
        confirm:function(){},
        prompt:function(){}
    }
    return {
        Window:Window
    }

});