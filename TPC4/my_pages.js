

exports.genPage = function (tasks, users=[], t = null) {
	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC4 - To Do List</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
			<script>
				function openForm(evt, formName) {
					console.log("Crl")
					var i;
				 	var x = document.getElementsByClassName("form");
					for (i = 0; i < x.length; i++) {
						x[i].style.display = "none";
					}
					var tablinks = document.getElementsByClassName("tablink");
					for (i = 0; i < x.length; i++) {
						tablinks[i].className = tablinks[i].className.replace(" w3-deep-purple", "");
  				}
					document.getElementById(formName).style.display = "block";
				 	evt.currentTarget.className += " w3-deep-purple";
				}
			</script>
		</head>
		<body>
			<div class="w3-card-4 w3-border-bottom">
				<header class="w3-container w3-deep-purple">
					<h3>Add Taks</h3>
				</header>
				<div class="w3-bar w3-white w3-border-bottom">
					<button class="w3-bar-item w3-button tablink w3-deep-purple" onclick="openForm(event, 'task')">Add Tasks</button>
					<button class="w3-bar-item w3-button tablink" onclick="openForm(event, 'user')">Add Users</button>
				</div> 

				<form class="w3-container form" id="user" method="POST" style="display:None">
					<label class="w3-text-deep-purple">User Id</label>
					<input class="w3-input" type="text" name="id" value="u${users.length}" readonly/>

					<label class="w3-text-deep-purple">User Name</label>
					<input class="w3-input" name="username" type="text"/>

					<button class="w3-btn w3-deep-purple w3-round w3-margin">Register</button>
				</form>

				<form class="w3-container form" id="task" method="POST" style="display:Block">`

	if (t == null)
	{
		pagHTML += `
						<label class="w3-text-deep-purple">Id</label>
						<input class="w3-input" type="text" name="id" value="t${tasks.length}" readonly/>

						<label class="w3-text-deep-purple">Due Date</label>
						<input class="w3-input" name="dueDate" type="date"/>

						<label class="w3-text-deep-purple">Who is going to do it</label>
						<input class="w3-input" name="author" type="text"/>

						<label class="w3-text-deep-purple">Task Description</label>
						<input class="w3-input" name="description" type="text"/>
		`
	}
	else
	{
		pagHTML += `
						<label class="w3-text-deep-purple">Id</label>
						<input class="w3-input" type="text" name="id" value="${t.id}" readonly/>

						<label class="w3-text-deep-purple">Due Date</label>
						<input class="w3-input" type="date" name="dueDate" value="${t.dueDate}"/>

						<label class="w3-text-deep-purple">Who is going to do it</label>
						<input class="w3-input" type="text" name="author" value="${t.author}"/>

						<label class="w3-text-deep-purple">Task Description</label>
						<input class="w3-input" type="text" name="description" value="${t.description}"/>`
	}
	pagHTML +=`
					<button class="w3-btn w3-deep-purple w3-round w3-mb2 w3-margin" type="submit">Register</button>
				</form>
			</div>

			<div class="w3-row" style="height:60vh">
				<div class="w3-card-4 w3-half w3-border-right" style="height:60vh">
					<div class="w3-container w3-deep-purple">
						<h3>Due Tasks</h3>
					</div>

					<table class="w3-table-all">
						<tr>
							<th>Id</th>
							<th>Author</th>
							<th>Due Date</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
						`

	for (let i=0 ; i<tasks.length ; i++)
	{
		if (tasks[i].state == "due")
		{
			let task = tasks[i]
			
			pagHTML += `
									<tr>
										<td>${task.id}</td>
										<td>${task.author}</td>
										<td>${task.dueDate}</td>
										<td>${task.description}</td>
										<td>
											<a href="http://localhost:7777/edit/${task.id}">
												[Edit]
											</a>
											<a href="http://localhost:7777/markdone/${task.id}">
												[Mark as Done]
											</a>
										</td>
									</tr>
			`
		}
	}

		pagHTML += `
					</table>
				</div>

				<div class="w3-card-4 w3-half w3-borderleft" style="height:60vh;overflow-y: hidden;">
					<div class="w3-container w3-deep-purple">
						<h3>Done Tasks</h3>
					</div>

					<!-- <div class="w3-container" style="height:100%;overflow-y: scroll;"> -->
						<table class="w3-table-all" style="overflow-y: scroll;">
							<tr>
								<th>Id</th>
								<th>Author</th>
								<th>Due Date</th>
								<th>Description</th>
							</tr>
					`

	for (let i=0 ; i<tasks.length ; i++)
	{
		if (tasks[i].state == "done")
		{
			let task = tasks[i]
			
			pagHTML += `
									<tr>
										<td>${task.id}</td>
										<td>${task.author}</td>
										<td>${task.dueDate}</td>
										<td>${task.description}</td>
									</tr>
			`
		}
	}

		pagHTML += `
						</table>
				</div>

			</div>

			<footer class="w3-container w3-deep-purple" style="height: 6vh">
				<p>By João Novais</p>
			</footer>
		</body>
	</html>
	`

	return pagHTML
}
