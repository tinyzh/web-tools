/**
 * Created by zhangchao on 15/12/20.
 */
define(function(){
    'use strict';
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