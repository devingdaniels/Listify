function createPanel(){
    const select = document.createElement('select')
    const edit = document.createElement('option')
    const deleteTask = document.createElement('option')

    edit.innerHTML = "Edit"
    deleteTask.innerHTML = "Delete"

    select.append(edit)
    select.append(deleteTask)
    

    return select
}


export {createPanel}