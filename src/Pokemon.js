import React, {useEffect, useState} from "react";
import {Typography, Link, CircularProgress, Button, Card, CardContent, CardHeader, CardMedia, Avatar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

//const Pokemon = ({match, params, pokemonId}) => {}
const useStyles = makeStyles({
    Title : {
       textTransform : "capitalize",
    },
});

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
            <Card>
                <CardHeader  
                variant = "h1" 
                style = {{textTransform : "capitalize"}}
                title = {`${id}. ${name}`}
                avatar = {<Avatar alt= "sprite" src={front_default}/>}/>
                <CardContent>
                    {/*<Typography variant = "h1" style = {{textTransform : "capitalize"}}>
                        {`${id}. ${name}`}
                        <img src = {front_default}/>
                    </Typography>
                    <img src = {fullImageUrl} style = {{width : "300px", height : "300px"}}/>
                    <Typography variant = "h3">Pokemon Info</Typography>
                    <Typography>
                        {"Species : "}
                        <Link href={species.url}>{species.name}</Link>
                    </Typography>
                    <Typography>Height : {height} </Typography>
                    <Typography>Weight : {weight} </Typography>
                    <Typography variant = "h6">Types :</Typography>
                
                    {types.map((typeInfo) => {
                        const { type } = typeInfo;
                        const {name} = type;
                        return <Typography key = {name}> {`${name}`}</Typography>;
                    })}*/}
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
        <Button variant = "contained" onClick={() => history.push("/")}>Back to Pokedex</Button>
    )}
    </>;
    };

export default Pokemon;



