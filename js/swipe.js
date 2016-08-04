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