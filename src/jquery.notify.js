(function($){

$.widget("ui.notify", {
	options: {
		speed: 500,
		lifespan: 5000,
		sticky: false
	},
	_create: function(){
		this.template = this.element.html();
		this.element.empty().addClass("ui-notify");
	},
	create: function(msg, opts){
		return new $.ui.notify.instance(this)._create(msg, $.extend({}, this.options, opts));
	},
	_setOption: function(key, value){
		this.options[key] = value;
	}
});

// instance constructor
$.extend($.ui.notify, {
	instance: function(widget){
		this.widget = widget;
	}
});

// instance methods
$.extend($.ui.notify.instance.prototype, {
	_create: function(params, options){
		this.options = options;
		
		var self = this,
			
			// build html template
			html = this.widget.template.replace(/#\{(.*?)\}/g, function($1, $2){
				return ($2 in params) ? params[$2] : '';
			}),
			
			// the actual message
			m = (this.element = $(html)),
			
			// close link
			closelink = m.find("a.ui-notify-close");
		
		// fire beforeopen event
		if(this._trigger("beforeopen") === false){
			return;
		}
		
		// show close link?
		if(closelink.length){
			if(!options.sticky){
				closelink.remove();
			} else {
				closelink.bind("click", function(){
					self.close();
					return false;
				});
			}
		}
		
		// open plz
		this.open();
		
		// decide when to close it
		if(!options.sticky){
			window.setTimeout(function(){
				self.close();
			}, options.lifespan);
		}
		
		return this;
	},
	close: function(){
		var self = this;
		
		this.element.slideUp(this.options.speed, function(){
			self._trigger("close");
		});
		
		return this;
	},
	open: function(){
		this.element.addClass("ui-notify-hidden").appendTo(this.widget.element).fadeIn(this.options.speed);
		this._trigger("open")
		return this;
	},
	_trigger: function(type){
		return this.widget._trigger.call( this, type );
	}
});

})(jQuery);
