/**
 * Created by Administrator on 2016/1/21.
 */
;(function($){
    var SchoolBox = (function(){
        var $schoolBoxCopy = $(
            '<div class="school-box">' +
            '<div class="school-box-header">选择学校</div>' +
            '<div class="school-box-provinces"></div>' +
            '<div class="school-box-schools"></div>' +
            '</div>');
        var $provinceCopy = $('<a href="javascript:;" class="province-item"></a>');
        var $schoolCopy = $('<a href="javascript:;" class="school-item"></a>');
        //缓存数据
        var provinces = SCHOOL_LIST;

        //初始化学校
        var getProvinceById = function(pid){
            for(var i=0; i<provinces.length; i++){
                // NOTE: 前置条件province id可以转成数字
                if(Number(provinces[i]['id']) == Number(pid)){
                    return provinces[i];
                }
            }
            return undefined;
        };

        //初始化province区域代码
        var initProvinces = function($provinceDiv){
            for(var i=0; i<provinces.length; i++){
                var province = provinces[i];
                var $province = $provinceCopy.clone();
                $province.attr('data-province', province['id'])
                    .text(province['name']);
                $provinceDiv.append($province);
            }
        };

        //初始化学校
        var initSchools = function($schoolDiv,provinceId){
            var province = getProvinceById(provinceId);
            if(typeof province !== 'undefined'){
                var schools = province['school'];
                $schoolDiv.empty();

                for(var i=0; i<schools.length; i++){
                    var school = schools[i];
                    var $school = $schoolCopy.clone();
                    $school.attr('data-school', school['id'])
                        .text(school['name']);
                    $schoolDiv.append($school);
                }
            }
            return false;
        };

        //为省绑定click事件
        var onProvinceClick = function($provinceDiv,$schoolDiv,cache){
            var pid = $(this).attr('data-province');
             cache.lastProvinceIndex = $(this).index();

            if(cache.curProvince != pid){
                // set chosen
                $provinceDiv.find('a[data-province="' + cache.curProvince + '"]').removeClass('chosen');
                $provinceDiv.find('a[data-province="' + pid + '"]').addClass('chosen');
                // update
                cache.curProvince = pid;
                initSchools($schoolDiv,pid);
            }
            $schoolDiv.scrollTop(0);
        };

        //初始化方法及构造函数
        var init = function(instance){
            //生成元素
            var $parent = $(instance.options.appendTo);
            var $el = $("<div class='school-box-wrapper'></div>");
            $el.append($schoolBoxCopy.clone());
            $parent.append($el);

            //初始化学校
            var $provinceDiv = $parent.find('.school-box-provinces');
            var $schoolDiv = $parent.find('.school-box-schools');

            initProvinces($provinceDiv);

            //事件
            $provinceDiv.on('click','a',function(event){
                onProvinceClick.apply(this,[$provinceDiv,$schoolDiv,instance.cache]);
            });
            $schoolDiv.on('click','a',function(event){
                if(instance.options.schoolClickCallback){
                    instance.options.schoolClickCallback.apply(this,[]);
                }
            });

            //释放变量
            $schoolBox = null;
            $parent = null;
            $el = null;
        };

        //真正的构造函数
        return function(options){
            //默认配置
            this.options = $.extend({
                appendTo:'body'
            },options);
            //实例化缓存
            this.cache = {
                curProvince : -1,
                lastProvinceIndex : 0
            }

            //初始化生成
            init(this);
            this.init();
        };
    })();

    SchoolBox.prototype.init = function(){
        $(this.options.appendTo).find('.school-box-provinces').find('a').first().click();
    };

    //export
    window.SchoolBox = SchoolBox;
})(jQuery);