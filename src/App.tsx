import { useState } from 'react'
import './App.css'
import { groupedNames } from './Names'
import peace from './assets/peace.jpg'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function App() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAihhCZSGsyOKES5pIxs-pXUxrUlJkC3fE",
    authDomain: "wedding-1f112.firebaseapp.com",
    projectId: "wedding-1f112",
    storageBucket: "wedding-1f112.firebasestorage.app",
    messagingSenderId: "589360708408",
    appId: "1:589360708408:web:60212e16925cff4e8e9fcd"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})

  const getCardKey = (i: number, j: number, value: string) => {
    return `card-${i}-${j}-${value}`
  }

  const handleCardClick = (cardKey: string) => {
    console.log(`Card clicked: ${cardKey}`)
    setFlippedCards(prevState => ({
      ...prevState,
      [cardKey]: !prevState[cardKey]
    }))
  }

  const totalCols = groupedNames.length
  const totalRows = groupedNames[0].length

  return (
    <>
      <div className="tables-container">
        {
          groupedNames.map((group, col) => {
            return (
              <div key={`group-${col}`} className="name-group">

                <h2>Table {col + 1}</h2>
                {
                  group.map((name, row) => {
                    const cardKey = getCardKey(col, row, name)
                    const isFlipped = flippedCards[cardKey] || false
                    const backgroundStyle = {
                      backgroundImage: `url(${peace})`,
                      backgroundSize: `${totalCols * 100}% ${totalRows * 100}%`,
                      backgroundPosition: `${(col / (totalCols - 1)) * 100}% ${(row / (totalRows - 1)) * 100}%`
                    }

                    return (
                      <div key={`${name}-${col}-${row}`} className="name-card">
                        <div className="flip-card" onClick={() => handleCardClick(cardKey)}>
                          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                            <div className="flip-card-front">
                              <h3>{name}</h3>
                            </div>
                            <div className="flip-card-back" style={backgroundStyle}>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div >
    </>
  )
}

export default App
