#Mithril-Bootstrap-Modal
A [Mithril](https://lhorie.github.io/mithril/) implementation of a [Bootstrap 3](http://getbootstrap.com/javascript/#modals) modal dialog.

##How to use
After you have included a copy of Mithril and a copy of Bootstrap CSS in your document, include <code>mithril_modal.css</code> and <code>mithril_modal.js</code>

```js
var myModal = new Modal();

var app = {
    view: function () {
        return m('div', [
            m('.btn.btn-primary', {onclick: myModal.show.bind(myModal)}, 'Click to show modal'),
            myModal.view({
                class: 'rootClass',
                modalSizeClass: 'modal-lg',
                header: function () {
                    return m('h4.modal-title', 'modal title goes here');
                },
                body: function () {
                    return m('p', 'modal body goes here');
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
```

##API

###Methods

- <code>Modal.prototype.show</code>: Displays the modal instance.
- <code>Modal.prototype.hide</code>: Hides the modal instance.
- <code>Modal.prototype.isVisible</code>: Returns true if modal is visible, else false.
