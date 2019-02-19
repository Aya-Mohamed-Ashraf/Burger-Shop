import React from 'react';
import cssClasses from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const ingredientsInArray = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredientsInArray.length !== 0 ? ingredientsInArray
                : <p>please start add some ingredients!</p>}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;