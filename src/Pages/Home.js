import React, { useState } from 'react'


import Apps_cat from './Appscomponents/Apps_cat'
import Apps_section from './Appscomponents/Apps_section'
import Apps_filter from './Appscomponents/App_filter'
import Side_apps from './Appscomponents/Side_apps'
import Banner from './Components/Banner'
import './Home.css'
export default function Home() {
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
    <div className=' p-1'>
      {/* {showFilter ? <Apps_filter hideFilter={hideFilter} filtername={Filter}  /> :
        <>
       {
              ShowSection ?<>
              <Apps_section section={Section} changeState={changeState} />
              </>
              :<> */}
      <Banner />
      <div className='container-fluid '>
        <div className='row'>
          <div className='col-sm-2 p-1 left'>
            {/* cat categories */}
            {/* <div className='col-sm cat bg-white  p-3'>
                <p className='fw-bold fs-6 cat_text mt-1' onClick={() => changeFilter("Category 1")}>Category 1</p>
                <p className='fw-bold fs-6 cat_text mt-1' onClick={() => changeFilter("Category 2")}>Category 2</p>
                <p className='fw-bold fs-6 cat_text mt-1' onClick={() => changeFilter("Category 3")}>Category 3</p>
                <p className='fw-bold fs-6 cat_text mt-1' onClick={() => changeFilter("Category 4")}>Category 4</p>
                <p className='fw-bold fs-6 cat_text mt-1' onClick={() => changeFilter("Category 5")}>Category 5</p>


              </div> */}
            <div className='col-sm cat1 mt-1 p-2 d-none d-lg-block'>
              <Side_apps />
            </div>
          </div>
          <div className='col-sm-10 p-2 right bg-transparent'>
            {showFilter ? <Apps_filter hideFilter={hideFilter} filtername={Filter} /> :
              <>
                {
                  ShowSection ? <>
                    <Apps_section section={Section} changeState={changeState} />
                  </>
                    : <>
                      {/* cat cantainer */}


                      {/* <App_row title={i.Category} changeState={changeState} ShowSignleapp={ShowSignleapp}/>
               */}
                      <Apps_cat title="Sports" changeState={changeState}  />
                      <Apps_cat title="Gaming" changeState={changeState}  />
                      <Apps_cat title="News" changeState={changeState}  />
                      <Apps_cat title="Social Media" changeState={changeState}  />
                      <Apps_cat title="Shoping" changeState={changeState}  />

                    </>
                }</>}
          </div>
        </div>

      </div>
      {/* //  </> */}
      {/* //         }</>} */}
    </div>
  )
}
