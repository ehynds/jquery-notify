(function($){

$.widget("ui.notify", {
	options: {
		speed: 500,
		expires: 5000
	},
	_create: function(){
		this.template = this.element.children().addClass("ui-notify-padding").wrap('<div class="ui-notify-message"></div>').end().html();
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
		this.isOpen = false;
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
		if(closelink.length && !!options.expires){
			closelink.remove();
		} else if(closelink.length){
			closelink.bind("click", function(){
				self.close();
				return false;
			});
		}
		
		// open plz
		this.open();
		
		// auto expire?
		if(typeof this.options.expires === "number"){
			window.setTimeout(function(){
				self.close();
			}, options.expires);
		}
		
		return this;
	},
	close: function(){
		var self = this, speed = this.options.speed;
		this.isOpen = false;
		
		this.element.fadeTo(speed, 0).slideUp(speed, function(){
			self._trigger("close");
		});
		
		return this;
	},
	open: function(){
		if(this.isOpen){
			return this;
		}
		
		var self = this;
		this.isOpen = true;
		
		this.element.appendTo(this.widget.element).css({ display:"none", opacity:"" }).fadeIn(this.options.speed, function(){
			self._trigger("open");
		});
		
		return this;
	},
	_trigger: function(type){
		return this.widget._trigger.call( this, type );
	}
});

})(jQuery);
