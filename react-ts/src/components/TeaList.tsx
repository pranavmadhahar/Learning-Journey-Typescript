import React from 'react'
import type { Tea } from '../types'
import { TeaCard } from './TeaCard'


interface TeaListProps {
    items: Tea[]; // Array of Tea objects

}

export function TeaList({items}: TeaListProps) {
  return (
    <div>
        {items.map((tea) => (
            <TeaCard 
            key = {tea.id} // React requires a unique key when rendering lists
            name = {tea.name}
            price = {tea.price}
            />
        )
    
    )}

        
    </div>
      
    
  )
}