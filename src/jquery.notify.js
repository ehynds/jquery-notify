(function($){

$.widget("ui.notify", {
	
	// default options
	options: {
		delay: 500,
		lifespan: 1000,
		sticky: false
	},

	_create: function(){
		this.template = this.element.html();
		this.element.empty().addClass("ui-notify");
	},

	create: function( msg, opts ){
		return (new $.ui.notify.instance(this)._create( msg, opts ));
	},
	
	_setOption: function( key, value ){
		this.options[ key ] = value;
	}
});

// instance constructor
$.extend($.ui.notify, {
	instance: function( widget ){
		this.widget = widget;
	}
});

// instance methods
$.extend($.ui.notify.instance.prototype, {
	_create: function( params, opts ){
	
		var self = this,
		
			// build instance specific options
			opts = (this.options = $.extend({}, this.widget.options, opts)),
			
			// build html template
			html = this.widget.template.replace(/#\{(.*?)\}/g, function($1, $2){
				return ($2 in params) ? params[$2] : '';
			}),
			
			// and finally, the actual message
			m = (this.element = $(html));
		
		// fire beforeopen event
		if(this._trigger("beforeopen") === false){
			return;
		}
		
		// open plz
		m.addClass("ui-notify-hidden").appendTo( this.widget.element ).fadeIn(this.widget.options.delay);
		
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
		this.element.fadeOut( this.widget.options.delay );
		this._trigger("close");
	},
	
	_trigger: function(type){
		this.widget._trigger.call( this, type );
	}
});

})(jQuery);
