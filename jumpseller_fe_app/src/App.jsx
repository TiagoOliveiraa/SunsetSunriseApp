import { useState,useEffect} from 'react'
import './index.css'
import InputBar from './components/InputBar'
import Header from './components/Header'
import getSunData from './services/api'
import Chart from './components/Chart'
import SoloChart from './components/SoloChart'
import DataTable from './components/DataTable'
import Footer from './components/Footer'
import ErrorMessageToast from './components/ErrorMessageToast'
import LoadingSpinner from './components/LoadingSpinner'


function App() {
  const [sunInfo, setSunInfo] = useState({})
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  async function getSunInfo (inputInfo) {
    setLoading(true)
    setShowChart(false)
    const newSunInfo = await getSunData(inputInfo);  
    setSunInfo(newSunInfo);
    setLoading(false)
  }

  function handleClose(){
    setShowError(false)
  }

  useEffect(() => {
    if(sunInfo.error) {
      setShowError(true)
      setShowChart(false)
    }
    else if(!sunInfo || Object.keys(sunInfo).length === 0){
      setShowChart(false)
    }
    else{
      setShowError(false)
      setShowChart(true)
    }
  }, [sunInfo]);


  return <div className="app-container">
  <Header/>
  <InputBar clicked={getSunInfo}/>
  {loading && <LoadingSpinner/> }
  {showChart && (
    sunInfo.length > 1 ? (
      <Chart sunInfo={sunInfo}/>
    ) : (
      <SoloChart sunInfo={sunInfo}/>
    )
  )}
  {showChart && <DataTable sunInfo={sunInfo}/>}
  {showError && <ErrorMessageToast errorMessage={sunInfo.error} Closed={handleClose}/>}
  <Footer/>
  </div> 
}

export default App
