/*
 * jQuery Notify UI Widget 1.2.1
 * Copyright (c) 2010 Eric Hynds
 *
 * http://www.erichynds.com/jquery/a-jquery-ui-growl-ubuntu-notification-widget/
 *
 * Depends:
 *   - jQuery 1.4
 *   - jQuery UI 1.8 (core, widget factory)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function($){

$.widget("ui.notify", {
	options: {
		speed: 500,
		expires: 5000,
		stack: 'below'
	},
	_create: function(){
		var self = this;
		this.templates = {};
		this.keys = [];
		
		// build and save templates
		this.element.addClass("ui-notify").children().addClass("ui-notify-message").each(function(i){
			var key = this.id || i;
			self.keys.push(key);
			self.templates[key] = $(this).removeAttr("id").wrap("<div></div>").parent().html(); // because $(this).andSelf().html() no workie
		}).end().empty();
		
	},
	create: function(template, msg, opts){
		if(typeof template === "object"){
			opts = msg;
			msg = template;
			template = null;
		}
		
		// return a new notification instance
		return new $.ui.notify.instance(this)._create(msg, $.extend({}, this.options, opts), this.templates[ template || this.keys[0]]);
	}
});

// instance constructor
$.extend($.ui.notify, {
	instance: function(widget){
		this.parent = widget;
		this.isOpen = false;
	}
});

// instance methods
$.extend($.ui.notify.instance.prototype, {
	_create: function(params, options, template){
		this.options = options;
		
		var self = this,
			
			// build html template
			html = template.replace(/#\{(.*?)\}/g, function($1, $2){
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

		// clickable?
		if(typeof this.options.click === "function"){
			m.addClass("ui-notify-click").bind("click", function(e){
				self._trigger("click", e, self);
			});
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
		
		this.open();
		
		// auto expire?
		if(typeof options.expires === "number"){
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
		
		this.element[this.options.stack === 'above' ? 'prependTo' : 'appendTo'](this.parent.element).css({ display:"none", opacity:"" }).fadeIn(this.options.speed, function(){
			self._trigger("open");
		});
		
		return this;
	},
	widget: function(){
		return this.element;
	},
	_trigger: function(type, e, instance){
		return this.parent._trigger.call( this, type, e, instance );
	}
});

})(jQuery);
