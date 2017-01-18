define(['jquery', './common/events', './common/aria'],function($, events, aria) {

	return {

		settings: {
			$accordion: $('.accordion'),
			$tab: $('.accordion__tab'),
			$panel: $('.accordion__panel'),
			$panelLink: $('.accordion__panel a')
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
				let $clickedTab = $(this).parent(); // a tag is nested within tab container, easier to deal with tab-container for events
				let $panel = _.settings.$panel;

				// click, enter, or spacebar
				// open/close the accordion tabs
				if ( e.type == 'click' || e.keyCode == 13 || e.keyCode == 32 ) {
					e.preventDefault();
					events.openSlide($clickedTab,$panel,'.accordion__icon');
				} 
				// left or up arrow keys
				// move focus to previous accordion tab
				else if ( e.keyCode == 37 || e.keyCode == 38 ) {
					e.preventDefault();
					events.goPrev($clickedTab);
				}
				// down or right arrow keys
				// move focus to next accordion tab
				else if ( e.keyCode == 39 || e.keyCode == 40 ) {
					e.preventDefault();
					events.goNext($clickedTab);
				}
				// HOME key || HOME NUMPAD key
				// move focus to first accordion tab
				else if ( e.keyCode == 36 || e.keyCode == 103 ) {
					e.preventDefault();
					events.goFirst($clickedTab);
				}
				// END key || END NUMPAD key
				// move focus to last accordion tab
				else if ( e.keyCode == 35 || e.keyCode == 97 ) {
					e.preventDefault();
					events.goLast($clickedTab);
				}
			});
		},

		destroy: function() { }
	};
});