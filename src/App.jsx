import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'
import { generarId } from './helpers'
import iconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  
  const [modal, setModal] = useState(false)
  const [animar, setAnimar] = useState(false)
  
  const [gastoEditar, setGastoEditar] = useState({})
  
  const [filtro, setFiltro] = useState('')
  const [gastosDelFiltro, setGastosDelFiltro] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length !== 0) {
      setModal(true)

      setTimeout(() => {
        setAnimar(true)
      }, 500);
      
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)  
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])  
  }, [gastos])

  useEffect(() => {
    const gastosFiltrados2 = gastos.filter(g => g.categoria === filtro)

    setGastosDelFiltro(gastosFiltrados2)
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])


  const handleNuevoGasto = () => {  
    setGastoEditar({})
    setModal(true)

    setTimeout(() => {
      setAnimar(true)
    }, 500)
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoTemporal => gastoTemporal.id === gasto.id ? gasto : gastoTemporal)
      setGastos(gastosActualizados)  
      setGastoEditar({})
    }else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    
    setAnimar(false)
    
    setTimeout(() => {
      setModal(false)
    }, 500);
  }
  
  const eliminarGasto = id => {
    const gastosFiltrados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosFiltrados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosDelFiltro={gastosDelFiltro} 
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={iconoNuevoGasto} 
              alt="nuevoGasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && 
        <Modal
          setModal={setModal}
          animar={animar}
          setAnimar={setAnimar}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

    </div>
  )
}

export default App
