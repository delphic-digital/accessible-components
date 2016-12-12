define(['jquery'],function($) {

	return {

		settings: {
		},

		init: function() {
		},

		bindAccordion: function($accordion,$tab,$panel) {
			var _ = this;

			$($accordion).each(function(i){
				var $this = $(this);
				$this.attr('id', 'accordion_' + i);

				_.setAccordionAttributes($this,$tab,$panel, i);
			});
		},

		setAccordionAttributes: function($this,$tab,$panel, i) {
			$this
				.attr({
					'role': 'tablist',
					'multiselectable': 'true'
			});

			$this.find($tab).each(function(j){
				var $this = $(this);
				$this.attr({
					'id': 'a' + i + '_tab' + j,
					'role': 'tab',
					'tabindex': '0',
					'aria-expanded': 'false',
					'aria-controls': 'a' + i + '_panel' + j
				});
			})
				
			$this.find($panel).each(function(j){
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