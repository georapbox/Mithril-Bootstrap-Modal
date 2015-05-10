/* global Modal */
(function () {
    'use strict';

    var myModal = new Modal();

    var app = {
        view: function () {
            return m('div', [
                m('.btn.btn-primary', {onclick: myModal.show.bind(myModal)}, 'Click to show modal'),
                myModal.view({
                    header: function () {
                        return m('h4.modal-title', 'Lorem ipsum');
                    },
                    body: function () {
                        return m('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem, sint necessitatibus beatae, perspiciatis deserunt praesentium iusto, distinctio corrupti, laborum cupiditate ut. Veritatis eos iure eveniet, nisi, mollitia pariatur unde?');
                    },
                    footer: function () {
                        return m('a.btn.btn-default', {
                            onclick: myModal.hide.bind(myModal)
                        }, 'Close');
                    }
                })
            ]);
        }
    };

    m.mount(document.getElementById('view'), app);

    return app;
}());
