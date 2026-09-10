interface TeaCardProp {
    name: string;
    price: number;
    isSpecial?: boolean
}


// props is explicitly typed as TeaCardProp
export function TeaCard(props: TeaCardProp){
    let {name, price, isSpecial} = props

    // Override the optional prop based on price
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

