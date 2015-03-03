Template.task.events({
	"click .delete": function () {
		Meteor.call("deleteTask", this._id, Session.get("guestId"));
	}
});

