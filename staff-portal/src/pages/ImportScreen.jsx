import { SelectClickTypes } from "@table-library/react-table-library/types/select";
import React, { useRef, useState } from "react";
import FeatherX_SVG from "../assets/icons/x.svg";


export default function ImportScreen(){

    const [files,setFiles] = useState([]);
    const nextID = useRef(0);

    function handleChange(event){
        const inputFiles = event.target.files.map((file)=>({...file,key: nextID.current++}));
        const updatedFileList = files;
        updatedFileList.append(inputFiles);
        setFiles(updatedFileList);
    }

    function handleClick_BtnRemove(key){
        const updatedFileList = files;
        const indexToRemove = updatedFileList.findIndex((item)=>item.key == key);
        if (indexToRemove > -1)
            updatedFileList.splice(indexToRemove,1);
        setFiles(updatedFileList);
    }

    return( 
    <>
        <form>
            <input type="file" accept=".csv" onChange={e=> handleChange(e)}/>
            <br/>
            
        </form>
    <p>hi</p>
    <ImportTable files={files} handleRemoveFile={handleClick_BtnRemove}/>
    </>
    );
}

function ImportTable({files,handleRemoveFile}){

    const fileRows = files.map((file)=>(<ImportRow file={file} handleRemoveFile={handleRemoveFile}/>))

    return (
        <table>
        <thead>
            <td>File name</td>
            <td>File type</td>
            <td></td>
        </thead>
        <tbody>{fileRows}</tbody>
        </table>
    );

}

function ImportRow ({file,handleRemoveFile}){

    const fileHeaders = {
        "customer":["First Name"," Last Name"," Address"," Age" ],
        "contract":["Customer ID", "Apartment ID", "Start Date", "End Date"],
        "apartment":["Address", "Number of room","Retail price"]
        };

    const defaultFileType = "customer"; // default = customer
    const headers = getCSVHeaders(file);

    const [sendEnabled,setSendEnabled] = React.useState(false);
    const [selectedFileType,setSelectedFileType] = useState(defaultFileType);

    function handleChange_FileType(value){
        setSelectedFileType(value);
        let isEnabled = JSON.stringify(headers) == JSON.stringify(fileHeaders[selectedFileType]);
        setSendEnabled(isEnabled);
    }


    return (
        <tr id>
            <td className="td-filename">file.name</td>
            <td>
                <select name="select-filename" 
                defaultValue={defaultFileType} 
                value={selectedFileType}
                onChange={e => handleChange_FileType(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="contract">Contract</option>
                    <option value="apartment">apartment</option>
                </select>
            </td>
            <td>
                <button disabled={!sendEnabled}>Send</button>
                <button onClick={() => handleRemoveFile(file.key)}>
                    <img src={FeatherX_SVG} alt="Remove file"></img>
                </button>
            </td>
        </tr>
    );
}

function getCSVHeaders(file){

    let headers;

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event)=>{
        let csvData = event.target.result;
        let headerRow = csvData.split('\n')[0];
        headers = headerRow.split(/(,|;)/gm);
    }

    return headers;
}