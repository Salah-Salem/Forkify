import { elements } from './base';

export const getInput = () => elements.searchInput.value ;

export const clearInput = () =>{
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';  
};

const limitRecipeTitle = (title , limit = 17) => {
    if(title.length > limit){
        const newTitle = [];
        title.split(' ').reduce((acc , cur ) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        } ,0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const basePath = 'https://spoonacular.com/recipeImages/';
    const html_Li = `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${basePath}${recipe.id}-90x90.jpg" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title , 15)}</h4>
                    <p class="results__servings">${recipe.servings} Persons </p>
                    <p class="results__prepareingTime">${recipe.readyInMinutes} Min</p>
                </div>
            </a>
        </li> `;

        elements.searchResList.insertAdjacentHTML("beforeend" , html_Li);
};

const createButton = (page , type) =>`
                <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                </button>
`;

const renderButton = (page , numResults , resPerPage ) => {
    const pages = Math.ceil(numResults / resPerPage) ;
    let button ;
    if (page === 1){
        // only button to go to next
        button = createButton(page , 'next');
    }else if (page < pages ){
        // both buttons
        button = `
            ${createButton(page , 'next')}
            ${createButton(page , 'prev')}
        `;
    }
    else if (page === pages && pages > 1) {
        // only button to go to prev
        button = createButton(page , 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin' , button);
};

export const renderResults = (recipes , page = 1 , resPerPage = 5) => {
    //render results of current page 
    const start =(page - 1) * resPerPage ;
    const end = page * resPerPage ;    
    recipes.slice(start , end).forEach (renderRecipe);

    //render pagination buttons 
    renderButton(page , recipes.length , resPerPage);
};