import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    gastos, 
    setGastos, 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponibre, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)


    useEffect(() => {
        const total = gastos.reduce(( acumulado, gasto ) => gasto.cantidad + acumulado, 0)
        const disponibreActual = presupuesto - total

        //calculo porcentaje
        const porc = ((presupuesto - disponibreActual) / presupuesto) * 100

        setGastado(total)
        setDisponible(disponibreActual)
        setTimeout(() => {
            setPorcentaje(porc.toFixed(2))
        }, 1500);
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () =>{
        const respuesta = confirm('¿Desea resetear la aplicación?')

        if (respuesta) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`Gastado: ${porcentaje}%`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponibre < 0 ? 'negativo' : ''}`}>
                    <span>Disponibre:</span> {formatearCantidad(disponibre)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
