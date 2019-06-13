$(".homepage.index").ready(function() {
  var addTask = function(task) {
    var htmlString = '';
    if (task.length > 1) {
      htmlString = taskList.map(function(task) {
        return '<div class="task" data-id="' + task.id + '"><span class="mark-complete-button"></span><p class="task-content">' + task.content + '</p><span class="remove-button">×</span></div>';
      });
    }
    else {
      htmlString = '<div class="task" data-id="' + task.id + '"><span class="mark-complete-button"></span><p class="task-content">' + task.content + '</p><span class="remove-button">×</span></div>';
    }

    $('#tasks').append(htmlString);

  };

  var refreshTasks = function() {
    getAllTasks(function(response) {
      taskList = response.tasks;

      addTask(taskList);

    }, function(request, errorMsg) {

    });
  };

  $('#tasks').on('click', '.mark-complete-button', function() {
    var parent = $(this).parent();
    var id = $(parent).attr('data-id');
    var completed = $(parent).hasClass('completed');

    if (completed) {
      markTaskAsActive(id, function(response) {
        if (!response.task.completed) {
          $(parent).removeClass('completed');
        }
      }, function(request, errorMsg) {
        console.error(errorMsg);
      });
    }
    else {
      markTaskAsComplete(id, function(response) {
        if (response.task.completed) {
          $(parent).addClass('completed');
        }
      }, function(request, errorMsg) {
        console.error(errorMsg);
      });

    }

  });

  $('#tasks').on('click', '.remove-button', function() {
    var parent = $(this).parent();
    var id = $(parent).attr('data-id');

    deleteOneTask(id, function(response) {
      if (response.success) {
        $(parent).remove();
      }
    }, function(request, errorMsg) {
      console.error(errorMsg);
    });

  });


  $('#task-input').keypress(function(e) {
    var key = e.which;
    var taskInput = $(this);
    if (key == 13) {
      if (taskInput.val() !== '') {
        postTask(taskInput.val(), function(response) {
          taskInput.val('');

          if (response.task.id) {
            addTask(response.task);
          }

        }, function(request, errorMsg) {
          console.error(errorMsg);
        });
      }
    }
  });

  refreshTasks();

});
