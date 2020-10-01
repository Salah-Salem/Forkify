import axios from 'axios';
import { key , proxy } from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }
    
    async getRecipes(){

        try {
            const res = await axios(`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}`);
            this.recipes = res.data.results;
            console.log(this.recipes);
        } catch (error){
            alert(error);
        }
    }
}