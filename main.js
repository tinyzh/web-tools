/**
 * Created by zhangchao on 15/12/20.
 */
require.config({
    paths:{
        'jquery':''
    }
});


require(['window'],function(w){


    new w.Window().alert();
});