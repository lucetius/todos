Meteor.methods({
    addTask: function(name, guestId) {
        var userId = 0;
        var userName = '';
        
        name = prepareTask(name);
        
        if (Meteor.userId() !== null) {
            userId = Meteor.userId();
            userName = Meteor.user().username;
        }
        
        if (validateTask(name)) {
            Tasks.insert({
                name:       name,
                createdAt:  new Date().getTime(),
                closedAt:   null,
                guestId:    guestId,
                userId:     userId,
                userName:   userName
            });
        }   
    },
    deleteTask: function(taskId, guestId) {
        var task = Tasks.findOne(taskId);
        if (Meteor.userId() !== null) {
            if (task.userId !== Meteor.userId()) {
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
    saveDesc: function (text, guestId) {
        var closedAt = new Date().getTime();
        Tasks.update({
                guestId: guestId,
                closedAt: null
            }, {
            $set: {
                desc: text,
                closedAt: closedAt
            }
            }, {
            multi: true
        });
    },
    updateGuest: function (guestId) {
        if (Meteor.userId() !== null) {
            var userId = Meteor.userId();
            var userName = Meteor.user().username;
            Tasks.update({
                    guestId: guestId,
                    userId: 0
                }, {
                $set: {
                    userId: userId,
                    userName: userName
                }
                }, {
                multi: true     
            });
        }
    }
    
});