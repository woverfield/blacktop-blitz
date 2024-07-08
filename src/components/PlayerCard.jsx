import React from 'react'

export default function PlayerCard({player, finalized}) {
  return (
    <div className={finalized === true ? 'finalized player-card flex flex-col h-72 w-44 justify-between' : 'player-card flex flex-col h-72 w-44 justify-between'} style={player.img ? {backgroundImage: `url(${player.img})`} : null}>
        <header className='p-header'>
            <p className='text-xl font-bold'>{player.overall}</p>
        </header>
        <footer className='p-footer'>
            <p className='text-lg font-bold'>{player.name}</p>
            <p className='text-sm'>{player.team}</p>
        </footer>
    </div>
  )
}
