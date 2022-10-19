import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({ 
    setModal, 
    animar, 
    setAnimar, 
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        setGastoEditar({})
        setAnimar(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()

        //Validación
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje("")
            }, 2000);

            return
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }


  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn} 
                alt="cerrar"
                onClick={ocultarModal}
            />
        </div>

        <form 
            className={`formulario ${animar ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}
            >
            { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}  
            <legend>{ gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto" }</legend>

            <div className='campo'>
                <label htmlFor="nombre"> Nombre Gasto</label>

                <input 
                    id="nombre" 
                    type="text"
                    placeholder="Añade el nombre del gasto" 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id="cantidad" 
                    type="number"
                    placeholder="Añade la cantidad. Ejemplo: $350" 
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione Categoria --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                    <option value="varios">Gastos Varios</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={ gastoEditar.nombre ? "Guardar cambios" : "Agregar gasto" } 
            />
        </form>
    </div>
  )
}

export default Modal
