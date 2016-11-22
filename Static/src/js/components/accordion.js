define(['jquery'],function($) {

	return {

		settings: {
			$accordion: $('.accordion'),
			$tab: $('.accordion__tab'),
			$panel: $('.accordion__panel')
		},

		init: function() {
			var _ = this;

			_.bindAriaEvents();
			_.initClickEvent();
		},

		initClickEvent: function() {
			var _ = this;

			_.settings.$tab.off().on('click keypress', function(e) {
				$clickedTab = $(this);
				$clickedTab.next('.accordion__panel').slideToggle(300);
				$clickedTab.children('.accordion__icon').toggleClass('open');

				if ( $clickedTab.children('.accordion__icon').hasClass('open') ){
					_.setAriaVisible($clickedTab);
				} else {
					_.setAriaHidden($clickedTab);
				}
				
  			});
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

		destroy: function() { }
	};
});