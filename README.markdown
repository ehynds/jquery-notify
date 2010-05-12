# jQuery UI Notify Widget

Create Growl/Ubuntu-like notifications.  Uses RGBA, border-radius, and box-shadow, so they're not as pretty in IE as they could be right now.

## Features

- No images, all CSS
- Less than 100 lines of code
- Built on jQuery UI widget factory
- Templating system: include whatever you want inside notifications (images, links, etc.)
- beforeopen, open, and close callbacks
- Show completely different notifications in different containers
- Ability to customize options on a notification-by-notification basis
- Ability to programatically call `open` and `close` methods
- Passes JSLint

## Usage

### Step 1
Create a container to hold notifications, and a template from which all notifications will be constructed from.  With this,
you can have multiple containers on a page holding different styles of notifications.

	<div id="container">

		<div>
			<a class="ui-notify-close" href="#">x</a>
			<h1>#{title}</h1>
			<p>#{text}</p>
		</div>
	
	</div>

Once the widget is initated on the container, the template is saved and removed from the DOM.  If you'd like a close link in your template,
simply assign the anchor the "ui-notify-close" class.

Define any variables you want to include in this template using `#{varname}` syntax.  You can call these anything you'd like.

### Step 2

Initiate the widget on the container, optionally passing in a hash of default options:

<pre>
// basic
$("#container").notify();

// or with options (there are only 3)
$("#container").notify({
	speed: 500,
	lifespan: 4000,
	sticky: true
});
</pre>

### Step 3
Create notifications by calling the `create` method.  Pass in an hash of variables as the second argument to transpose into the template:

<pre>
$("#container").notify("create", {
	title: 'Test Notification',
	text: 'This is an example of the default config, and will fade out after five seconds.'
});
</pre>

If you'd like, set specific options for each notification by passing in a second hash:

<pre>
$("#container").notify("create", {
	title: 'Test Notification',
	text: 'This is an example of the default config, and will fade out after five seconds.'
},{
	sticky: true,
	speed: 1000
});
</pre>

The create method returns a notification instance obj with two public methods: open and close.

<pre>
// create a new "sticky" notification
var instance = $("#container").notify("create", {}, { sticky:true });

// close it
instance.close();

// re-open it
instance.open();
</pre>

