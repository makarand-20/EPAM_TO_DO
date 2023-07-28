import { Button } from "web3uikit";

export var deletingTodo
export function Delete({id, removingTodo, todoList}){
    deletingTodo = id
    
    function handleDeleteButton(){
        console.log("deleting",{id})
        removingTodo(id)
        console.log(todoList)
        
    }
    return (
        <div>
            <Button text="Delete" theme="colored" color="red" size="xl" onClick={handleDeleteButton}/>
        </div>        
    )
}


