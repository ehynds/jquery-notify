# jQuery UI Notify Widget

Create Growl/Ubuntu-like notifications.  Uses RGBA, border-radius, and box-shadow, so they're not as pretty as they could be in IE at the moment.

## Features

- No images, all CSS
- Lightweight.  Barely 2.5kb in size
- Built on top of the jQuery UI widget factory
- Templating system: include whatever you want inside notifications (images, links, etc.)
- ThemeRoller support
- beforeopen, open, close, and click events
- Show completely different notifications in different containers
- Ability to customize options on a notification-by-notification basis
- Ability to programatically call `open` and `close` methods
- Passes JSLint
- Cross-browser compatible (including IE6)

## Usage

```html
  <div id="notify" style="display:none; width:400px;">
		<div id="success-template">
			<a class="ui-notify-cross ui-notify-close" href="#">x</a>
			<h1>#{title}</h1>
			<p>#{text}</p>
		</div>
	</div>		
```

```javascript
    $("#notify").notify({
		  speed: 500,
			expires: 8000 // ms or false
		});
    
    $("#notify").notify("create", {
      title: 'Cool Notification',
      text: 'Order confirmed.'
    });
```

