Template.history.helpers({
    taskGroup: function() {
        //var tasks = Tasks.aggregate({ $group: { _id: "$closedAt" }},{$sort: { _id: 1}});
        var tasks = _.values(getHistoryTaskGroup());
        return tasks;
    },
    taskGroupName: function(items) {
        var task = _.sortBy(items, 'createdAt')
        return task[0].name;
    },
    taskGroupMore: function(task) {
        if (task.length > 1) {
            return '... and ' + (task.length-1) + ' more';
        }
        return '';
    },
    taskGroupFrom: function(task) {
        var taskDate = new Date(parseInt(task[0].createdAt));
        return taskDate.getFullYear() + '-' + addZero(taskDate.getMonth()+1) + '-' + addZero(taskDate.getDate())
                + ' ' + addZero(taskDate.getHours()) + ':' + addZero(taskDate.getMinutes());
    },
    taskGroupTo: function(task) {
        var taskDate = new Date(parseInt(task[0].closedAt));
        return taskDate.getFullYear() + '-' + addZero(taskDate.getMonth()+1) + '-' + addZero(taskDate.getDate())
                + ' ' + addZero(taskDate.getHours()) + ':' + addZero(taskDate.getMinutes());
    },
    taskGroupTotalItems: function(task) {
        return task.length;
    },
    taskGroupTotalTime: function(task) {
        var taskDate = Math.floor((parseInt(task[0].closedAt) - parseInt(task[0].createdAt))/1000);
        var minutes = Math.floor(taskDate / 60);
        return minutes + ' minutes and ' + addZero(taskDate - minutes) + ' seconds';
    },
    taskGroupDesc: function(task) {
        return task[0].desc;
    }
});

Template.historyItems.helpers({
    taskGroupItem: function(items) {
        return _.sortBy(items, 'createdAt');
    }
});

