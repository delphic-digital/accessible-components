//requires jQuery as $
//each accordion should have a unique id... ?
(function (global) {
    'use strict';

    function A11yAccordion(accordionEl){
        this.create(accordionEl);
    }

    A11yAccordion.prototype.create = function(accordionEl){
        
        //find the aria-controls attr & listen for clicks on it to open / close the relevant pannel (id will match the aria-controls attr value)
        $(accordionEl).find('.js-accordion__tab').each(function(){
            
            var tabControlEl = $(this);

            $(this).off().on('click keydown', function(e){
                
                var panelEl = $('#' + $(tabControlEl).attr('aria-controls'));

                // click, enter, or spacebar
                // open/close the relevant panel
                if ( e.type == 'click' || e.keyCode == 13 || e.keyCode == 32 ) {
                    e.preventDefault();
                    togglePanel(panelEl, tabControlEl);
                } 
                // left or up arrow keys
                // move focus to previous accordion tab
                else if ( e.keyCode == 37 || e.keyCode == 38 ) {
                    e.preventDefault();
                    focusPreviousPanelControl(tabControlEl);
                }
                // down or right arrow keys
                // move focus to next accordion tab
                else if ( e.keyCode == 39 || e.keyCode == 40 ) {
                    e.preventDefault();
                    focusNextPanelControl(tabControlEl);
                }
                // HOME key || HOME NUMPAD key
                // move focus to first accordion tab
                else if ( e.keyCode == 36 || e.keyCode == 103 ) {
                    e.preventDefault();
                    focusfirstPanelControl(tabControlEl);
                }
                // END key || END NUMPAD key
                // move focus to last accordion tab
                else if ( e.keyCode == 35 || e.keyCode == 97 ) {
                    e.preventDefault();
                    focusLastPanelControl(tabControlEl);
                }
            });
        });
    }

    function togglePanel(panelEl, tabControlEl){
        
        if (panelEl.attr('aria-hidden') == "true") {
            //expand it
            panelEl.attr('aria-hidden', "false");
            tabControlEl.attr('aria-expanded', "true");
        } else {
            //collapse it
            panelEl.attr('aria-hidden', "true");
            tabControlEl.attr('aria-expanded', "false");
        }
    }

    function focusPreviousPanelControl(tabControlEl){
        tabControlEl.closest('.accordion__panel-wrap').prev().find('.js-accordion__tab').focus();
    }

    function focusNextPanelControl(tabControlEl){
        tabControlEl.closest('.accordion__panel-wrap').next().find('.js-accordion__tab').focus();
    }

    function focusfirstPanelControl(tabControlEl){
        tabControlEl.closest('.js-accordion').find('.js-accordion__tab').first().focus();
    }

    function focusLastPanelControl(tabControlEl){
        tabControlEl.closest('.js-accordion').find('.js-accordion__tab').last().focus();
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = A11yAccordion;
    } else if (typeof define === 'function' && define.amd) {
        define('A11yDialog', [], function () {
        return A11yAccordion;
        });
    } else if (typeof global === 'object') {
        global.A11yAccordion = A11yAccordion;
    }

})( this );

$('.js-accordion').each(function(){
    var accordion = new window.A11yAccordion($(this));
});