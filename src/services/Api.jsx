const URL = "https://rpm-tecno-web-api-dev.azurewebsites.net/api";


const postServicios = async(NumeroOrden,CICliente, Modelo,TipoEquipo,TipoServicio,TrabajoARealizar,Tecnico,PrecioReparacion,FechaRecibido,FechaFinalizado,Nota,IdEstado) => {
    try {
      // promesa del fetch
      const response = await fetch(`${URL}/servicios`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
            NumeroOrden: NumeroOrden,
            CICliente: CICliente,
            Modelo: Modelo,
            TipoEquipo: TipoEquipo,
            TipoServicio: TipoServicio,
            TrabajoARealizar: TrabajoARealizar,
            Tecnico: Tecnico,
            PrecioReparacion: PrecioReparacion,
            FechaRecibido: FechaRecibido,
            FechaFinalizado: FechaFinalizado,
            Nota: Nota,
            IdEstado: IdEstado
        }),
      });
      
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject('Ha ocurrido un error', response.status);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getEmpleados = async() => {
    try {
      // Devuelvo la promesa del fetch
      const response = await fetch(`${URL}/empleado`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject('Ha ocurrido un error', response.status);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  

  export {postServicios,getEmpleados};