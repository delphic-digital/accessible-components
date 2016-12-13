define(['jquery', './common/events', './common/aria'],function($, events, aria) {

	return {

		settings: {
			$accordion: $('.accordion'),
			$tab: $('.accordion__tab'),
			$panel: $('.accordion__panel')
		},

		init: function() {
			var _ = this;

			_.bindAria();
			_.initEvents();
		},

		bindAria: function() {
			var _ = this;
			aria.bindAccordion(_.settings.$accordion, _.settings.$tab, _.settings.$panel);
		},

		initEvents: function() {
			var _ = this;

			_.settings.$tab.off().on('click keydown', function(e) {
				let $clickedTab = $(this);
				let $panel = _.settings.$panel;

				// click, enter, or spacebar
				// open/close the accordion tabs
				if ( e.type == 'click' || e.keyCode == 13 || e.keyCode == 32 ) {
					events.openSlide($clickedTab,$panel,'.accordion__icon');
				} 
				// left or up arrow keys
				// move focus to previous accordion tab
				else if ( e.keyCode == 37 || e.keyCode == 38 ) {
					events.goPrev($clickedTab);
				}
				// down or right arrow keys
				// move focus to next accordion tab
				else if ( e.keyCode == 39 || e.keyCode == 40 ) {
					events.goNext($clickedTab);
				}
			});

			_.settings.$panel.off().on('keydown', function(e) {
				// CTRL + up arrow key
				// when in accordion panel, move focus to related accordion tab
				if ( e.keyCode == 38 && e.ctrlKey ) {
					events.goRelated($(this));
				}
			});
		},

		destroy: function() { }
	};
});