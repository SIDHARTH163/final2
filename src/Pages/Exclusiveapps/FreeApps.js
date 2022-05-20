import React ,{useState} from 'react'
import Banner from '../Components/Banner'
import Free_cat from './Components/Free_cat'
import Free_section from './Components/Free_section'
export default function FreeApps() {
    const [ShowSection, setShowSection] = useState(false)
    const [Section, setSection] = useState("")
    const [Filter, setFilter] = useState('')
    
    const [showFilter, setshowFilter] = useState(false)
    const changeState = (section) => {
      setShowSection(!ShowSection)
      setSection(section)
    }
    const changeFilter = (filter) => {
      setshowFilter(true)
      setFilter(filter)
     
    }
  
    const hideFilter = () => {
      setshowFilter(false)
      window.location.reload(false);
    }
  return (
    <><Banner /><div className='container-fluid p-2'>
      {ShowSection ? <>
        <Free_section section={Section} changeState={changeState} />
      </>
        : <>
          <div className='container'>
            <Free_cat title="Sports" changeState={changeState} />
          </div>
        </>}
    </div></>
  )
}
