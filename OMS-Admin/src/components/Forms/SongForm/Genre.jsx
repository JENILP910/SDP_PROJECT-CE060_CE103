import { Radio, RadioGroup } from "@mui/material";
import styles from "./styles.module.scss";
// import CustRadio from "../../Inputs/Radio";

const SongGenre = [
                    {name:"Country"}, 
                    {name:"Dance music"}, 
                    {name:"Hip-hop"}, 
                    {name:"Jazz"},
                    {name:"Pop"},
                    {name:"Punk"}, 
                    {name:"Rock"}, 
                    {name:"R&B"}, 
                ];

// const temp = [{ option: "hello"}];

const Genre = ({sGenre, handleInputState}) => {
    // console.log(sGenre);
    return (
        <div className={styles.genre_container}>
            {"Select Genre: "}
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="female"
                name="Genre"
                row
            >
                {SongGenre.map((genre, index) => (
                    <ul key={index}>
                        <Radio
                            // key={index}
                            name="Genre"
                            // value={SongGenre[index].name}
                            label={genre.name}
                            checked = {genre.name.toLocaleLowerCase() === sGenre }
                            onChange={(e) => {handleInputState("genre", genre.name.toLocaleLowerCase())}}
                        />
                        {genre.name}
                    </ul>
                ))}
            </RadioGroup>
            {/* <CustRadio
                name="Genre"
                label="Select Genre: "
                handleInputState={handleInputState}
                options={temp}
            /> */}
        </div>
    )
}

export default Genre;