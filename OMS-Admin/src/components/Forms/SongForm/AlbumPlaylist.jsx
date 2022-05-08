import { Radio, RadioGroup } from "@mui/material";
import styles from "./styles.module.scss";

const options = [{name: "Album"}, {name: "Playlist"}];

const AlbPlt = ({sdata, handleInputState}) => {
    return (
        <div className={styles.albplt_container}>
            {"Song Is In: "}
            <RadioGroup
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
                            checked = {option.name === sdata}
                            onChange={(e) => {handleInputState("isPlaylist", option.name)}}
                            className = "styles.Radio"
                        />
                        {option.name}
                    </ul>
                ))}
            </RadioGroup>
        </div>
    )
}


export default AlbPlt;