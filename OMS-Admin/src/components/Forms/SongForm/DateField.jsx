// import { useState } from "react";
import { useState, useEffect } from "react";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";

import styles from "./styles.module.scss";

const months = [
                { name: "January", value: "01" },
                { name: "February", value: "02" },
                { name: "March", value: "03" },
                { name: "Apirl", value: "04" },
                { name: "May", value: "05" },
                { name: "June", value: "06" },
                { name: "July", value: "07" },
                { name: "Augest", value: "08" },
                { name: "September", value: "09" },
                { name: "October", value: "10" },
                { name: "November", value: "11" },
                { name: "December", value: "12" },
            ];

const DateField = ({data, handleInputState}) => {
    const [ SDate, setDate ] = useState({
        date: data[0],
        month: data[1],
        year: data[2],
        // date: data.date[0],
        // month: data.date[1],
        // year: data.date[2],
    });
	const [errors, setErrors] = useState({ date: "", year: "" });
    
        const schema = {
            date: Joi.string().required().label("Date"),
            month: Joi.string().required().label("Month"),
            year: Joi.string().required().label("Year"),
        };
    
    const handleIpStat = (name, value) => {
        // console.log("-> " + name, value);
        setDate((prev) => ({ ...prev, [name]: value }));
        console.log(SDate);
        handleInputState("date", [SDate.date, SDate.month, SDate.year]);
    }

    const handleIpErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};
    
    useEffect(() => {
        // if(data != null){
        // if( data[0] !== "" && data[2] !== ""){
        //     setDate({date: data[0], month: data[1], year: data[2]});
            // console.log("- ", SDate);
        // }
        // console.log(SDate);
        // console.log(data);
    }, [data]);
    
    return(
        <div className={styles.date_of_birth}>
            <div className={styles.date}>
                <TextField
                    name="date"
                    placeholder="DD"
                    label="Date"
                    schema={schema.date}
                    value={SDate.date}
                    handleInputState={handleIpStat}
                    handleErrorState={handleIpErrorState}
                    error={errors.date}
                    required={true}
                    maxLength={2}
                    // type="Number"
                    // min="1" max="31"
                />
            </div>
            <div className={styles.month}>
                <Select
                    name="month"
                    handleInputState={handleIpStat}
                    label="Month"
                    placeholder="Months"
                    options={months}
                    value={SDate.month}
                    // svalue={"01"}
                    required={true}
                />
            </div>
            <div className={styles.year}>
                <TextField
                    name="year"
                    placeholder="YYYY"
                    label="Year"
                    schema={schema.year}
                    value={SDate.year}
                    handleInputState={handleIpStat}
                    handleErrorState={handleIpErrorState}
                    error={errors.year}
                    required={true}
                    // maxLength={4}
                    // type="Number"
                    // min="1" max={new Date().getFullYear()}
                />
            </div>
    </div>
    )
}

export default DateField;