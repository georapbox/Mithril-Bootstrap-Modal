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

        // The modal's view.
        this.view = function (opts) {
            return this.visible() ?
                m('.modal', {config: modalConfig}, [
                    m('.modal-dialog', [
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
        this.visible = m.prop(false);
        document.body.classList.remove('modal-open');
    };

    proto.isVisible = function () {
        return this.visible();
    };

    return Modal;
}));
