// import { Radio, RadioGroup } from "@mui/material";
import styles from "./styles.module.scss";
import TextField from "../../Inputs/TextField";


// const options = [
//                 {name: "Album"},
//                 {name: "Playlist"}
//             ];

const Company = ({
    cdata,
    schema,
    errors,
    handleInputState,
    handleErrorState,
    ...rest}) => {
    return (
        <div className={styles.albplt_container}>
            {/* {"Select Genre: "} */}
            <TextField
                name="company"
                label="Enter Company Name"
                handleInputState={handleInputState}
                handleErrorState={handleErrorState}
                schema={schema}
                error={errors}
                value={cdata}
                required={true}
                {...rest}
            />
            {/* <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="AlbPlt"
                row
            >
                {options.map((option, index) => (
                    <ul key={index}>
                        <Radio
                            name="AlbPlt"
                            // value={SongGenre[index].name}
                            label={option.name}
                            checked = {option.name === cdata}
                            onChange={(e) => {handleInputState("isPlaylist", option.name)}}
                            className = "styles.Radio"
                        />
                        {option.name}
                    </ul>
                ))}
            </RadioGroup> */}
        </div>
    )
}


export default Company;