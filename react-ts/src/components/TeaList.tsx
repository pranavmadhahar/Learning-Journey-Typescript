import React from 'react'
import type { Tea } from '../types'
import { TeaCard } from './TeaCard'


interface TeaListProps {
    items: Tea[];

}

export function TeaList({items}: TeaListProps) {
  return (
    <div>
        {items.map((tea) => (
            <TeaCard 
            key = {tea.id}
            name = {tea.name}
            price = {tea.price}
            />
        )
    
    )}

        
    </div>
      
    
  )
}
