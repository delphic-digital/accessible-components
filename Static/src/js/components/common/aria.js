define(['jquery'],function($) {

	return {

		settings: {
		},

		init: function() {
		},

		bindAccordion: function($accordion,$heading,$tab,$panel) {
			var _ = this;

			$($accordion).each(function(i){
				var $this = $(this);
				$this.attr('id', 'accordion_' + i);

				_.setAccordionAttributes($this,$heading,$tab,$panel, i);
			});
		},

		setAccordionAttributes: function($this,$heading,$tab,$panel, i) {
			$this.find($heading).each(function(){
				var $this = $(this);
				$this.attr({
					'role': 'heading',
					'aria-level': '3',
				});
			});

			$this.find($tab).each(function(j){
				var $this = $(this);
				$this.attr({
					'id': 'a' + i + '_tab' + j,
					'role': 'button',
					'aria-expanded': 'false',
					'aria-controls': 'a' + i + '_panel' + j
				});
			});
				
			$this.find($panel).each(function(j){
				var $this = $(this);
				$this.attr({
					'id': 'a' + i + '_panel' + j,
					'role': 'region',
					'aria-hidden': 'true',
					'aria-labelledby': 'a' + i + '_tab' + j
				});
			});
		},

		bindForm: function($form) {
			var _ = this;

			$($form).each(function(i){
				var $this = $(this);
				$this.attr('id', 'form_' + i);

				_.setFormAttributes($this, i);
			});
		},

		setFormAttributes: function($this, i) {
			$this.attr({
				'role': 'form',
				'aria-labelledby': 'form_' + i + '_title'
			});

			$this.find('.form__title').attr({
				'id': 'form_' + i + '_title'
			})
		},

		setAriaVisible: function($clickedTab) {
			// clickedTab is the link within the dt element
			$clickedTab.attr('aria-expanded', 'true');
			// the related panel is the dd element after the dt element, so we need to move up a level
			$clickedTab.parent().next('[aria-hidden=true]').attr('aria-hidden', 'false');
		},

		setAriaHidden: function($clickedTab) {
			$clickedTab.attr('aria-expanded', 'false');
			$clickedTab.parent().next('[aria-hidden=false]').attr('aria-hidden', 'true');
		},

		destroy: function() { }
	};
});