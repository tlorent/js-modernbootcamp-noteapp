// TODO: 1. Create a notes array and fill it with objects.
// TODO: 2. Display the notes on the screen.
// TODO: 3. Sort the notes with a checkbox.
// TODO: 4. Add a filters object that you can use for the sorting and hiding of notes and searching for them.
// TODO: 5. Search for notes.
// TODO: 6. Add a new note.
// TODO: 7. Hide read notes.


// TODO: 1. Create a notes array and fill it with objects.

const notes = [{
    title: 'My first note',
    description: 'I cannot wait for a new note',
    read: true
},
{
    title: 'Habits to work on',
    description: 'Calm down, live life, code more',
    read: false
},
{
    title: 'Office modifications',
    description: 'New chair, plants',
    read: true
},{
    title: 'Future plans',
    description: 'Travel the world, become calm',
    read: false
}]

// TODO: 4. Add a filters object that you can use for the sorting and hiding of notes and searching for them.

const filters = {
    sortCompleted: false,
    hideRead: false,
    searchText: ''
}

// TODO: 3. Sort the notes.
// 1. Select the sort notes checkbox in the DOM.
// 2. Add an eventListener for when the checkbox is checked.
// 3. Sort the notes array by title.

const renderNotes = function(notes, filters) {

    if (filters.sortCompleted) {

        // Clear the complete div of notes so that you don't see double notes after sorting them.
        document.querySelector('.notes').innerHTML = ''

        const sortedNotes = notes.sort(function (a, b) {
            let titleA = a.title.toLowerCase()
            let titleB = b.title.toLowerCase()

            // If titleA is greater than titleB, i.e. if 'my first note' is greater than 'habits to work on', sort titleB at a lower index, i.e. titleB comes before titleA in the array.
            if (titleA > titleB) {
                return 1
            }
            // If 'my first note' is smaller than 'habits to work on', sort titleA at a lower index, i.e. titleA comes before titleB in the array.
            else if (titleA < titleB) {
                return -1
            }
            // If both are the same, leave them at their respective places. 
            else {
                return 0
            }
        })

        sortedNotes.forEach(function (note) {
            // Create a new paragraph tag for each note.
            let newEl = document.createElement('p')
            // Set the text content of the paragraph to the title of the note.
            newEl.textContent = note.title
            // Add it to the HTML at the end of the body section.
            document.querySelector('.notes').appendChild(newEl)
        })
    } if (filters.hideRead) {
        // Check if the notes have a value of true or false for the read property.
        const readNotes = notes.filter(function (note) {
            return note.read === filters.hideRead
        })

        // Clear the complete div of notes so that you don't see double notes after sorting them.
        document.querySelector('.notes').innerHTML = ''

        readNotes.forEach(function (note) {
            // Create a new paragraph tag for each note.
            let newEl = document.createElement('p')
            // Set the text content of the paragraph to the title of the note.
            newEl.textContent = note.title
            // Add it to the HTML at the end of the body section.
            document.querySelector('.notes').appendChild(newEl)
        })
    } else {
        // TODO: 2. Display the notes on the screen.

        // Clear the complete div of notes so that you don't see double notes after sorting them.
        document.querySelector('.notes').innerHTML = ''

        notes.forEach(function (note) {
            // Create a new paragraph tag for each note.
            let newEl = document.createElement('p')
            // Set the text content of the paragraph to the title of the note.
            newEl.textContent = note.title
            // Add it to the HTML at the end of the body section.
            document.querySelector('.notes').appendChild(newEl)
        })
    }
}

// Call the function first so that the notes show up at first.
renderNotes(notes, filters)

document.querySelector('#sort-notes').addEventListener('change', function (e) {

    // Set the value of sortCompleted in the filters array equal to when the checkbox is checked.
    filters.sortCompleted = e.target.checked

    // Call the renderNotes function with the new filter
    renderNotes(notes, filters)
})

// TODO: 5. Search for notes.
// 1. Get the value of the input field when the user types.
// 2. Select the input field and add an event listener.
// 3. Filter through the notes array and check if the value that the user types matches any of the note titles. Make this lowercase.
// 4. Only display the matched note, so remove any notes that do not match the filter.
// 5. Create a searchNotes function where you use the searchText property that is set by the user input in the input field.
// 6. Rerender notes.

// The function for searching the notes, which takes in the notes array and the filters object as arguments.
const searchNotes = function(notes, filters) {

    // Filter through the notes to see if the title of a note includes the value of the searchText property of the filters object.
    const filteredNotes = notes.filter(function(note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });

    // Clear the complete div of notes so that you don't see double notes after sorting them.
    document.querySelector('.notes').innerHTML = ''

    filteredNotes.forEach(function(note) {
        // Create a new paragraph tag for each note.
        let newEl = document.createElement('p')
        // Set the text content of the paragraph to the title of the note.
        newEl.textContent = note.title
        // Add it to the HTML at the end of the body section.
        document.querySelector('.notes').appendChild(newEl)
    });
};

// eventListener for searching the notes.
document.querySelector("#search-notes").addEventListener('input', function (e) {

    // Set the searchText property of the filters object so the input of the user. This updates each time the user types a new letter. Then call the searchNotes function with the latest filters.
    filters.searchText = e.target.value
    searchNotes(notes, filters)
})

// TODO: 6. Add a new note.
// 1. Target the form for adding a new note.
// 2. Prevent the default form action, which is reloading the page.
// 3. Get the value of the user input.
// 4. Push this new title to the notes array.
// 5. Create a function to add new notes.
// 6. Rerender the notes.

// Set a function to add the notes to the notes array, taking in an argument which is the note title (because you only have one input field, we will set the description property blank).
const addNotes = function (notes, title) {
    notes.push({
        title: title,
        description: ''
    })
    
    renderNotes(notes, filters)
}
 
// eventListener for adding new notes.
document.querySelector('#new-note').addEventListener('submit', function (e){

    // Prevent the default behaviour of a form, i.e. prevent it from reloading the entire page on submit.
    e.preventDefault();

    // Store the value of the new note input field of the user in a new variable.
    const newNote = e.target.elements.newNote.value

    // Clear the input field after submitting so that the value does not 'stick' in the input.
    e.target.elements.newNote.value = ""
    
    // Call the addNotes function with the user input value. There is only one input field so we can push this value as the title of the new note.
    addNotes(notes, newNote)
})

// TODO: 7. Hide read notes.
// 1. Target the checkbox for hiding notes and add an eventListener.
// 2. Store the value of the checked checkbox and set this to the hideRead property of the filters object.
// 3. Rerender the notes.

document.querySelector("#hide-notes").addEventListener('change', function (e){
    
    // Store the checked value in the hideRead property of the filters object.
    filters.hideRead = e.target.checked

    // Call the hideNotes function.
    renderNotes(notes, filters)
})