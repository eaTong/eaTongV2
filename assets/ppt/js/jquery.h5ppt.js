/**
 * Created by zhou on 2015-06-17.
 */
/**
 * h5ppt设计思路解析：
 *    h5ppt在设计的时候分为两个部分：move和h5ppt。move负责处理具体的运动方式，如向左滑动或者淡入淡出等效果，
 *    而h5ppt则是负责放映PPT，负责整个PPT框架的处理，如添加分页，以及定义事件等工作，所以同样，两个方法的作用域也不同，
 *    h5ppt是全局函数，而move则是针对某个或者多个组件。
 *
 *    运动方法分为：
 *    slide，滑动。。已实现                                                                                             OK
 *    follow，在使用follow的时候需要保证该元素没有需要显示的子元素，否则运动时显示不正常                                OK
 *    none，  有bug，暂时不建议使用                                                                                     OK
 *    extend，拓展，从中心向外拓展，这个方法没什么太多功能。。                                                          OK
 *    push，  挤压，将组件挤压，如同弹簧一样，将组件从正常状态挤压至压缩状态。。                                        OK
 *    pull，  拉拽，将组件拉伸，如同弹簧一样，将组件从压缩状态拉至正常状态。。                                          OK
 *    typing, 像打字一样将所有的文字逐渐显示出来，就像正在打字一般
 *    trigger，
 *
 *   2015-11-29 增加滑动事件，更适合手机端操作
 */
