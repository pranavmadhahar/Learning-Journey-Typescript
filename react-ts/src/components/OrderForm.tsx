import { useState } from "react"

interface OrderFormProps {
    // Callback prop: receives an order object and returns nothing
    onSubmit(order: {name: string; cups: number}): void
}

export function OrderForm({onSubmit} : OrderFormProps) {

    // Explicit types are optional here because TypeScript can infer them
    const [name, setName] = useState<string>("Masala");
    const [cups, setCups] = useState<number>(1);

    // React event type for form submission
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        onSubmit({ name, cups })

    }
    
  return (
    <form onSubmit = { handleSubmit }>
        <label>Tea Name</label>
        <input
        value={name}
        // ChangeEvent<HTMLInputElement> types the input's change event
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => 
            setName(e.target.value)
        }
        
        />

        <label>Cups</label>
        <input
        type="number"
        value={cups}
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => 
            setCups(Number(e.target.value) || 0 )
        }
        
        />
        
        <button type="submit">Place Order</button>
    </form>
  
  )
}

