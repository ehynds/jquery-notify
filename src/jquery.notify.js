(function($){

$.widget("ui.notify", {
	
	// default options
	options: {
		speed: 500,
		lifespan: 5000,
		sticky: false,
		closelink: false
	},
	_create: function(){
		this.template = this.element.html();
		this.element.empty().addClass("ui-notify");
	},
	create: function(msg, opts){
		return new $.ui.notify.instance(this)._create( msg, opts );
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
	_create: function(params, opts){
		var self = this,
		
			// build instance specific options
			opts = (this.options = $.extend({}, this.widget.options, opts)),
			
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
		if(!opts.closelink){
			closelink.remove();
		} else {
			closelink.bind("click", function(){
				self.close();
			});
		}
		
		// open plz
		m.addClass("ui-notify-hidden").appendTo(this.widget.element).fadeIn(this.options.speed);
		
		// fire open callback
		if(this._trigger("open") === false){
			return;
		}
		
		// decide when to close it
		if(!opts.sticky){
			window.setTimeout(function(){
				self.close(m);
			}, opts.lifespan);
		}
		
		return this;
	},
	close: function(){
		var self = this;
		this.element.animate({ opacity:0, margin:0, height:0 }, { duration:this.options.speed, complete:function(){
			$(this).remove();
			self._trigger("close");
		}});
		
		return this;
	},
	_trigger: function(type){
		return this.widget._trigger.call( this, type );
	}
});

})(jQuery);
