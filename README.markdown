# jQuery UI Notify Widget

Create Growl/Ubuntu-like notifications.

## Features

- No images, all CSS
- Less than 100 lines of code
- Built on jQuery UI widget factory
- Templating system: include whatever you want inside notifications (images, links, etc.)
- beforeopen, open, and close callbacks
- Show completely different notifications in different containers
- Ability to customize options on a notification-by-notification basis
- Ability to programatically call "open" and "close" methods

## Usage

1. Create a container and a notification template.  In this example, #container will hold all the notifications and
each will be built from the template contained within the .ui-notify-message div:

	<!--- container to hold notifications --->
	<div id="container">
		<div class="ui-notify-message">
			<div class="ui-notify-padding">
			
				<a class="ui-notify-close" href="#">x</a>
				<h1>#{title}</h1>
				<p>#{text}</p>
				
			</div>
		</div>
	</div>
	
2. Initiate a widget on the container, optionally passing in a hash of defaults:

	$("#container").notify();

3. Create notifications by calling the "create" method. Pass in an hash of variabkes as the second argument to transpose into the template:

	$("#container").notify("create", {
		title: 'Test Notification',
		text: 'This is an example of the default config, and will fade out after five seconds.'
	});

If you'd like, set specific options for each notification by passing in a second hash:

	$("#container").notify("create", {
		title: 'Test Notification',
		text: 'This is an example of the default config, and will fade out after five seconds.'
	},{
		sticky: true,
		speed: 1000
	});
	
The create method returns a notification instance obj with two public methods: open and close.

	// create a new "sticky" notification
	var instance = $("#container").notify("create", {}, { sticky:true });
	
	// close it
	instance.close();
	
	// re-open it
	instance.open();
	

