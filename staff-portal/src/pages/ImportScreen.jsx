import React, { useState } from "react";


export default function ImportScreen(){

    const [files,setFiles] = useState([]);

    function handleChange(event){
        let updatedFileList = files;
        updatedFileList.append(event.target.files);
        setFiles();
        readCSVFile(file);
    }
    function readCSVFile(file){

        var reader =new FileReader();
        reader.readAsText(file);

        let headers;

        reader.onload = (event)=>{
            let csvData = event.target.result;
            let headerRow = csvData.split('\n')[0];
            headers = headerRow.split(/(,|;)/gm);
        }
    }

    return( 
    <>
        <form>
            <input type="file" accept=".csv" onChange=""/>
            <br/>
            
        </form>
    <p>hi</p>
    </>
    );
}