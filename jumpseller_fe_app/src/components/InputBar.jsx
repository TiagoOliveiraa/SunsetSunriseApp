import React, { useState } from "react";
import '../index.css'

function InputBar(props){

    const [inputInfo,setInputInfo] = useState({
        location: "",
        dateStart: getCurrentDate(),
        dateEnd: getCurrentDate()
    })

    function capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }

    function handleClick(){
        if (!checkIfEndAfterStart(inputInfo.dateStart,inputInfo.dateEnd)){
            const updatedValue = {
                location: capitalizeFirstLetter(inputInfo.location),
                dateStart: inputInfo.dateStart,
                dateEnd: inputInfo.dateStart
            }
            if(updatedValue.location !== ""){
                props.clicked(updatedValue)
            }
        }
        else{
            if(inputInfo.location !== ""){ 
                const updatedValue = {
                    location: capitalizeFirstLetter(inputInfo.location),
                    dateStart: inputInfo.dateStart,
                    dateEnd: inputInfo.dateEnd
                }
                props.clicked(updatedValue)
            }
        }
        setInputInfo(prevValue => {
            return {
            ...prevValue,
            location: ""
            }
        })
        
    }

    function handleChange(event){
        let {name, value} = event.target;
        if(name === "dateEnd"){
            if(!checkIfEndAfterStart(inputInfo.dateStart,value)){
                value = inputInfo.dateStart;
                setInputInfo(prevValue => {
                    return {
                    ...prevValue,
                    [name]: value,
                }
            });
            }
        }
        if(name === "dateStart"){
            if(!checkIfEndAfterStart(value,inputInfo.dateEnd)){
                setInputInfo(prevValue => {
                    return {
                    ...prevValue,
                    [name]: value,
                    dateEnd: value
                }
            });
            }
            else{
                setInputInfo(prevValue => {
                    return {
                    ...prevValue,
                    [name]: value,
                }
                })
            }
        }
        else{
            setInputInfo(prevValue => {
                return {
                ...prevValue,
                [name]: value,
            }
            })
        }
    }


    return <div className="input-container">
        <input
        name="location"
        type="text"
        placeholder="Enter a location"
        value={inputInfo.location}
        onChange={handleChange}
        />
        <div className="date-container">
        <input
        name="dateStart"
        type="date"
        value={inputInfo.dateStart}
        onChange={handleChange}
        />
        <input
        name="dateEnd"
        type="date"
        value={inputInfo.dateEnd}
        onChange={handleChange}
        />
        </div>
        <button onClick={handleClick}>Search</button>
    </div>
}

function getCurrentDate(){
    const date = new Date();
    return date.toLocaleDateString('en-CA');
}

function checkIfEndAfterStart(currentDateStart,newEndDate){
    const dateStart = new Date(currentDateStart)
    const dateEnd = new Date(newEndDate)
    
    return dateStart <= dateEnd
}

export default InputBar