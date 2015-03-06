Template.ApplicationLayout.events({
  "click .menuItem": function(event) {
    $('.menuItem').removeClass('active');
    $('#' + event.target.parentElement.id).addClass('active');
  }
});

Template.ApplicationLayout.helpers({
  menuActive: function(path) {
    if (document.location.pathname == path) {
      return true;
    }
    return false;
  }
})