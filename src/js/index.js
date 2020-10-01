import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';
import { elements , renderLoader ,clearLoader } from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object 
 * - Shopping list object
 * - Liked recipes 
 * */ 
const state = {};
/* 
    SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // 1- get query from ui
    const query = searchView.getInput();
    // console.log(query);

    if (query) {
        // 2- new search object and add to state
        state.search = new Search(query);

        // 3- prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResLoader);

        // 4- search for recipes
        await state.search.getRecipes();

        // 5- render results on UI
        // console.log(state.search.recipes);
        clearLoader();
        searchView.renderResults(state.search.recipes);

    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click' , el => {
    const btn = el.target.closest('.btn-inline');
    if (btn){
        const goToPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResults(state.search.recipes,goToPage);
    }
});

/* 
    RECIPE CONTROLLER
*/
 const r = new Recipe(559251);
//  console.log('test')
 r.getRecipe();

