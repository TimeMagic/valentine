var instanceX;
var visualWidth = $("#content").width();
var visualHeight = $("#content").height();
var animationEnd = (function() {
          var explorer = navigator.userAgent;
          if (~explorer.indexOf('WebKit')) {
              return 'webkitAnimationEnd';
          }
          return 'animationend';
      })();




function Swipe(container){		
		var element = container.find(":first");
		var slides = element.find("li");
		var width = container.width();
		var height = container.height();
		element.css({
			width:(slides.length*width) + "px",
			height:height + "px"
		});
		slides.each(function(index){
			var slide = slides.eq(index);
			slide.css({
				width : width + "px",
				heigth: height + "px"
			});
		});
		this.scrollTo = function(x,speed){
			element.css({
				"transition-timing-function":"linear",
				"transition-duration":speed + "ms",
				"transform":"translate(-" + x + "px,0px)"
			});
		}
}
var swipe =new Swipe($("#content"));


function boywalk(){//男孩走路对象
	
	function getValue(classname){
		var $ele = $('' + classname +'');
		return $ele.height();
	};

	var pathY = function(){
		var data1 = getValue(".a_background_top");
		var data2 = getValue(".a_background_middle");
		return data1 + data2/2;
	}();

	var $boy = $("#boy");
	var bh = $boy.height();
	var bw = $boy.width();
	$boy.css({
		top:pathY - bh +25
	});

	var slowWalk = function(){
		$boy.addClass("slowWalk");
	};
	function pasueWalk(){
		$boy.addClass("pasueWalk");
	};
	function restoreWalk() {
	   	$boy.removeClass('pasueWalk');
	      };
	function calculateDist(direction, proportion) {
	    return (direction == "x" ? visualWidth : visualHeight) * proportion;
	};
	function stratRun(options,runtime){
		var dfdPlay = $.Deferred();
		restoreWalk();
		$boy.transition(
			options,
			runtime,
			'linear',
			function(){
				dfdPlay.resolve();
			});
		return dfdPlay;
	};	
	function walkRun(time,dist,disY){
		var time = time || 3000;
		slowWalk();
		var d1 = stratRun({
			'left':dist + 'px',
			'top':disY ? disY : undefined
		},time);
		return d1;
	};
	
	/*return {
	       // 开始走路
	       walkTo: function(time, proportionX, proportionY) {
	           var distX = calculateDist('x', proportionX)
	           var distY = calculateDist('y', proportionY)
	           return walkRun(time, distX, distY);
	       },
	       // 停止走路
	       stopWalk: function() {
	           pauseWalk();
	       },
	       setColoer:function(value){
	           $boy.css('background-color',value)
	       }
	   }*/

	function walkToShop(runtime){
		var defer = $.Deferred();//后面可以使用then的回调函数
		var d = $(".door");
		var dl = d.offset().left;
		var dw = d.width()/2;
		var bl = $boy.offset().left;
		var bw = $boy.width()/2;
	    intancex = dl + dw - bl -bw;
		//开始走路
		var walkplay = stratRun({
			transform:'translate(' + intancex + 'px),scale(0.3,0.3)',
			opacity: 0.1
		},runtime);
		walkplay.done(function(){
			$boy.css({
				opacity:0
			});
			defer.resolve();
		});
		return defer;
	}

	function walkoutshop(runtime){
		var defer = $.Deferred();
		var walkplay = stratRun({
		   transform: 'scale(1,1)',
		   opacity: 1
		}, runtime);
		//走路完毕
		walkplay.done(function() {
		    defer.resolve();
		});
		return defer;
	};

	function talkFlower(){
		var defer = $.Deferred();
		setTimeout(function(){
			$boy.addClass("slowFloerWalk");
			defer.resolve();
		},1000);
		return defer;
	};


	this.walkTo = function(time,cx,cy){
			var distx = calculateDist("x",cx);
			var disty = calculateDist("y",cy);
			return walkRun(time,distx,disty);
		};
	this.stopWalk = function(){
			pasueWalk();
		};
	this.setColor = function(clo){
			$("#boy").css({
				"background-color":clo
			});
		};
	this.zoulu = function(){
		slowWalk();
	}
	this.tabu = function(){
		restoreWalk();
	}
	this.toShop = function(d){
		return walkToShop(d);
	};
	this.outShop = function(t){
		return walkoutshop(t);
	};
	this.talkFlower =function(){
		return talkFlower();
	};
	this.getWidth = function(){
		return bw;
	};

	this.rotate = function(callback) {
                   restoreWalk();
                   $boy.addClass('boy-rotate');
                   // 监听转身完毕
                   if (callback) {
                       $boy.on(animationEnd, function() {
                           callback();
                           $(this).off();
                       })
                   }
               }
       
	
		
};




  //open and close door gongneng
  function actiondoor(left,right,timer){
  	var $dl = $(".door-left");
  	var $dr = $(".door-right");
    var defer = $.Deferred();
    var count = 2;
    function complete(){
    	if(count == 1){
    		defer.resolve();
    		return;
    	}
    	count--;
    }
  	$dl.transition({"left":left},timer,complete);
  	$dr.transition({"left":right},timer,complete);	
  	return defer;
  };
  function opendoor(){
  	return actiondoor("-50%","100%",1500);
  }
  function closedoor(){
  	return actiondoor("0%","50%",1500);
  }


