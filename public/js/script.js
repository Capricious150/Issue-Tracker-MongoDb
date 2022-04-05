console.log("Yes you're in the right JS file");

class Note {
    constructor(title,body){
        this.title = title;
        this.body = body;
    }
}

const handleAddNote = async (event) => {
    event.preventDefault()
    let myTarget = $(event.target)    
    let findParents = myTarget.parents(".updateTaskDiv")
    let titleBody = findParents.find('.noteTitle').val()
    let bodyBody = findParents.find('.noteBody').val()

    let newNote = new Note(titleBody, bodyBody)

    const response = await fetch(`/tasks/newnote/${event.target.value}`, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok){
        document.location.replace('/tasks/')
    } else {
        alert("Something went wrong, check the logs")
    }
}

const getResolved = () => {
    document.location.replace('/tasks/resolved')
}

const getUnresolved = () => {
    document.location.replace('/tasks/')
}

const handleTaskSubmit = async (event) => {
    event.preventDefault();
    console.log("Function Started");
    console.log($('#taskBody').val())

    const response = await fetch('/tasks/create', {
        method: "POST",
        body: JSON.stringify({
            'title': $('#taskTitle').val(),
            'body': $('#taskBody').val(),
            'owner': 'Capricious150',
            'project': $('#projectsDropdown').val()
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }) 
    if (response.ok) {
        document.location.replace('/tasks/')
    } else {
        alert("Something went wrong, check the logs")
    }
}

const markResolved = async (event) => {
    event.preventDefault();
    console.log(event.target.value)

    const response = await fetch (`/tasks/resolve/${event.target.value}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log("After the await")
    console.log(response)
    if (response.ok) {
        console.log('Condition Met')
        document.location.replace('/tasks/')
    } else {
        alert("Something went wrong, check the logs")
    }
}

const consoleLogger = (event) => {
    event.preventDefault();
    console.log($('#projectsDropdown').val())
}

$('#viewResolved').on('click', getResolved);
$('#viewUnresolved').on('click', getUnresolved);
$('#taskSubmitButton').on('click', handleTaskSubmit);
$('.markResolved').on('click', markResolved);
$('#testButton').on('click', consoleLogger);
$('.addNoteButton').on('click', handleAddNote);
