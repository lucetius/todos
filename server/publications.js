Meteor.publish("tasks", function (guestId) {
	return Tasks.find({
	$or: [
		{ userid: this.userid },
		{ guestId: guestId }
	]
	});
});

