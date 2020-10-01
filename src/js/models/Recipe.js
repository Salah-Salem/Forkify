import axios from 'axios';
import { key , proxy } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(id){
        try {
            // const res =await axios(`https://api.spoonacular.com/recipes?apiKey=${key}&${id}?information`);
            const res = await axios (`https://restcountries.eu/rest/v2/all`);
            console.log(res);
        }catch{(error) => {
            console.log(error)
            }
        }
    }
}

//https://api.spoonacular.com/recipes/{id}/information