import './App.css'
import { TeaCard} from './components/TeaCard'
import { Counter} from './components/Counter'
import type { Tea } from './types'
import { TeaList } from './components/TeaList'
import { OrderForm } from './components/OrderForm'
import { Card } from './components/Card'



const menu: Tea[] = [
  {id: 1, name: "Masala", price: 40},
  {id: 2, name: "Ginger", price: 50},
  {id: 3, name: "Lemon", price: 60}
]



function App() {
  return (
    <main>
      <div>
        <h1>This is React TS</h1>
        <TeaCard name="Jasmine Pearl" price={30} isSpecial={true} emoji="🍃" />
      </div>
      <div><Counter /></div>
      <div><TeaList items = {menu} /></div>
      <div><OrderForm onSubmit = { (order) => { console.log("Placed", order.name, order.cups) } } /></div>
      <div>
        <Card title="React with Typescript" 
      footer={<button>Order Now</button>}
      />
      </div>
    </main>
  )
}

export default App
