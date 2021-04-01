import react, {useEffect, useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography, TextField} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles, fade} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles( theme => ({
    pokedexContainer : {
        paddingTop : '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia :{
        margin : "auto",
    },
    CardContent :{
        textTransform : "lowercase",
        textTransform : "capitalize",
        textAlign : "center",
    },
    searchContainer : {
        display : "flex",
        backgroundColor : fade(theme.palette.common.white, 0.15),

    },
    searchIcon :{
        alignSelf : "flex-end",
        marginBottom : "5px",

    },
    textField :  {
        width : "200px",
        margin : "5px",
    },
}));



const Pokedex = (props) => {
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    } 

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=807")
            .then(function (response) {
                const { data } = response;
                const {results} = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id : index + 1,
                        name : pokemon.name,
                        sprite : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    };
                });
                axios
                    .get("https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon_species_names.csv")
                    .then (function (response) {
                        const {data} = response;
                        const {results} = data;
                        console.log("data " + data);
                    })
                setPokemonData(newPokemonData);
            });
    }, []);
   

    const getPokemonCard = (pokemonId) => {
        const {id, name, sprite} = pokemonData[pokemonId];

        return (
        <Grid item xs={12} sm = {4} key={pokemonId}>
            <Card onClick = {() => history.push(`${pokemonId}`)}>
                <CardMedia
                className={classes.cardMedia}
                image={sprite}
                style={{width: "130px", height: "130px"}}
                />
                <CardContent className={classes.CardContent}>
                    <Typography>{`${id}. ${name}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
        );
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className = {classes.searchContainer}>
                        <SearchIcon className ={classes.searchIcon}/>
                        <TextField
                        onChange = {handleSearchChange}
                        className = {classes.textField}
                        label = "Pokemon"
                        variant = "standard"
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
            <Grid container spacing= {5} className={classes.pokedexContainer}>
                {Object.keys(pokemonData).map((pokemonId) => 
                pokemonData[pokemonId].name.includes(filter) && 
                getPokemonCard(pokemonId))}
               
            </Grid>
            ) : (
                <CircularProgress/>
            )}
        </>
    );
};

export default Pokedex;