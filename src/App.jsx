
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './hooks/components/LocationInfo'
import ResidentCard from './hooks/components/ResidentCard'

function App() {
  
  const [inputValue, setInputValue] = useState(getRandomNumber(126))
  const url =`https://rickandmortyapi.com/api/location/${inputValue}`
  const [ location, getLocation,hasError] = useFetch(url)
  
 

  useEffect(() => {
    getLocation()
  }, [inputValue])
 
  const inputSearch = useRef()
  const handleSubmit = e =>{
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
  }

  return (
    <>
      <div className='app'>
        <div className='app__title'></div>
        <form className='app__form' onSubmit={handleSubmit}>
          <input className='app__input' ref={inputSearch} type="text" />
          <button className='app__btn' >Search</button>
        </form>
    { 
      hasError
      ? <h2 className='app__alert'> Hey! you must provide and id from 1 to 126</h2>
      :(
      <>
      
        <LocationInfo location={location}/>
        <div className='app__card-container'>
        {
          location?.residents.map(url => (
            <ResidentCard 
            key={url}
            url={url}
            
            />
          ))
        }
        </div>
      </>
      )
    }
      </div>
      
    </>
  )
}

export default App
