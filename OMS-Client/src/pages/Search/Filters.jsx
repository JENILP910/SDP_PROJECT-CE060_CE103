// import { Radio, RadioGroup } from "@mui/material";
import Button from "../../components/Button";
import styles from "./styles.module.scss";


const filters = [
                    {name:"BollyWood"},
                    // {name:"Genere"},
                    {name:"Year"},//Eras
                    {name:"Movie"},

                    {name:"Instrumental"},
                    {name:"Electronic & Dance"},
                    {name:"Classical"},
                    {name:"Party"},
                    
                    
                    {name:"Romance"},
                    {name:"Devotional"},
                    {name:"Wellness"},
                    {name:"Gaming"},
                    {name:"Anime"},

                    {name:"Country"},
                    // {name:"Dance music"},
                    {name:"Hip-hop"},
                    {name:"Jazz"},
                    {name:"Pop"},
                    {name:"Metal"},
                    {name:"Punk"}, 
                    {name:"Funk"},
                    {name:"Rock"},
                    {name:"R&B"},
                ];

// const temp = [{ option: "hello"}];


const SearchFilter = ({sFilter, handleInputState}) => {
    
    const handleOnlclick = (filter) => {
        // console.log("~called");
        // console.log(filter);

        handleInputState(filter);
        // console.log(filter.value);
        // console.log(data);
    };

    // console.log(sGenre);
    return (
        <div className={styles.filter_container}>
            {"Select Filter: "}
            
            {filters.map((filter, index) => (
                <ul key={index}>
                    {/* {console.log(filter + " - " + index)} */}
                    {/* {console.log(filters[index])} */}
                    <Button
                        label={filter.name}
                        onClick={() => handleOnlclick(filters[index].name)}
                        // handleclick={handleOnlclick(filter.name)}
                        // handleclick={handleOnlclick(filters[index])}
                    />

                </ul>
            ))}


        </div>
    )
}

export default SearchFilter;