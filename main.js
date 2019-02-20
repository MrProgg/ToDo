$(function () {

	function hideTask() {
		$('#empty-list').hide();
	};

	function showTask() {
		$('#empty-list').show();
	};

	$('button').click(function () {
		var taskName = $('input').val();
		var taskDescription = $('textarea').val();
		var check = false;
		
// Checking for empty input
		if (!taskName || !taskDescription) {
			var warning = `<div id='warn'>Необходимо заполнить оба поля</div>`
			$('body').append(warning);
			setTimeout(function(){
				$('#warn').remove()
			}, 2000)
			return false;
		};	

// Adds checking for the same task and marks it
		$(".new-task").each(function () {		
			if ($(this).text().trim() === taskName) {
				$(this).addClass('alert')
				setTimeout(function(){
					$('.new-task').removeClass('alert')
				}, 2500)
				check = true

// Scrols same task to the top
				$([document.documentElement, document.body]).animate({
					scrollTop: $(this).offset().top -70
			}, 500);
			};
		});

// Adds warning text to the top of the page
		if (check) {
			var warning = `<div id='fail'>Такое задание уже есть</div>`
			$('body').append(warning);
			setTimeout(function(){
				$('#fail').remove()
			}, 2000)

// Adds new task
		} else {
			hideTask();
			var taskList = `<div class='one-task'><div class='new-task'>${taskName}<img class='delete-button' src='img/red-x.png' alt='del'><img class='description-open-button' src='img/Black-triangle.png' alt='open'></div><div class='new-task-description'>${taskDescription}</div></div>`;
			$('#task-container').append(taskList);
		};

// Clears input aeria
		$('input').val('');
		$('textarea').val('');
	});

// Delete the task
	$('#task-container').on('click', '.delete-button', function () {
		$(this).parent().parent().remove();
		if ($('#task-container').html().trim() === '') {
			showTask()
		} else hideTask();
	});

// Hides or opens task description
	$('#task-container').on('click', '.description-open-button', function () {
		$(this).parent().next().fadeToggle();
		$(this).toggleClass('description-open-button-toggle')
	});
});