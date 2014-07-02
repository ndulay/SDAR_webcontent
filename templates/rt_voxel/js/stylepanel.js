/**
* @version   $Id: stylepanel.js 504 2012-05-01 06:11:02Z djamil $
* @author    RocketTheme http://www.rockettheme.com
* @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
* @license   http://www.rockettheme.com/legal/license.php RocketTheme Proprietary Use License
*
* StylePanel includes also the fabolous ScrollSpy plugin from David Walsh
* ScrollSpy - David Walsh (http://davidwalsh.name)
*/


((function(){

	this.StylePanel = new Class({

		Implements: [Events, Options],

		options:{
			status: 'hide',
			maxWidth: 1288
		},

		initialize: function(element, toggle, options){
			this.setOptions(options);

			this.element = document.getElement(element) || document.id(element) || null;
			this.toggler = document.getElement(toggle) || document.id(toggle) || null;
			if (!element) throw new Error('Style Panel "' + element + '" not found in the DOM.');
			if (!toggle) throw new Error('Toggle "' + toggle + '" for Style Panel not fond in the DOM.');

			this.bounds = {
				resize: this.resizeCheck.bind(this)
			};

			this.applyElement = this.element.getElement('a.readon');
			this.size = this.element.getSize().x;

			if (window.getSize().x <= this.options.maxWidth) this.options.status = 'hide';

			this.fx = new Fx.Tween(this.element, {
				duration: 350,
				transition: 'quad:in:out',
				onComplete: this.onComplete.bind(this, this.element)
			});

			this[this.options.status](null, 'silent');
			this.onComplete(this.element);

			this.attach();
			this.attachBoxes();
		},

		attach: function(){
			this.toggler.addEvent('click', this.toggle.bind(this));
			this.element.getElements('.preset-item, .pattern-item').each(function(item){
				var click = item.retrieve('stylepanel:itemclick', function(event){
					this.click.call(this, event, item);
				}.bind(this));

				item.addEvent('click', click);
			}, this);

			var applyEvent = this.applyElement.retrieve('stylepanel:applyclick', function(event){
				if (event) event.preventDefault();
				this.applyStyles.call(this, this.applyElement);
			}.bind(this));

			this.applyElement.addEvent('click', applyEvent);
			window.addEvent('resize', this.bounds.resize);
		},

		detach: function(){
			this.toggler.removeEvents();
			this.element.getElements('.preset-item, .pattern-item').each(function(item){
				var click = item.retrieve('stylepanel:itemclick');
				item.removeEvent('click', click);
			}, this);

			var applyClick = this.applyElement['stylepanelitemclick'];
			this.applyElement.removeEvent('click', applyClick);
			window.removeEvent('resize', this.bounds.resize);
		},

		show: function(event, silent){
			this.fx[silent ? 'set' : 'start']('left', 0);
		},

		hide: function(event, silent){
			Object.each(window['moorainbow'], function(rainbow, key){
				if (rainbow.visible){
					rainbow.hide();
				}
			});
			this.fx[silent ? 'set' : 'start']('left', -this.size);
		},

		toggle: function(event, silent){
			var current = this.element.getStyle('left').toInt();
			this[!current ? 'hide' : 'show'](event, silent);
		},

		click: function(event, element){
			if (element.className.contains(' style')) return true;

			if (event) event.preventDefault();
			element.getParent('.presets-block').getElements('.preset-item, .pattern-item').removeClass('active');
			element.addClass('active');
		},

		onComplete: function(element){
			var status = element.getStyle('left').toInt();
			this.toggler.removeClass('pig').removeClass('turkey');
			this.toggler.addClass(!status ? 'pig' : 'turkey');
		},

		resizeCheck: function(){
			if (window.getSize().x <= this.options.maxWidth && this.element.getStyle('left').toInt() === 0){
				this.hide();
			}

			if (window.getSize().x > this.options.maxWidth && this.element.getStyle('left').toInt() < 0){
				this.show();
			}
		},

		attachBoxes: function(){
			GantryColorChooser.add('style-panel-accentcolor', false);

		},

		applyStyles: function(element){
			var query = "", pattern = this.element.getElement('.active'),
				accentColor = this.element.getElement('#style-panel-accentcolor'),
				href = element.get('href');

			query += '&accent-colorchooser=' + encodeURIComponent(accentColor.get('value'));
			query +=  (pattern) ? '&main-pattern=' + pattern.get('rel') : '';

			if (href.contains('&')) href += '&' + query;
			else href += '?' + query;

			window.location = href;
		}

	});

	var ScrollSpy = new Class({

		/* implements */
		Implements: [Options,Events],

		/* options */
		options: {
			container: window,
			max: 0,
			min: 0,
			mode: 'vertical'/*,
			onEnter: $empty,
			onLeave: $empty,
			onScroll: $empty,
			onTick: $empty
			*/
		},

		/* initialization */
		initialize: function(options) {
			/* set options */
			this.setOptions(options);
			this.container = document.id(this.options.container);
			this.enters = this.leaves = 0;
			this.inside = false;

			/* listener */
			var self = this;
			this.listener = function(e) {
				/* if it has reached the level */
				var position = self.container.getScroll(),
					xy = position[self.options.mode == 'vertical' ? 'y' : 'x'];
				/* if we reach the minimum and are still below the max... */
				if(xy >= self.options.min && (self.options.max === 0 || xy <= self.options.max)) {
						/* trigger enter event if necessary */
						if(!self.inside) {
							/* record as inside */
							self.inside = true;
							self.enters++;
							/* fire enter event */
							self.fireEvent('enter',[position,self.enters,e]);
						}
						/* trigger the "tick", always */
						self.fireEvent('tick',[position,self.inside,self.enters,self.leaves,e]);
				}
				/* trigger leave */
				else if(self.inside){
					self.inside = false;
					self.leaves++;
					self.fireEvent('leave',[position,self.leaves,e]);
				}
				/* fire scroll event */
				self.fireEvent('scroll',[position,self.inside,self.enters,self.leaves,e]);
			};

			/* make it happen */
			this.addListener();
		},

		/* starts the listener */
		start: function() {
			this.container.addEvent('scroll',this.listener);
		},

		/* stops the listener */
		stop: function() {
			this.container.removeEvent('scroll',this.listener);
		},

		/* legacy */
		addListener: function() {
			this.start();
		}
	});


	window.addEvent('domready', function(){
		var panel = document.getElement('.style-panel-container'),
			sp = new StylePanel('.style-panel-container', '.style-panel-toggle', {status: 'show'});
			ss = new ScrollSpy({
				min: 1,
				onEnter: function(){ panel.setStyle('position', 'fixed'); },
				onLeave: function(){ panel.setStyle('position', 'absolute'); },
				onTick: function(){
					Object.each(window['moorainbow'], function(rainbow, key){
						if (rainbow.visible){
							rainbow.rePosition();
						}
					});
				}
			});

		window.fireEvent('scroll');
	});

})());
