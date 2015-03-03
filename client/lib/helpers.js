Template.body.helpers({
        tasks: function () {
		return Tasks.find({});
        },
	guestId: function() {
		return Session.get("guestId");
	},
	incompleteCount: function () {
		var tasksCount = Tasks.find({closedAt: null}).count();
		if (Meteor.userId()) {
			$('#warning').css('display', 'none');
		}
		if (tasksCount > 0) {
			$(".startTask").slideDown('fast');
		}
		else {
			$(".startTask").slideUp('fast');
		}
		return tasksCount;
	}

});
