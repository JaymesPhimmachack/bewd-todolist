$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var getAllTasks = function(successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=48',
    success: successCB,
    error: errorCB
  };
  $.ajax(request);
};

var postTask = function(content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=48',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  };
  $.ajax(request);
};

var deleteOneTask = function(id, successCB, errorCB) {
  var request = {
    type: 'DELETE',
    url: 'api/tasks/' + id + '?api_key=48',
    success: successCB,
    error: errorCB
  };
  $.ajax(request);
}

var markTaskAsComplete = function(id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/' + id + '/mark_complete?api_key=48',
    success: successCB,
    error: errorCB
  };
  $.ajax(request);
}

var markTaskAsActive = function(id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/' + id + '/mark_active?api_key=48',
    success: successCB,
    error: errorCB
  };
  $.ajax(request);
}
