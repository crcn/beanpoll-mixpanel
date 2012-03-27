Example:


bootstrap.js: 

```javascript

var beanie = require('beanie');

beanie.
loader().
require('beanpoll-mixpanel').
require('trackTime').
load();

```


somePlugin.js:

```javascript

exports.plugin = function(router) {
	

	router.on({

		'pull -http /*': function(req, res, mw) {

			var start = Date.now();

			res.on('end', function() {

				router.push('track', { event: 'page load time' }, { time: Date.now() - start });
			});

			nw.next();
		}
	})
}
```