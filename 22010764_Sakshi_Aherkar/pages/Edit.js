import { useState } from "react";
import { Input, Maximize, Modal } from "web3uikit";

export var newTaskTitle
export var newTaskDesc
export function Edit({isVisible, onClose, saveEdit}){

    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")

    function handleOkButton(){
        newTaskTitle = newTitle
        newTaskDesc = newDesc
        saveEdit()
        setNewTitle("")
        setNewDesc("")              
        onClose()
    }

    function handleCancel(){
        setNewTitle("")
        setNewDesc("")
    }

    return(
        <div>
            <Modal
                isVisible={isVisible}
                onCancel={handleCancel}
                cancelText="Discard Changes"
                onCloseButtonPressed={onClose}
                onOk={handleOkButton}
                okButtonColor="green"
                okText="Save Changes"
                title={`Edit Todo`}

            >

                <div style={{display:"flex", flexDirection:"column", gap:"50px", marginBottom:"30px"}}>
                    <Input label="Enter Title" value={newTitle} validation={{required:true}} onChange={(e)=>setNewTitle(e.target.value)}/>
                    <Input label="Enter description" value={newDesc} type="text" validation={{required:true}} onChange={(e)=>setNewDesc(e.target.value)}/>
                </div>

            </Modal>
        </div>
    )
}

