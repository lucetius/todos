Template.body.events({
	"submit .new-task": function(event) {
		Meteor.call("addTask", event.target.taskInput.value, Session.get("guestId"));
		event.target.taskInput.value = "";
		return false;
	},
	"click .btn-success": function(event) {
		$('.delete').remove();
		$('.new-task input').attr('disabled', 'true');
		$('.new-task button').attr('disabled', 'true');
		$('#startDiv').slideUp('slow', function() {
			$('#clockDiv').slideDown('slow');
		});
	}
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Meteor.startup(function () {
        if (Session.get("guestId") === undefined) {
                console.log("wchodze i nastawiam gestId");
                Session.set("guestId", Random.id());
        }
        console.log("guestId: " + Session.get("guestId"));
	Meteor.subscribe("tasks", Session.get("guestId"));
	Hooks.init();
});

Hooks.onLoggedIn = function () {
	console.log('user sie zalogowal');
	console.log(Meteor.userId());
	//Meteor.call("updateGuest", Session.get("guestId"));
}

Hooks.onLoggedOut = function (userid) {
	console.log('user o id: ' + userid + ' sie wylogowal');
	//Session.set("guestId", Random.id());
}
