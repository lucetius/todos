Router.configure({
    layoutTemplate: 'ApplicationLayout'
});


Router.map(function() {
    this.route('home', {path: '/'});
    this.route('history', {     
        onBeforeAction: function() {
            if (!Meteor.userId()) {
                this.redirect('/');
            }
            else {
                this.next();
            }
        }
    });
    this.route('pageNotFound', {path: '/(.*)'});
});