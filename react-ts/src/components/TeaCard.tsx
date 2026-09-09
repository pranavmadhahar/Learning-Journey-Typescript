
interface TeaCardProp {
    name: string;
    price: number;
    isSpecial?: boolean
}


export function TeaCard(props){
    let {name, price, isSpecial}: TeaCardProp = props

    isSpecial = price > 40


    return(
        <article>
            <h2>
                {name}{isSpecial && <span>★</span>}
            </h2>
            <p>{price}</p>
        </article>
    )

}

