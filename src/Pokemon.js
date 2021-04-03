import React, {useEffect, useState} from "react";
import {Typography, Link, CircularProgress, Button, Card, CardContent, CardHeader, CardMedia, Avatar, Divider, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

//const Pokemon = ({match, params, pokemonId}) => {}
const useStyles = makeStyles({
    Title : {
       textTransform : "capitalize",
       textAlign: "center",
       fontFamily: "Verdana, sans-serif",
    },
    root : {
        minWidth : 275,
        maxWidth : 500,
        margin : "auto",
        marginTop: "50px",
    },
    header : {
        backgroundColor : "Beige",
    },
    image : {
        display: "block",
        paddingTop: '1%',

        marginLeft: "auto",
        marginRight: "auto",
        width : "50%",
    },
    imageArea : {
        backgroundColor : "Beige",
    },
    pkmnNumber : {
        textAlign: "center",
        color: "Grey",
    },
    subtitle : {
        textAlign: "center",
        paddingTop : "10px",
    },
    dataCard : {
        marginTop : "20px",
        
    },
    charac : {
        margin : "auto",
        marginTop : "20 px",
        textDecorationLine : "underline",
        fontWeight: "bold",
        fontSize : "20px",
        textAlign: "center",
    },
    characNb : {
        fontWeight: "bold",
        textAlign: "center",
        marginTop : "0px",

    },
    characGrid : {
        height : "50%",
    },
    CardContent :{
        textTransform : "capitalize",
        textAlign : "center",
    },
    Button : {
        width : "200px",
        margin : "auto",
        marginTop : "10px",
    }

});

function getTypeColor(name) {
    switch (name)
    {
        case "normal" :
            return "AntiqueWhite";
        case "fire" :
            return "DarkOrange";
        case "water" :
            return "DeepSkyBlue";
        case "grass" :
            return "ForestGreen";
        case "electric" :
            return "Gold";
        case "ice" :
            return "LightCyan";
        case "fighting" :
            return "LightCoral";
        case "poison" :
            return "MediumOrchid";
        case "ground" :
            return "Moccasin";
        case "flying" :
            return "Plum";
        case "psychic" :
            return "PaleVioletRed";
        case "bug" :
            return "GreenYellow";
        case "rock" :
            return "Khaki";
        case "ghost" :
            return "Indigo"
        case "dark" :
            return "GoldenRod";
        case "dragon" :
            return "RebeccaPurple";
        case "steel" :
            return "Gainsboro";
        case "fairy" :
            return "HotPink";
        default :
            return "AntiqueWhite";

    }
}

const Pokemon = props => {
    console.log("test ", props);
    const {match, history} = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);
    const classe = useStyles();

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(function(response) {
            const {data} = response;
            setPokemon(data);
        })
        .catch(function (error) {
            setPokemon(false);
        });
    }, [pokemonId]);
    
    
    

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;

        return (
            <>
            <Card className={classe.root}>
                <div className = {classe.imageArea}>
                    <img src= {fullImageUrl} className={classe.image}/>
                </div>
                <Divider/>
                <CardContent>
                    <Typography className = {classe.pkmnNumber}>{`# ${id.toString().padStart(3,"0")}`}</Typography>
                    <Typography className = {classe.Title} variant = "h4">{name}</Typography>
                    <Typography variant = "h6" className = {classe.subtitle}>Pokemon Info</Typography>
                    <br />
                    <Grid container spacing={3}
                    justify = "space-evenly">
                        <Grid item xs= {6}>
                            <Typography className = {classe.charac}> Height</Typography>
                        </Grid>
                        <Grid item xs= {6} className = {classe.characGrid}>
                            <Typography className = {classe.charac}>Weight </Typography>
                        </Grid>
                        <Grid item xs= {6}>
                            <Typography className = {classe.characNb}> {height / 10} m </Typography>
                        </Grid>
                        <Grid item xs= {6}>
                            <Typography className = {classe.characNb}> {weight/10} kg </Typography>
                        </Grid>
                    </Grid>
                        
                    <Typography variant = "h6">Types :</Typography>
                    <Grid container spacing = {4}>
                
                        {types.map((typeInfo) => {
                            const { type } = typeInfo;
                            const {name} = type;
                            return (
                            <>
                            <Grid item xs = {6}>
                                <Card className = {classe.dataCard} style = {{backgroundColor : getTypeColor(name)}}>
                                    <CardContent className = {classe.CardContent}>
                                        <Typography key = {name} variant = "h6"> {`${name}`}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            </>);
                        })}
                    </Grid>
                </CardContent>
            </Card>
            </>
        )
    }
    return <>
    {pokemon === undefined && <CircularProgress/>}
    {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
    {pokemon === false && <Typography>Pokemon not found</Typography>}
    {pokemon !== undefined && (
        <div className = {classe.Button}><Button variant = "contained" onClick={() => history.push("/")}>Back to Pokedex</Button></div>
    )}
    </>;
    };

export default Pokemon;



