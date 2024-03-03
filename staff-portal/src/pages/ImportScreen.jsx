import React, { useState } from "react";


export default function ImportScreen(){

    const [file,setFiles] = useState();

    function handleChange(event){
        setFiles(event.target.files[0]);
        readCSVFile(file);
    }
    function readCSVFile(file){

        var reader =new FileReader();
        reader.readAsText(file);
    }

    return( 
    <>
        <form>
            <input type="file" accept=".csv" onChange=""/>
            <br/>
            <input type="submit" disabled value="Submit"/>
        </form>
    <p>hi</p>
    </>
    );
}