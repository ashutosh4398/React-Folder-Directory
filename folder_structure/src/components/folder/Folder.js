import { useState, useRef } from "react";
import Form from "../form/Form";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import "./Folder.css";

const Folder = (
    {name="", data="", children=[], path="", addChild}
    ) => {
    
    const [showForm, setShowForm] = useState(false);
    const folderBodyElem = useRef("");
    const folderOpenElemICon = useRef("");
    const folderCloseElemIcon = useRef("");
    

    const showBodyOrRenderForm = () => {
        if(
            !showForm && ((children && children.length === 0) || !children)
        ) {
            setShowForm(true);
        }
        if(showForm) {
            return <Form type="BODY" data={data} path={path} addChild={addChild}/>
        } else {
            return children;
        }
    }

    const addChildHandler = () => {
        setShowForm(false)
        addChild("", path, false);
    }

    const toggleCollapse = () => {
        folderBodyElem.current.classList.toggle("hide");
        folderCloseElemIcon.current.classList.toggle("hide");
        folderOpenElemICon.current.classList.toggle("hide");
    }


    return (
        <div className="folder">
            <div className="folder__header">
                <Form 
                    type="HEADER" path={path} 
                    addChild={addChild} nodeName={name}
                    toggleCollapse={toggleCollapse}
                >   
                    
                    <button type="button" ref={folderCloseElemIcon} className="icon-btn hide" onClick={toggleCollapse} ><FaAngleRight/></button>
                    <button className="icon-btn" ref={folderOpenElemICon} type="button" onClick={toggleCollapse}><FaAngleDown/></button>
                
                    
                </Form>
                <button onClick={addChildHandler}>Add Child</button>
            </div>
            <div ref={folderBodyElem} className="folder__body">
                {showBodyOrRenderForm()}
            </div>

        </div>
    )
};

export default Folder;