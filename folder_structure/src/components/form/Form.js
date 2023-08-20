import { useState, useEffect } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import "./Form.css";

const Form = ({type="BODY", data: textData="", nodeName,  addChild, path, children}) => {

    const [formText, setFormText] = useState("");

    const onSubmit = (e, edit_data, edit_header) => {
        e.preventDefault();
        addChild(formText, path, edit_data, edit_header);
    }

    const onInputElemChange = (e) => {
        addChild(e.target.value, path, true, false)
    }
    
    const bodyForm = () => {
        return (
            <div className="folder__body">
                <form  onSubmit={e => e.preventDefault()}>
                    <label htmlFor="data">Data</label>
                    <
                        input type="text" 
                        autoComplete="off"
                        name="data" id="data" value={textData}
                        onChange={e => onInputElemChange(e)}
                    />
                </form>
            </div>
        )
    };

    const headerForm = () => {
        return (
            
                <form className="folder-header-form" onSubmit={e => onSubmit(e, false, true)}>
                    {children}
                    <
                        input type="text" name="headerNAme" id="headerNAme" value={formText || nodeName}
                        onChange={e => setFormText(e.target.value)}
                    />
                </form>
            
        )
    }

    return (
        <>
            {type === "BODY" && bodyForm()}
            {type === "HEADER" && headerForm()}
        </>
    )

};

export default Form;