//开灯特效
   function lamp(){
  	var ele = $(".b_background");
  	this.bright = function(){
  		ele.addClass("lamp-bright");
  	};
  	this.dark = function(){
  		ele.removeClass("lamp-bright");
  	};
  }
  var lamp = new lamp();

  function bird(){
  	var bri = $(".bird");
  	var wi = $("#content").width();
  	this.fly = function(time){
  		bri.addClass("birdfly");
  		bri.transition({
  			right:wi+ 91 +"px"
  		},time);
  	};
  }
  var bird = new bird();

   var logo = {
        elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn')
                .on(animationEnd, function() {
                    $(this).addClass('logoshake').off();
                });
        }
    };

    ///////
    //飘雪花 //
    ///////
    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesNum() {
            return Math.floor(Math.random() * 5);
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var num = getImagesNum();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(images/snowflake/snowflake' + num + '.png)'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
            
        }, 200);
    }

    function scrollTo(time, proportionX) {
        var distX = $("#content").width() * proportionX;
        swipe.scrollTo(distX, time);
    };

    function getValue(className){
    	var ele = $('' + className + '');
    	return ele.height();
    };
    var bridgeY = function(){
    	var data = getValue('.c_background_top');
    	return data;
    }();
    

    var $girl = $(".girl");
    var gh = $girl.height();
    $girl.css({
    	top:bridgeY - gh
    });
    var gw = $girl.width()/5;
    var boy = new boywalk();
    var bbw = boy.getWidth();
    var gt1 = parseInt( $girl.css("left")); 
    var tt = (gt1 - bbw + gw)/visualWidth;
    
    $("#sun").addClass("rotation");
	$(".cloud1").addClass("cloud1ani");
	$(".cloud2").addClass("cloud2ani");
	boy.walkTo(2000,0.2)
	.then(function(){
		scrollTo(6000,1)
	}).then(function(){
	return boy.walkTo(8000,0.5);
	}).then(function(){
		return run();
	});



	function run(){
	  	boy.walkTo(100,0.5)
	  	.then(function(){
	  		return boy.stopWalk();
	  	}).then(function(){
	  		return opendoor();
	  	}).then(function(){
	  		lamp.bright();
	  	}).then(function(){
	  		return boy.tabu();
	  	}).then(function(){   //kljsdlfkjsdlkfsd
	  		return boy.toShop(2000);
	  	}).then(function(){
	  		return boy.talkFlower();
	  	}).then(function(){
	  		return boy.outShop(2000);
	  	}).then(function(){
	  		bird.fly(8000);
	  	}).then(function(){
	  		lamp.dark();
	  	}).then(function(){
	  		return closedoor();
	  	}).then(function(){
	  		scrollTo(4000,2);
	  	}).then(function(){
	  		return boy.walkTo(4000,0.15);
	  	}).then(function(){
	  			return boy.walkTo(1500,0.25,(bridgeY - gh)/visualHeight);
	  		}).then(function(){
	  			return boy.walkTo(1500,tt);
	  		}).then(function(){
	  			return boy.stopWalk();
	  		}).then(function(){
	  			setTimeout(function() {
	  			                    $girl.addClass("girl-rotate");
	  			                    boy.rotate(function() {
	  			                        // 开始logo动画
	  			                        logo.run();
	  			                    });
	  			                }, 1000);
	  		}).then(function(){
	  			setTimeout(function(){
	  				snowflake();
	  			},2500);
	  		});

	  };


