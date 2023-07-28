import { useEffect, useState } from "react"
import { Button, Card, Input, Modal } from "web3uikit"
import { Edit, newTask, newTaskDesc, newTaskTitle } from "./Edit"

export default function Todo(){
    
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [editingTodo, setEditingTodo] = useState()
    const [lastTask, setLastTask] = useState()
    const [todoList, setTodoList] = useState([
        {
            title: "Waking up at 6 AM",
            desc: "Waking early in the monrning and going for a walk."
        },
        {
            title: "Breakfast",
            desc: "Healthy breakfasting till 9 AM"
        }
    ])

    function handleAddingTodo(){

        const newTodo = {
            title: title,
            desc: desc
        }
        setTodoList((prev)=>{
            return [...prev, newTodo]}
        )
        console.log("todo added",todoList)
        setTitle("")
        setDesc("")

    }

    function handleEditButton(index) {
        setEditingTodo(index)
        setShowModal(true)
    }

    function handleClose(){
        setShowModal(false)
    }

    function handleDeleteButton(index) {
        console.log("deleting item", index)
        const updatedArray = [...todoList]
        updatedArray.splice(index,1)
        setTodoList(updatedArray)
        
    }

    function handleEditEffect(){
        console.log(editingTodo)
        const updatedArray = [...todoList]
        updatedArray.splice(editingTodo, 1)
        updatedArray.splice(editingTodo, 0, {title: newTaskTitle, desc: newTaskDesc})
        setTodoList(updatedArray)
    }

    useEffect(()=>{
        console.log(todoList)
    },[todoList])
    return(
        <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
            <h1 style={{textAlign:"center", fontFamily:"cursive", color:"red"}}>Simple Todo Application</h1>
            <br></br>
            <div style={{display:"flex", flexDirection:"row",gap:"5%", alignItems:"flex-end", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column", gap:"35px"}}>
                    <Input
                        label="Enter title"
                        name="title"
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        state="initial"
                    />
                    <Input
                        label="Enter Description"
                        name="desc"
                        value={desc}
                        onChange={(e)=>{setDesc(e.target.value)}}
                        validation={require=true}
                        state="initial"
                    />
                </div>
                <div>
                    <Button text="Add your todo task" theme="secondary" size="large" onClick={handleAddingTodo}/>
                </div>
                
            </div>
            
            {todoList.map((item,index)=>(
                <div key={index} style={{width:"500"}}>
                    <Card style={{padding:"1.5%"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <div style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                                <Button text="Edit text" theme="colored" color="green" onClick={()=>{handleEditButton(index)}}/>
                                    <Edit 
                                        isVisible={showModal} 
                                        onClose={handleClose} 
                                        saveEdit={handleEditEffect}
                                        
                                    />
                                <Button text="Delete" theme="colored" color="red" size="xl"
                                    onClick={()=>{
                                        handleDeleteButton(index)
                                    }}
                                />  
                            </div>       
                        </div>
                                           
                    </Card>  
                                     
                </div>
            ))}
        </div>
    )
}