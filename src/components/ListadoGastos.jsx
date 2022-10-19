import Gasto from "./Gasto"

const ListadoGastos = ({ 
  gastos, 
  setGastoEditar, 
  eliminarGasto,
  filtro,
  gastosDelFiltro 
}) => {
  return (
    <div className="listado-gastos contenedor">

        {filtro ? (
          <>
            <h2> {gastosDelFiltro.length ? "Gastos" : "Aun no hay gastos"} </h2>
            {gastosDelFiltro.map(gasto => (
              <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                  />
            ))} 
          </>
        ) : (
          <>
            <h2> {gastos.length ? "Gastos" : "Aun no hay gastos"} </h2>
            {gastos.map(gasto => (
              <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        )}
    </div>
  )
}

export default ListadoGastos
