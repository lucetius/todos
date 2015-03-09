Template.home.events({
    "submit .new-task": function(event) {
        Meteor.call('addTask', event.target.taskInput.value, Session.get("guestId"));
        event.target.taskInput.value = "";
        return false;
    },
    "click .startButton": function(event) {
        $('.delete').remove();
        $('.new-task input').attr('disabled', 'true');
        $('.new-task button').attr('disabled', 'true');
        $('#login-dropdown-list').css('display', 'none');
        $('#startDiv').slideUp('slow', function() {
            $('#clockDiv').slideDown('slow');
            countDownInterval = Meteor.setInterval(countDown, 1000);
            Session.set("countDownInterval", countDownInterval);
        });
        
    },
    "click .saveButton": function() {
        $('#taskInputComplete').attr('disabled', 'true');
        Meteor.call("saveDesc", $('#taskInputComplete').val(), Session.get("guestId"));
        $('#taskInputComplete').val('');
    }
});

Template.home.rendered = function () {
    var tasksCount = getTasksCount();
    if (tasksCount > 0) {
        $("#startTask").css('display', 'block');
    }
    
    this.find('#items-container')._uihooks = {
        insertElement: function(node, next) {
            $(node).hide().insertBefore(next).slideDown('slow');
        },
        removeElement: function(node) {
            $(node.lastElementChild).fadeOut();
            $(node).slideUp('slow', function() {
                $(this).remove();
            });
        }
    };
}

Template.home.helpers({
    tasks: function() {
        return Tasks.find({ closedAt: null });
    },
    itemsCount: function() {
        var tasksCount = getTasksCount();
        
        if (tasksCount > 0) {
            $("#startTask").slideDown('slow');
        }
        else {
            $("#startTask").slideUp('slow', function() {
                itemsAddReset();
            });
        }
        return tasksCount;
    },
    timeCounter: function() {
        var count = Session.get("clockTimer");
        var minutes = addZero(Math.floor((count/60)));
        var seconds = addZero((count - (minutes*60)));
        console.log('innerhtml: ' + minutes + ':' + seconds);
        return minutes + ':' + seconds;        
    }
});

Template.homeTask.events({
    "click .delete": function () {
        Meteor.call("deleteTask", this._id, Session.get("guestId"));
    }
});