$body = $('body');
$.h5ppt = {
    config: [],
    pageSize: 0,
    pageNo: 0,
    stepNo: 0,
    init: function (options) {
        var defaults = {
            time: 1000
        };
        var options = $.extend(defaults, options);
        init(options);
        function init(options) {
            $.h5ppt.pageSize = $('.hp-page').length;
            //从data-out和data-in中获取初始化的配置信息，并根据data-step对显示顺序进行排序
            $('.hp-page').each(function (pageIndex) {
                $.h5ppt.config[pageIndex] = {
                    out: $(this).attr('data-out') ? eval('a={' + $(this).attr('data-out') + '}') : null,
                    in: $(this).attr('data-in') ? eval('a={' + $(this).attr('data-in') + '}') : {}
                }
                var orderList = [0];

                $(this).find('[data-step]').each(function () {
                    orderList.push($(this).attr('data-step'));
                });
                orderList.sort(function (a, b) {
                    return a - b;
                });
                var res = [orderList[0]];
                for (var i = 1; i < orderList.length; i++) {
                    if (orderList[i] != res[res.length - 1]) {
                        res.push(orderList[i]);
                    }
                }
                $.h5ppt.config[pageIndex].orderList = res;
            });
            $('<span class="hp-display-button">Play</span>').appendTo($body).bind('click',function(event){
                $.h5ppt.display();
                event.stopPropagation();
            });
            addNavBar(options.navColor);
        }

        function addNavBar(navColor) {
            var $pag = $('<div class="hp-pagination"></div>').appendTo($body);
            var $ul = $('<ul class="hp-pagination-ul"></ul>').appendTo($pag);
            for (var i = 0; i < $.h5ppt.pageSize; i++) {
                if (i == 0) {
                    $ul.append($('<li class="hp-pagination-li-active"><span class="hp-pagination-span">' + i + '</span></li>'));
                } else {
                    $ul.append($('<li class="hp-pagination-li"><span class="hp-pagination-span">' + i + '</span></li>'));
                }
            }
            $pag.append('<div class="hp-pagination-bar"></div>');
            $pag.find(".hp-pagination-bar").animate({
                width: $body.width() / $.h5ppt.pageSize
            });
            if (navColor) {
                $pag.find(".hp-pagination-span").css('color', navColor);
            }
            $ul.delegate('li', 'click', navClicked);
            $ul.bind('click', function (event) {
                event.stopPropagation();
            });
            bindEvents();
        }
        function bindEvents(){
            var startPoint = {};
            window.addEventListener('touchstart' , function(e){
                startPoint.x = e.touches[0].clientX;
                startPoint.y = e.touches[0].clientY;
            });
            window.addEventListener('touchmove' , function(e){

            });
            window.addEventListener('touchend' , function(e){
                var touche = e.changedTouches[0];

                if(Math.abs(touche.clientX-startPoint.x)  < Math.abs( touche.clientY - startPoint.y)/2 ){
                    if(touche.clientY > startPoint.y){
                        last();
                    }else{
                        next();
                    }
                }
            })
        }
        function next(){
            var index = $('.hp-pagination-li-active').index();
            index = index==$('.hp-pagination-ul').find('li').length-1?0:index+1;
            $('.hp-pagination-ul li:eq('+index +')').trigger('click');
        }
        function last(){
            var index = $('.hp-pagination-li-active').index();
            index = index==0?$('.hp-pagination-ul').find('li').length-1:index-1;
            $('.hp-pagination-ul li:eq('+index +')').trigger('click');
        }
        function navClicked() {
            $('*').finish();
            var $this = $(this);
            var $nowPage = $('.hp-ppt .hp-page:nth-child(' + ($.h5ppt.pageNo + 1) + ')');
            var option = $.h5ppt.config[$.h5ppt.pageNo].out;
            if (option) {
                option.wholePage = true;
                option.inside = false;
                option.onComplete = function () {
                    pageIn($this);
                };
                $nowPage.h5move(option);
            } else {
                pageIn($this);
            }
        }

        function pageIn($obj) {
            var pageNo = parseInt($obj.find('span').text());
            //活动下面导航的长宽，表示PPT的进度完成情况
            $('.hp-pagination .hp-pagination-bar').animate({
                width: pageNo * ($body.width() / $.h5ppt.pageSize)
            });
            //将点击的li设置为active
            $('.hp-pagination-li-active').removeClass('hp-pagination-li-active').addClass('hp-pagination-li');
            $obj.removeClass('hp-pagination-li').addClass('hp-pagination-li-active');
            var $page = $('.hp-ppt .hp-page:nth-child(' + (pageNo + 1) + ')');
            var option = $.h5ppt.config[pageNo].in;
            option.wholePage = true;
            $.h5ppt.pageNo = pageNo;
            $.h5ppt.stepNo = 0;
            option.onComplete = function () {
                $.h5ppt.display();
            }
            $page.h5move(option);
        }
    },
    start: function () {
        //hide all elements
        $('.hp-page').find('[data-step]').css("visibility", "hidden");
        //添加监听
        $body.bind('click', function () {
            $.h5ppt.display();
        });
        $body.bind('keydown', function (event) {
            if (event.keyCode == 39 || event.keyCode == 40) {
                $.h5ppt.display();
            }
        });
        $.h5ppt.display();
    },
    display: function (outSide) {
        if ($.h5ppt.stepNo == $.h5ppt.config[$.h5ppt.pageNo].orderList.length) {
            $.h5ppt.stepNo = 0;
            $.h5ppt.pageNo += 1;
            //改变导航长度
            $('.hp-pagination .hp-pagination-bar').animate({
                width: ($.h5ppt.pageNo + 1) * ($body.width() / $.h5ppt.pageSize)
            });
            $('.hp-pagination-li-active').removeClass('hp-pagination-li-active').addClass('hp-pagination-li');
            $('.hp-pagination-li:nth-child(' + ($.h5ppt.pageNo + 1) + ')').removeClass('hp-pagination-li').addClass('hp-pagination-li-active');
            display('page', outSide);
        } else {
            display('step', outSide);
            $.h5ppt.stepNo += 1;
        }

        function display(type, outSide) {
            //简化表达式， 没别的意思
            var p = $.h5ppt.pageNo;
            var l = $.h5ppt.stepNo;
            var inside = !outSide;
            var $page = $('.hp-page:nth-child(' + (p + 1) + ')');
            if ($page.length == 0) {
                $.h5ppt.pageNo = 0;
                $.h5ppt.stepNo = 0;
                $.h5ppt.over();
                return;
            }
            //页面的移动
            if (type == 'page') {
                //删除所有虚拟组件，防止出现运动重复的情况
                $(".hp-virtualComponent").remove();
                var lastPage = $('.hp-page:nth-child(' + (p) + ')');
                var lastOut = $.h5ppt.config[p - 1].out;
                if (lastOut) {
                    lastOut.inside = false;
                    lastOut.wholePage = true;
                    lastOut.onComplete = function () {
                        var nowIn = $.h5ppt.config[p].in;
                        nowIn.wholePage = true;
                        nowIn.onComplete = function () {
                            $.h5ppt.display();
                        }
                        $page.h5move(nowIn);
                    }
                    lastPage.h5move(lastOut);
                } else {
                    var nowIn = $.h5ppt.config[p].in;
                    nowIn.wholePage = true;
                    nowIn.onComplete = function () {
                        $.h5ppt.display();
                    }
                    $page.h5move(nowIn);
                }


            } else {
                var stepNo = $.h5ppt.config[p].orderList[l];
                var $step = $page.find('.hp-step[data-step=' + stepNo + ']');
                $step.each(function () {
                    var stepIn = $(this).attr('data-in') ? eval('a={' + $(this).attr('data-in') + '}') : {}
                    var stepOut = $(this).attr('data-out') ? eval('a={' + $(this).attr('data-out') + '}') : {}
                    if (inside) {
                        $(this).h5move(stepIn);
                    } else {
                        $(this).h5move(stepOut);
                    }
                });
            }
        }
    },
    //放映结束后的处理。。暂时留空
    over: function () {
        //alert("over");
    }
};
//全局默认值暴露出来，方便懒人进行统一设置
$.h5ppt.defaults = {
    type: 'slide',
    angle: 0,
    time: 1000,
    wholePage: false,
    inside: true,
    rotate: 0,
    scale: 1,
    fade: false,
    delay: 0,
    onComplete: function () {
    }
};
(function ($) {
    $.fn.h5move = function (options) {
        var defaults = {
            type: $.h5ppt.defaults.type,
            angle: $.h5ppt.defaults.angle,
            time: $.h5ppt.defaults.time,
            wholePage: $.h5ppt.defaults.wholePage,
            inside: $.h5ppt.defaults.inside,
            rotate: $.h5ppt.defaults.rotate,
            scale: $.h5ppt.defaults.scale,
            delay: $.h5ppt.defaults.delay,
            fade: $.h5ppt.defaults.fade
        }
        var options = $.extend(defaults, options);
        if (options.angle == 'random') {
            options.angle = Math.random() * 360;
        }
        this.each(function () {
            if (options.wholePage) {
                $(this).find('.hp-step').css('visibility', 'hidden');
                if (options.inside) {
                    $(this).find('.hp-step:not([data-step])').css('visibility', 'visible');
                }
            }
            var $this = $(this);
            setTimeout(function () {
                if (options.type == 'slide') {
                    slide($this, options);
                } else if (options.type == 'follow') {
                    follow($this, options);
                } else if (options.type == 'none') {
                    none($this, options);
                } else if (options.type == 'pull') {
                    pull($this, options);
                } else if (options.type == 'push') {
                    push($this, options);
                } else if (options.type == 'extend') {
                    extend($this, options);
                }else if (options.type == 'typing') {
                    typing($this, options);
                }
            }, options.delay);
        });
    };
    function typing($obj , options){
        var virtualComponent = virtual($obj);
        var text = virtualComponent.text();
        var $cursor = $('<span class="hp-cursor"></span>').appendTo($body).css({
            fontSize:virtualComponent.css('font-size')
        });
        virtualComponent.text("");
        $cursor.offset({
            top:virtualComponent.offset().top + 3,
            left:virtualComponent.offset().left + virtualComponent.outerWidth()
        });
        $obj.time = setInterval(function(){
            if(virtualComponent.text() == text){
               clearInterval($obj.time);
                virtualComponent.remove();
                $cursor.remove();
                $obj.css("visibility", 'visible');
            }else{
                virtualComponent.text(virtualComponent.text() + text.charAt(virtualComponent.text().length));
                $cursor.offset({
                    left:virtualComponent.offset().left + virtualComponent.outerWidth()
                });
            }
        },options.time/text.length);
    }
    function extend($obj, options) {
        var virtualComponent = virtual($obj);
        //如果是整个页面的话，该页面的位置肯定是不在页面上，所以需要对virtualComponent移到页面中来
        if (options.wholePage) {
            virtualComponent.css({
                top: 0,
                left: 0
            });
            if (!options.inside) {
                virtualComponent.find('.hp-step').css("visibility", 'visible');
            }
        }
        var scaleX = 1;
        var scaleY = 1
        if (options.inside) {
            virtualComponent.css({
                transform: 'scale(0.00001,0.00001)'
            });
        } else {
            virtualComponent.css({
                transform: 'scale(1,1)'
            });
            scaleX = 0.00001;
            scaleY = 0.00001;
        }
        virtualComponent.animate({
            transform: 'scale(' + scaleX + ',' + scaleY + ')'
        }, options.time, function () {
            virtualComponent.remove();
            $obj.css("visibility", 'visible');
            if (options.wholePage) {
                $('.hp-page').offset({
                    top: $body.height()
                });
                $obj.offset({
                    top: 0,
                    left: 0
                });
                if (!options.inside) {
                    virtualComponent.find('[data-step]').css("visibility", 'visible');
                }
            }
            if (options.onComplete) {
                options.onComplete();
            }
        });
    }

    function push($obj, options) {
        var virtualComponent = virtual($obj);
        //如果是整个页面的话，该页面的位置肯定是不在页面上，所以需要对virtualComponent移到页面中来
        if (options.wholePage) {
            virtualComponent.css({
                top: 0,
                left: 0
            });
            if (!options.inside) {
                virtualComponent.find('[data-step]').css("visibility", 'visible');
            }
        }
        //首先处理角度，确认angle数值在0到360度之间
        var scaleX = 1;
        var scaleY = 1;
        var angle = options.angle < 0 ? options.angle % 360 + 360 : options.angle % 360;
        //当angle处于不同区间段的时候，拉拽的方向不同，初始信息也不同
        if (angle < 45 || angle >= 315) {
            virtualComponent.css({
                transformOrigin: 'right'
            });
            scaleX = 0.0001;
        } else if (angle >= 45 && angle < 135) {
            virtualComponent.css({
                transformOrigin: 'bottom'
            });
            scaleY = 0.0001;
        } else if (angle >= 135 && angle < 225) {
            virtualComponent.css({
                transformOrigin: 'left'
            });
            scaleX = 0.0001;
        } else if (angle >= 225 && angle < 315) {
            virtualComponent.css({
                transformOrigin: 'top'
            });
            scaleY = 0.0001;
        }
        virtualComponent.animate({
            transform: 'scale(' + scaleX + ',' + scaleY + ')'
        }, options.time, function () {
            virtualComponent.remove();
            if (options.onComplete) {
                options.onComplete();
            }
        });
    }

    function pull($obj, options) {
        var virtualComponent = virtual($obj);
        //如果是整个页面的话，该页面的位置肯定是不在页面上，所以需要对virtualComponent移到页面中来
        if (options.wholePage) {
            virtualComponent.css({
                top: 0,
                left: 0
            });
            if (!options.inside) {
                virtualComponent.find('[data-step]').css("visibility", 'visible');
            }
        }
        //首先处理角度，确认angle数值在0到360度之间
        var angle = options.angle < 0 ? options.angle % 360 + 360 : options.angle % 360;
        //当angle处于不同区间段的时候，拉拽的方向不同，初始信息也不同
        if (angle < 45 || angle >= 315) {
            virtualComponent.css({
                transform: 'scale(0.0001,1)',
                transformOrigin: 'right'
            });
        } else if (angle >= 45 && angle < 135) {
            virtualComponent.css({
                transform: 'scale(1,0.0001)',
                transformOrigin: 'bottom'
            });
        } else if (angle >= 135 && angle < 225) {
            virtualComponent.css({
                transform: 'scale(0.0001,1)',
                transformOrigin: 'left'
            });
        } else if (angle >= 225 && angle < 315) {
            virtualComponent.css({
                transform: 'scale(1,0.0001)',
                transformOrigin: 'top'
            });
        }
        virtualComponent.animate({
            transform: 'scale(1,1)'
        }, options.time, function () {
            virtualComponent.remove();
            $obj.css("visibility", 'visible');
            if (options.wholePage) {
                $('.hp-page').offset({
                    top: $body.height()
                });
                $obj.offset({
                    top: 0,
                    left: 0
                });
                if (!options.inside) {
                    virtualComponent.find('[data-step]').css("visibility", 'visible');
                }
            }
            if (options.onComplete) {
                options.onComplete();
            }
        });
    }

    function none($obj, options) {
        var opacity = options.inside ? 1 : 0;
        var virtualComponent = virtual($obj);
        virtualComponent.animate({
            transform: 'rotate(' + options.rotate + 'deg) scale(' + options.scale + ')',
            opacity: opacity
        }, options.time, function () {
            if (options.inside) {
                $obj.css('visibility', 'visible');
            }
            virtualComponent.remove();
            if (options.onComplete) {
                options.onComplete();
            }
        });
    }

    function follow($obj, options) {
        //将需要移动的组件复制为一个虚拟组件
        var virtualComponent = $('<div></div>').appendTo($body);
        virtualComponent.html($obj.html()).attr('class', $obj.attr('class')).addClass('hp-virtualComponent').css({
            position: 'absolute',
            left: $obj.offset().left,
            top: $obj.offset().top,
            visibility: 'visible'
        });
        var text = virtualComponent.text();
        virtualComponent.text("");
        for (var i = 0; i < text.length; i++) {
            virtualComponent.append($('<span>' + text.charAt(i) + '</span>'));
        }
        virtualComponent.children('').addClass($obj.attr('class')).css({
            font: $obj.css('font'),
            fontSize: $obj.css('font-size'),
            //兼容Firefox和IE在字体大小没有改变的问题
            fontWeight: $obj.css('font-weight')
        });
        virtualComponent.children().each(function (i) {
            $(this).css("visibility", 'hidden');
            var newOption = copy(options);
            newOption.type = 'slide';
            newOption.delay = options.delay + (i * 200);
            if (i == virtualComponent.children().length - 1) {
                newOption.onComplete = function () {
                    virtualComponent.remove();
                    $($obj.css("visibility", 'visible'));
                }
            }
            $(this).h5move(newOption);
        });
    }

    function slide($obj, options) {
        var left = 0;
        var top = 0;
        var opacity = 1;
        var virtualComponent = virtual($obj);
        if (!options.wholePage) {
            left = $obj.offset().left;
            top = $obj.offset().top;
        } else {
            if (!options.inside) {
                virtualComponent.find('[data-step]').css("visibility", 'visible');
            }
        }
        var location = getLocation(left, top, options.angle, virtualComponent);
        if (options.inside) {
            virtualComponent.css({
                left: location.left,
                top: location.top
            });
            if (options.fade) {
                virtualComponent.css('opacity', 0);
            }
        } else {
            left = location.left;
            top = location.top;
            opacity = 0;
        }
        virtualComponent.animate({
            left: left,
            top: top,
            transform: 'rotate(' + options.rotate + 'deg) scale(' + options.scale + ')',
            opacity: opacity
        }, options.time, function () {
            if (options.inside) {
                $obj.css('visibility', 'visible');
            }
            if (options.wholePage) {
                $('.hp-page').offset({
                    top: $body.height()
                });
                $obj.offset({
                    top: 0,
                    left: 0
                });
            }
            virtualComponent.remove();
            if (options.onComplete) {
                options.onComplete();
            }
        });
    }
    function copy(obj) {
        var newObj = {};
        for (var attr in obj) {
            newObj[attr] = obj[attr];
        }
        return newObj;
    }
    function virtual($obj){
        var tagName = $obj[0] ? $obj[0].tagName : 'div';
        var virtualComponent = $('<' + tagName + '></' + tagName + '>').appendTo($body).attr('style', $obj.attr('style'));
        virtualComponent.html($obj.html()).attr('class', $obj.attr('class')).addClass('hp-virtualComponent').css({
            position: 'absolute',
            left: $obj.offset().left,
            top: $obj.offset().top,
            visibility: 'visible'
        });
        $obj.css("visibility", 'hidden');
        return virtualComponent;
    }
    /**
     * 此方法用来计算平移之前的初始位置，
     * @param left
     * @param top
     * @param angle
     * @param $obj
     * @returns {{left: number, top: number}}
     */

    function getLocation(left, top, angle, $obj) {
        //首先处理角度，确认angle数值在0到360度之间
        var angle = angle < 0 ? angle % 360 + 360 : angle % 360;
        var l = 0;
        var t = 0;
        //当angle处于不同区间段的时候，设置不同的初始位置
        if (angle < 45 || angle >= 315) {
            l = $body.width();
            t = angle == 0 ? top : top + (l - left) * Math.tan(angle * Math.PI / 180);
        } else if (angle >= 45 && angle < 135) {
            t = $body.height();
            l = angle == 90 ? left : left + (t - top) / Math.tan(angle * Math.PI / 180);
        } else if (angle >= 135 && angle < 225) {
            l = 0 - $obj.width();
            t = angle == 180 ? top : top + (l - left) * Math.tan(angle * Math.PI / 180);
        } else if (angle >= 225 && angle < 315) {
            t = 0 - $obj.height();
            l = angle == 270 ? left : left + (t - top) / Math.tan(angle * Math.PI / 180);
        }
        var location = {
            left: l,
            top: t
        }
        return location;
    }
})(jQuery);