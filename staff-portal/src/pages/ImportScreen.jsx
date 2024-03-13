import React, { useReducer, useRef, useState } from "react";
import FeatherX_SVG from "../assets/icons/x.svg";

// function filesReducer (files,action){
//     switch ( action.type){
//         case 'ADD':{
//             return action.files;
//         }
//         case 'DELETE':{

//         }
//         default: {
//             throw Error('Unknown action: ' + action.type);
//           }
//     }

// }

export default function ImportScreen(){

    const [files,setFiles] = useState([]);

    // const [files,dispatch] = useReducer(filesReducer,[]);

    const nextID = useRef(0);
    let fileRows = null;

    function onAddFiles(event){
        const inputFiles = Array.from(event.target.files)
        .map((file)=>(
            {
                value:file,
                uid:nextID.current++
            }));
      /**
       * { 
       * file: File,
       * id: number
       * }
       */
        const updatedFileList = [...files,inputFiles];

        // dispatch({
        //     type: 'ADD',
        //     files: updatedFileList
        // })

        // setFiles(updateFileRows(updatedFileList));
         setFiles(updatedFileList);
        console.log(files);
        
    }

    function updateFileRows(files){


        fileRows = files.map((item)=>(
        <ImportItem key={toString(item.uid)} file={item.value} itemID={item.uid} 
        handleRemoveFile={onDeleteFile}/>));

        return files;
    }

    function onDeleteFile(uid){
        const updatedFileList = [...files];
        const indexToRemove = updatedFileList.findIndex((item)=>item.uid == uid);
        if (indexToRemove > -1)
            updatedFileList.splice(indexToRemove,1);
        setFiles(updatedFileList);

    }



    return( 
    <>
        <form>
            <input type="file" accept=".csv" onChange={e=> onAddFiles(e)}/>
            <br/>
            
        </form>
    <p>hi</p>
    <table>
        <thead>
            <tr>
                <td>File name</td>
                <td>File type</td>
                <td></td>
            </tr>
        </thead>
        <tbody><ImportList fileList={files} handleRemoveFile={onDeleteFile}/></tbody>
        </table>
    </>
    );
}

function ImportList ({fileList,handleRemoveFile}){
 return  fileList.map((item)=>(
    <ImportItem key={toString(item.uid)} file={item.value} itemID={item.uid} 
    handleRemoveFile={handleRemoveFile}/>));
}

function ImportItem ({file,itemID,handleRemoveFile}){

    const fileHeaders = {
        "customer":["First Name"," Last Name"," Address"," Age" ],
        "contract":["Customer ID", "Apartment ID", "Start Date", "End Date"],
        "apartment":["Address", "Number of room","Retail price"]
        };

    

    const defaultFileType = "customer"; // default = customer
    // const headers = getCSVHeaders(file.value);
    

    const [sendEnabled,setSendEnabled] = React.useState(false);
    const [selectedFileType,setSelectedFileType] = useState(defaultFileType);

    function handleChange_FileType(value){
        setSelectedFileType(value);
        // let isEnabled = JSON.stringify(headers) == JSON.stringify(fileHeaders[selectedFileType]);
        // setSendEnabled(isEnabled);
    }


    return (
        <tr>
            <td className="td-filename">{file.name}</td>
            <td>
                <select name="select-filename" 
                defaultValue={defaultFileType} 
                onChange={e => handleChange_FileType(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="contract">Contract</option>
                    <option value="apartment">apartment</option>
                </select>
            </td>
            <td>
                <button disabled={!sendEnabled}>Send</button>
                <button onClick={() => handleRemoveFile(itemID)}>
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