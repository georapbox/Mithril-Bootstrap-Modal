/* global Modal */
(function () {
    'use strict';

    var modal = new Modal();

    var app = {
        view: function () {
            return m('div', [
                m('.btn.btn-primary', {onclick: modal.show.bind(modal)}, 'Show modal'),
                modal.view({
                    header: function () {
                        return m('h4.modal-title', 'Lorem ipsum');
                    },
                    body: function () {
                        return m('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem, sint necessitatibus beatae, perspiciatis deserunt praesentium iusto, distinctio corrupti, laborum cupiditate ut. Veritatis eos iure eveniet, nisi, mollitia pariatur unde?');
                    },
                    footer: function () {
                        return m('a.btn.btn-default', {
                            onclick: modal.hide.bind(modal)
                        }, 'Close');
                    }
                })
            ]);
        }
    };

    m.mount(document.getElementById('view'), app);

    return app;
}());
