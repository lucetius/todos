var taskSub;

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Meteor.startup(function () {
  // setting random guest Id
  if (Session.get("guestId") === undefined) {
    Session.set("guestId", Random.id());
  }
  console.log('setting guestId: ' + Session.get("guestId"));
  
  // setting clock for 25 minutes
  //Session.set("clockTimerDefault", (25*60));
  Session.set("clockTimerDefault", 6); //  6 seconds for tests purposes
  Session.set("clockTimer", Session.get("clockTimerDefault"));  
  
  taskSub = Meteor.subscribe("tasks", Session.get("guestId"));
  
  Hooks.init();
});

Hooks.onLoggedIn = function () {
  console.log('user logged in');
  Meteor.call('updateGuest', Session.get("guestId"));
}

Hooks.onLoggedOut = function (userid) {
  console.log('user with id: ' + userid + ' logout');
}

