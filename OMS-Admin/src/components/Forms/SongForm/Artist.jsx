import { useState, useEffect } from "react";
import Joi from "joi";
import TextField from "../../Inputs/TextField";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";


const Artist = ({data, handleInputState}) => {
    const [adata, setaData] = useState({
        artist1: data.artist[0],
        artist2: data.artist[1],
        artist3: data.artist[2],
    });
    // const [adata, adispatch] = useReducer();
	const [errors, setErrors] = useState({ artist1: "", artist2: "", artist3: "" });
    const [ a0, setA0 ] = useState(1);
    const [ a1, setA1 ] = useState(false);
    const [ a2, setA2 ] = useState(false);

    const schema = {
        artist1: Joi.string().required().label("artist1"),
        artist2: Joi.string().label("artist2").allow(null).allow(''),
        artist3: Joi.string().label("artist3").allow(null).allow(''),
    };
    
	const handleErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};

    const handleInStat = (name, value) => {
        // console.log("called0");
        // console.log(name);
        // console.log(value);
        // let arr = [adata.artist1, adata.artist2, adata.artist3];
        let arr = [];
        switch (name) {
            case "artist1":
                arr.push(value + "")
                arr.push(adata.artist2)
                arr.push(adata.artist3)
                // arr[0] = value
                break;
            case "artist2":
                arr.push(adata.artist1)
                arr.push(value + "")
                arr.push(adata.artist3)
                // arr[1] = value
                break;
            case "artist3":
                arr.push(adata.artist1)
                arr.push(adata.artist2)
                arr.push(value + "")
                // arr[2] = value
                break;
            default:
                break;
        }
        setaData((prev) => ({ ...prev, [name]: value }));
        console.log(adata);
        handleInputState("artist", arr);
        // console.log(adata);
    };
    
    const inc = ((k, i, j) => {
        if(k < 3){
            setA0(a0 + 1);
            i ? setA2(true) : setA1(true);
        }
    })
    
    const dec = (() => {
        if(a1){
            if(a2)
                setA2(false);
            else
                setA1(false);
        }
        setA0(a0 - 1);
    })

    useEffect(() => {
        // console.log(data);
        if(data.artist[1] !== ""){
            setaData({artist1: data.artist[0], artist2: data.artist[1], artist3: data.artist[2]});
        }
    },[data])

    useEffect(() => {
        // console.log(data);
        if(data.artist[1] !== ""){
            setA0(2);
            setA1(true);
            if(data.artist[2] !== ""){
                setA0(3);
                setA2(true);
            }
        }
    },[data])
    
    return (
        <div className={styles.multi_artist}>
            <div className={styles.artista}>
                <TextField
                    name="artist1"
                    label="Artist Name1"
                    handleInputState={handleInStat}
                    required={true}
                    value={adata.artist1}
                    handleErrorState={handleErrorState}
                    schema={schema.artist1}
                    error={errors.artist1}
                    // focus={true}
                />
            </div>
            {a0 < 3 &&
                <IconButton className={styles.add_btn} onClick={() => { inc(a0, a1)}}>
                    <AddIcon />
                </IconButton>
            }

            {a1 &&
                <div className={styles.artista}>
                    <TextField
                        name="artist2"
                        label="Artist Name2"
                        handleInputState={handleInStat}
                        value={adata.artist2}
                        handleErrorState={handleErrorState}
                        schema={schema.artist2}
                        error={errors.artist2}
                        // focus={true}
                    />
                    {/* <IconButton className={styles.close_btn} onClick={() => {dec(setA1)}}>
                        <CloseIcon />
                    </IconButton> */}
                </div>
            }
            {a2 &&
                <div className={styles.artista}>
                <TextField
                    name="artist3"
                    label="Artist Name3"
                    handleInputState={handleInStat}
                    value={adata.artist3}
                    handleErrorState={handleErrorState}
                    schema={schema.artist3}
                    error={errors.artist3}
                    // focus={true}
                />
            </div>
            }
            { (a1 || a2) && 
                <div className={styles.btn_wrapper}>
                <IconButton className={styles.close_btn} onClick={() => {dec()}}>
                    <CloseIcon />
                </IconButton>
                </div>
            }
        </div>
    )
}
export default Artist;