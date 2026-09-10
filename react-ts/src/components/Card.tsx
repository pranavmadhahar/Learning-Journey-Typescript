import type { PropsWithChildren, ReactNode } from "react"

// PropsWithChildren adds the children prop to the props type
// ReactNode allows anything React can render (text, elements, fragments, etc.)
interface CardProps extends PropsWithChildren {
    title : string;
    footer? : ReactNode
}


export function Card({title, children, footer} : CardProps) {
  return (

    <section>
        <h2>{title}</h2>
        <div>{children}</div>
        { footer && <footer>{footer}</footer> }
    </section>
   
  )
}
