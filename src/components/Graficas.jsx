import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Typography } from '@mui/material';

export default function Graficas() {
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de servicios
        const responseServicios = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio');
        const servicios = responseServicios.data;

        // Obtener datos de técnicos
        const responseTecnicos = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado');
        const tecnicos = responseTecnicos.data;

        // Agrupar y contar la cantidad de reparaciones por técnico
        const tecnicosReparaciones = servicios.reduce((accumulator, servicio) => {
          const tecnico = tecnicos.find((t) => t.IdEmpleado === servicio.Tecnico);

          if (tecnico) {
            const tecnicoNombre = tecnico.NombreEmpleado;

            if (accumulator[tecnicoNombre]) {
              accumulator[tecnicoNombre].CantidadReparaciones += 1;
            } else {
              accumulator[tecnicoNombre] = {
                Tecnico: tecnicoNombre,
                CantidadReparaciones: 1,
              };
            }
          }

          return accumulator;
        }, {});

        // Convertir el objeto a un array de objetos
        const tecnicosDataArray = Object.values(tecnicosReparaciones);

        setTecnicos(tecnicosDataArray);
      } catch (error) {
        console.error('Error al obtener la lista de servicios', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant='h6' sx={{textAlign:'center'}}>Cantidad de Reparaciones X Técnico</Typography>
      {tecnicos.length > 0 && (
        <ResponsiveContainer width='100%' aspect={4}>
          <BarChart data={tecnicos} width={500} height={300} barSize={50}>
            <CartesianGrid strokeDasharray='4 1 2' />
            <XAxis dataKey='Tecnico' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='CantidadReparaciones' name='Cantidad de Reparaciones' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
