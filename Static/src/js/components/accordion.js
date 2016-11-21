define(['jquery'],function($) {

	return {

		settings: {
			$accordion: $('.accordion'),
			$tab: $('.accordion__tab'),
			$panel: $('.accordion__panel'),
			currentContext: MQ.getContext()
		},

		init: function() {
			var _ = this;
			var $this = $(this);

			//get current onmediquery context
			var currentContext = MQ.getContext();

			if (currentContext === "mobile") {
				_.initMobile();
			} else {
				_.initTabletDesktop();
			}

			this.bindAriaEvents();
			_.initClickEvent();
		},

		initClickEvent: function() {
			var _ = this;
			var $this = $(this);

			_.settings.$tab.off().on('click keypress', function(e) {
				$(this).next('.accordion__panel').slideToggle(300);
				$(this).children('.accordion__icon').toggleClass('open');

				// _.setAriaVisible($this);
  			});
		},

		bindAriaEvents: function() {
			var _ = this;

			$(_.settings.$accordion).each(function(i){
				var $this = $(this);

				_.setDefaultAriaAttributes($this);
			});

			// $(_.settings.$mainNavItem).each(function(i){
			// 	var $this = $(this);

			// 	_.setDefaultAriaAttributes($this);
			// });

			// _.settings.$mainNavItem.mouseenter(function(e) {
			// 	var $this = $(this);
			// 		$flyout = $this.find(_.settings.$mainFlyout);

			// 	_.setAriaVisible($this);

			// }).mouseleave(function(e) {
			// 	var $this = $(this);

			// 	_.setAriaHidden($this);

			// });
		},

		setDefaultAriaAttributes: function($this) {
			var _ = this;

			_.settings.$accordion
				.attr({
					'role': 'tablist',
					'multiselectable': 'true'
			});

			$this.find(_.settings.$tab)
				.attr({
					'role': 'tab',
					'tabindex': '0',
					'aria-expanded': 'false'
			});

			$this.find(_.settings.$panel)
				.attr({
					'role': 'tabpanel',
					'aria-hidden': 'true'
			});
		},

		setAriaVisible: function($this) {
			var _ = this;

			$this.find('[aria-expanded=false]').attr('aria-expanded', 'true');
			$this.find('[aria-hidden=true]').attr('aria-hidden', 'false');

		},

		setAriaHidden: function($this) {
			var _ = this;

			$this.find('[aria-expanded=true]').attr('aria-expanded', 'false');
			$this.find('[aria-hidden=false]').attr('aria-hidden', 'true');

		},

		initMobile: function() {
			$('.accordion__panel').css('display', 'none');
			$('.js-accordion-toggle').removeClass('open');
		},

		initTabletDesktop: function() {
	  	
		},

		destroy: function() { }
	};
});