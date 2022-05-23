import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent } from "react";


export const Rating = ({isEditable = false, rating, setRating, className, ...props}: RatingProps): JSX.Element => {

    //ratingArray, setRatinArray - Для того что бы здесь отображать звездочки, нам нуужно
    //Отображать JSX.Element[]  и нужно задать начально значение,
    //что бы быстро азполнить массив делаем new Array и сразу этот массив заполянем fill фрагментом
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    //Для того чтобы бы посмотреть как отображается наш constructRating
    //мы используем хук useEffect
    //В хуке, мы должны подписаться на изменение нашего rating и в случае изменения,
    //выполнять useEffect
    useEffect(() => {
        constructRating(rating);
    }, [rating]);


    //ЧТо бы стейт выше мы смогли заполнить, нам нужно сделать функцию constructRating
    //которая будет принимать некторые значения рейтинга(currentRating: number)
    //мы не используем rating, потому что currentRating может использоваться при hover
    //updatedArray мы будем передавать в state выше
    //r - это наш элемент
    //i - index
    //Далее мы делаем return нашей иконки со стилями
    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                //События мы переносим все на спан, кроме табуляции
                <span
                className={cn(styles.star, {
                    [styles.filled]: i < currentRating,
                    [styles.editable]: isEditable,
                })}
                //Мы должны менять отображение, по этому когда у нас событие по наведению мыш
                //мы должны сделать функцию  changeDisplay, изменение отображение
                //i+1 потому что эелементы начинаются с 0
                //для того что бы все было окей и когда мы уберем мышь
                //то мы дожны вернуться к первоначальному состоянию onMouseLeave вернем rating
                onMouseEnter={() => changeDisplay(i + 1)}
                onMouseLeave={() => changeDisplay(rating)}

                //Если мы кликаем, то мы должны изменить сам рейтинг
                onClick={() => onClick(i + 1)} >
                    <StarIcon 
                    

                //Чтобы все работало по таб
                tabIndex={isEditable ? 0 : -1}
                
                //событие которое отвечает за нажатие на пробел onKeyDown
                //KeyboardEvent его мы должны брать из react
                onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
                />
                </span>
            );
        });
    //После того, как мы построили этот массив, нам нужно его обновить
        setRatingArray(updatedArray);
    };
    //Она меняет отображение, функциня принимает рейтинг и должна поменять нам рейтинг
    //если наш компонент не редактируемый,то мы делаем условие
    const changeDisplay = (i: number) => {
        if(!isEditable) {
            return;
        }
        constructRating(i);
    };

    //Мы должны установить setRating, так как это отвечает за состояние
    const onClick = (i: number) => {
        if(!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    //Мы должны сделать проверку, если у нас не пробел, то просто ретёерн
    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if(e.code != 'Space' || !setRating) {
            return;
        }
        setRating(i);
    };


    //Для того, что бы нам сделал map по компоненту, мы должны задать ему
    //r и i, что бы i(индекс) работал корректно, мы добавляем span
    return (
        <div {...props}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>) )}
        </div>
    );
};