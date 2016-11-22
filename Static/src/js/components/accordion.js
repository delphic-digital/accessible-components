define(['jquery'],function($) {

	return {

		settings: {
			$accordion: $('.accordion'),
			$tab: $('.accordion__tab'),
			$panel: $('.accordion__panel')
		},

		init: function() {
			var _ = this;

			_.bindKeyEvents();
			_.bindAriaEvents();
			_.initClickEvent();
		},

		initClickEvent: function() {
			var _ = this;
			let keys = [];

			_.settings.$tab.off().on('click keydown', function(e) {
				let $clickedTab = $(this);
				keys[e.keyCode] = true;
				console.log(keys);

				if ( e.type == 'click' || keys[13] || keys[32] ) { 
					$clickedTab.next('.accordion__panel').slideToggle(300);
					$clickedTab.children('.accordion__icon').toggleClass('open');

					if ( $clickedTab.children('.accordion__icon').hasClass('open') ){
						$panel = $clickedTab.next('.accordion__panel');
						_.setAriaVisible($clickedTab);
						// _.getNextFocusable($panel);
					} else {
						_.setAriaHidden($clickedTab);
					} 
				}
				// functionality for 'up' or 'left' arrow keys 
				else if ( keys[37] || keys[38] ) {
					var $id = '#' + $clickedTab.parents('.accordion').attr('id') + ' .accordion__tab';
					var index = $($id).index(document.activeElement) - 1;
					if (index >= $($id).length) index = 0;
					$($id).eq(index).focus();
				} 
				// functionality for 'down' or 'right' keys
				else if ( keys[39] || keys[40] ) {
					var $id = '#' + $clickedTab.parents('.accordion').attr('id') + ' .accordion__tab';
					var index = $($id).index(document.activeElement) + 1;
					if (index >= $($id).length) index = 0;
					$($id).eq(index).focus();
				} 
				// functionality for 'CTRL' + 'up' arrow key
				else if ( keys[17] == true && keys[38] == true ) {
					alert('hi');
				}
  			});

  			_.settings.$tab.on('keyup', function(e) {
  				keys[e.keyCode] = false;
  			})
		},

		bindKeyEvents: function() {
			var _ = this;
		},

		bindAriaEvents: function() {
			var _ = this;

			$(_.settings.$accordion).each(function(i){
				var $this = $(this);
				$this.attr('id', 'accordion_' + i);

				_.setDefaultAriaAttributes($this, i);
			});
		},

		setDefaultAriaAttributes: function($this, i) {
			var _ = this;

			_.settings.$accordion
				.attr({
					'role': 'tablist',
					'multiselectable': 'true'
			});

			$this.find(_.settings.$tab).each(function(j){
				var $this = $(this);
				$this.attr({
					'id': 'a' + i + '_tab' + j,
					'role': 'tab',
					'tabindex': '0',
					'aria-expanded': 'false',
					'aria-controls': 'a' + i + '_panel' + j
				});
			})
				
			$this.find(_.settings.$panel).each(function(j){
				var $this = $(this);
				$this.attr({
					'id': 'a' + i + '_panel' + j,
					'role': 'tabpanel',
					'aria-hidden': 'true',
					'aria-labelledby': 'a' + i + '_tab' + j
				});
			})
		},

		setAriaVisible: function($clickedTab) {
			$clickedTab.attr('aria-expanded', 'true');
			$clickedTab.next('[aria-hidden=true]').attr('aria-hidden', 'false');
		},

		setAriaHidden: function($clickedTab) {
			$clickedTab.attr('aria-expanded', 'false');
			$clickedTab.next('[aria-hidden=false]').attr('aria-hidden', 'true');
		},

		getNextFocusable: function($panel) {
			// http://jsfiddle.net/TrueBlueAussie/5WkVW/12/
			// register jQuery extension
			$.extend(jQuery.expr[':'], {
				focusable: function (el, index, selector) {
					return $(el).is('a, button, :input, [tabindex]');
				}
			});

			if ( $panel.children(':focusable').length > 0 ) {
				var $canfocus = $(':focusable');
				var index = $canfocus.index(document.activeElement) + 1;
				if (index >= $canfocus.length) index = 0;
				$canfocus.eq(index).focus();
			}     
		},

		destroy: function() { }
	};
});