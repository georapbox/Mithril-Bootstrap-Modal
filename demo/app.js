/* global Modal */
(function () {
    'use strict';

    var myModal = new Modal();
    var myModal2 = new Modal();
    var myModal3 = new Modal();

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
                        return m('.btn.btn-primary', {onclick: myModal2.show.bind(myModal2)}, 'Click to show modal 2');
                    }
                }),

                myModal2.view({
                    header: function () {
                        return m('h4.modal-title', 'Lorem ipsum');
                    },
                    body: function () {
                        return m('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem, sint necessitatibus beatae, perspiciatis deserunt praesentium iusto, distinctio corrupti, laborum cupiditate ut. Veritatis eos iure eveniet, nisi, mollitia pariatur unde?');
                    },
                    footer: function () {
                        return m('.btn.btn-primary', {onclick: myModal3.show.bind(myModal3)}, 'Click to show modal 3');
                    }
                }),

                myModal3.view({
                    header: function () {
                        return m('h4.modal-title', 'Lorem ipsum');
                    },
                    body: function () {
                        return m('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem, sint necessitatibus beatae, perspiciatis deserunt praesentium iusto, distinctio corrupti, laborum cupiditate ut. Veritatis eos iure eveniet, nisi, mollitia pariatur unde?');
                    },
                    footer: function () {
                        return m('a.btn.btn-default', {
                            onclick: myModal3.hide.bind(myModal3)
                        }, 'Close');
                    }
                })
            ]);
        }
    };

    m.mount(document.getElementById('view'), app);

    return app;
}());
