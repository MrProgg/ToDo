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
		
		if (!taskName || !taskDescription) {
			return false;
		};	

		$(".new-task").each(function () {		
			if ($(this).text().trim() === taskName) {
				$(this).addClass('alert')
				setTimeout(function(){
					$('.new-task').removeClass('alert')
				}, 2000)
				check = true
			};
		});
		
		if (check) {
			var warning = `<div id='fail'>Такое задание уже есть</div>`
			$('body').append(warning);
			setTimeout(function(){
				$('#fail').remove()
			}, 2500)
		} else {
			hideTask();
			var taskList = `<div class='one-task'><div class='new-task'>${taskName}<img class='delete-button' src='img/red-x.png' alt='del'><img class='description-open-button' src='img/Black-triangle.png' alt='open'></div><div class='new-task-description'>${taskDescription}</div></div>`;
			$('#task-container').append(taskList);
		};

		$('input').val('');
		$('textarea').val('');
	});

	$('#task-container').on('click', '.delete-button', function () {
		$(this).parent().parent().remove();
		if ($('#task-container').html().trim() === '') {
			showTask()
		} else hideTask();
	});

	$('#task-container').on('click', '.description-open-button', function () {
		$(this).parent().next().fadeToggle();
		$(this).toggleClass('description-open-button-toggle')
	});
});