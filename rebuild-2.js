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

const filters = {
    sortCompleted: false,
    hideRead: false,
    searchText: ''
}

const renderNotes = function(notes, filters) {

    // Filter through the notes to see if the title of a note includes the value of the searchText property of the filters object.
    // At first, all the notes will show up because the searchText is empty. It will only be filled once the user fills in the input field.
    let filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });
    
    // Ensure that you can also only hide notes that have been filtered, i.e. the user has searched for some notes and then you can hide the ones that have a value of true for the property read, and that you can search for only the hidden notes when the user has clicked on the hide notes button.
    filteredNotes = filteredNotes.filter(function (note) {

        // At first, the hideRead property is set to false. So for each note, return notes that have a read property of false or the opposite of the initial hideRead value which is false (so for each note you check if its read property is true).
        // When you click the checkbox to hide the notes, for each note again you either return notes that have a property of false or are not equal to the filters.hideRead property which will be set to true when you click it.
        return !note.read || !filters.hideRead
    })

    // Clear the complete div of notes so that you don't see double notes after sorting, hiding, or sorting them.
    document.querySelector('.notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        // Create a new paragraph tag for each note.
        let newEl = document.createElement('p')
        // Set the text content of the paragraph to the title of the note.
        newEl.textContent = note.title
        // Add it to the HTML at the end of the body section.
        document.querySelector('.notes').appendChild(newEl)
    });
}

// Call the function first so that the notes show up at first.
renderNotes(notes, filters)

document.querySelector('#sort-notes').addEventListener('change', function (e) {

    // Set the value of sortCompleted in the filters array equal to when the checkbox is checked.
    filters.sortCompleted = e.target.checked

    // Call the renderNotes function with the new filter
    renderNotes(notes, filters)
})

// eventListener for searching the notes.
document.querySelector("#search-notes").addEventListener('input', function (e) {

    // Set the searchText property of the filters object to the input of the user. This updates each time the user types a new letter. Then call the searchNotes function with the latest filters.
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})
 
// eventListener for adding new notes.
document.querySelector('#new-note').addEventListener('submit', function (e){

    // Prevent the default behaviour of a form, i.e. prevent it from reloading the entire page on submit.
    e.preventDefault();

    // Store the value of the new note input field of the user in a new variable.
    const newNote = e.target.elements.newNote.value

    // Clear the input field after submitting so that the value does not 'stick' in the input.
    e.target.elements.newNote.value = ""
    
    // Push the new note to the notes array, using the input for the title. There is only one input field so the description remains blank.
    notes.push({
        title: newNote,
        description: '',
        read: false
    })
    
    // Call the renderNotes function again with the latest addition of the user. This will ensure that the added note will show up on the page
    renderNotes(notes, filters)
})

// eventListener for hiding notes.
document.querySelector("#hide-notes").addEventListener('change', function (e){
    
    // Store the checked value in the hideRead property of the filters object.
    filters.hideRead = e.target.checked

    // Call the hideNotes function.
    renderNotes(notes, filters)
})