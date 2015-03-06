validateTask = function(name) {
    if (name.length == 0) {
        return false;
    }
    
    var item = Tasks.findOne({ name: name, closedAt: null});
    if (item !== undefined) {
        return false;
    }
    
    return true;
}

prepareTask = function(name) {
    return name.trim();
}