/**
 * Mithril-Bootstrap-Modal
 * A Mithril implementation of a Bootstrap 3 modal dialog.
 * @version 0.0.1
 * @homepage https://github.com/georapbox/Mithril-Bootstrap-Modal
 * @author George Raptis (https://github.com/georapbox)
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 George Raptis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (name, context, definition) {
    'use strict';

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define(definition);
    } else {
        context[name] = definition();
    }
}('Modal', this, function () {
    'use strict';

    function whichTransitionEvent() {
        var key,
            el = document.createElement('div'),
            transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

        for (key in transitions) {
            if (transitions.hasOwnProperty(key)) {
                if (el.style[key] !== undefined) {
                    el = null;
                    return transitions[key];
                }
            }
        }
    }

    /**
     * Returns a pseudo-random number (integer or floating-point)
     * between a min (inclusive) and a max (exclusive) value.
     * @param {Number} min The minimum value of the range.
     * @param {Number} max The maximum value of the range.
     * @param {Boolean} [floatPoint=false] If true the returned number will be floating-point.
     * @returns {Number} The pseudo-random number.
     */
    function randomBetween(min, max, floatPoint) {
        var isFloatPoint = floatPoint === true;
        min = isFloatPoint ? parseFloat(min) : parseInt(min, 10);
        max = isFloatPoint ? parseFloat(max) : parseInt(max, 10);
        var rInt = Math.random() * (max - min);
        return isFloatPoint ? rInt + min : Math.floor(rInt) + min;
    }

    var transitionEvent = whichTransitionEvent();

    /**
	 * Creates a modal instance.
	 * @constructor
	 */
    function Modal() {
        var that = this;
        var modalConfig = function (element, isInitialized, context) {
            if (!isInitialized) {
                setTimeout(function () {
                    element.classList.add('fadein');
                }, 50);

                var handleKey = function (e) {
                    if (e.keyCode === 27) {
                        m.startComputation();
                        that.hide();
                        m.endComputation();
                    }
                };

                var handleClickOutside =  function (e) {
                    if (e.target.classList.contains('modal')) {
                        m.startComputation();
                        that.hide();
                        m.endComputation();
                    }
                };

                document.body.addEventListener('keyup', handleKey, false);
                element.addEventListener('click', handleClickOutside, false);

                context.onunload = function () {
                    element.removeEventListener('click', handleClickOutside, false);
                    document.body.removeEventListener('keyup', handleKey, false);
                };
            }
        };

        // Getter / Setter for modal's visibility status.
        this.visible = m.prop(false);

        // A unique identifier for every modal instance.
        this.modalId = 'js_modal_' + randomBetween(0, 1000) + randomBetween(1000, 2000) + randomBetween(2000, 3000);

        // The modal's view.
        this.view = function (opts) {
            return this.visible() ?
                m('.modal', {config: modalConfig, id: this.modalId, class: opts.class}, [
                    m('.modal-dialog', {class:opts.modalSizeClass}, [
                        m('.modal-content', [
                            opts.header ? m('.modal-header', [
                                m('a.close', {onclick: this.hide.bind(this)}, m.trust('&times;')), opts.header()
                            ]) : '',
                            opts.body ? m('.modal-body', opts.body()) : '',
                            opts.footer ? m('.modal-footer', opts.footer()) : ''
                        ])
                    ])
            ]) : '';
        };
    }

    var proto = Modal.prototype;

    proto.show = function () {
        this.visible = m.prop(true);
        document.body.classList.add('modal-open');
    };

    proto.hide = function () {
        var that = this;

        document.body.classList.remove('modal-open');

        if (transitionEvent) {
            var modalEl = document.getElementById(this.modalId),
                dialogEl = modalEl.querySelector('.modal-dialog');

            dialogEl.addEventListener(transitionEvent, handleTransitionEnd, false);
            modalEl.classList.remove('fadein');
        } else {
            this.visible = m.prop(false);
        }

        function handleTransitionEnd() {
            dialogEl.removeEventListener(transitionEvent, handleTransitionEnd, false);
            m.startComputation();
            that.visible = m.prop(false);
            m.endComputation();
        }
    };

    proto.isVisible = function () {
        return this.visible();
    };

    return Modal;
}));
