
Meteor.publish("tasks", function(guestId) {
    return Tasks.find({
        $or: [
            { userId: this.userId },
            { guestId: guestId }
        ]
    });
});