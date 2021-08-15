import React from 'react'

function max_min( props ){
    return (
        <div className="max_min">
            <div className="max_min_comp"> 
                <h1> Max: </h1>
                <div className="temp"> {props.max} °C </div>
            </div>
            <div className="max_min_comp">
                <h1> Min: </h1>
                <div className="temp"> {props.min} °C </div>
            </div>
        </div>
    )
}

export default max_min;