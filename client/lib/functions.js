// reset state of add items form to default view
itemsAddReset = function() {
    $('#taskInputComplete').removeAttr('disabled');
    $('#finishDiv').css('display', 'none');
    $('#clockDiv').css('display', 'none');
    $('#startDiv').css('display', '');
    $('#login-dropdown-list').css('display', '');
    $('.new-task input').removeAttr('disabled');
    $('.new-task button').removeAttr('disabled');
    Session.set("clockTimer", Session.get("clockTimerDefault"));
}

// timer coundown function
countDown = function() {
    var timer = Session.get("clockTimer");
    if (timer > 0) {
        timer--;
        Session.set("clockTimer", timer);
    }
    else {
        var countDownInterval = Session.get("countDownInterval");
        Meteor.clearInterval(countDownInterval);
        $('#clockDiv').slideUp('slow', function() {
            $('#finishDiv').slideDown('slow', function() {
                $('#login-dropdown-list').css('display', '');
            });
        });
    }
}

getTasksCount = function() {
    return Tasks.find({ closedAt: null}).count();
}

addZero = function(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

getHistoryTaskGroup = function() {
    var tasks = Tasks.find({ closedAt: {$ne: null}}, {sort: {createdAt: -1}});
    tasks = _.groupBy(tasks.fetch(), function(closedDate) { return closedDate.closedAt; });
    return tasks;    
}
