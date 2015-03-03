Meteor.methods({
        addTask: function (text, guestId) {
		var userid = 0;
		var username = "";
		if (Meteor.userId() !== null) {
			userid = Meteor.userId();
			username = Meteor.user().username;
		}
		Tasks.insert({
			text: text,
			createdAt: new Date(),
			closedAt: null,
			guestId: guestId,
			userid: userid,
			username: username
		});
        },
	deleteTask: function (taskId, guestId) {
		var task = Tasks.findOne(taskId);
		if (Meteor.userId() !== null) {
			if (task.userid !== Meteor.userId()) {
  				throw new Meteor.Error("not-authorized");
			}
		}
		else {
			if (task.guestId !== guestId) {
				throw new Meteor.Error("not-authorized");
			}
		}
    		Tasks.remove(taskId);
	},
	updateGuest: function (guestid) {
		Tasks.update({
			guestId: guestid
		}, {
			$set: {
				userid: Meteor.userId(),
				username: Meteor.users.username
			}
		}, {
			multi: true
		});
		console.log('update all guest records: ' + guestid + ' to userid: ' + Meteor.userId());
	}
});

