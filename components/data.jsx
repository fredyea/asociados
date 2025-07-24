import React, { useEffect, useState } from "react";

//const _servidorapi = 'http://localhost:9000/';
const _servidorapi = 'https://wt2e7as.localto.net/'

const columns = [
  { name: "ENTIDAD", uid: "name" },
  { name: "PROCESO", uid: "proceso" },
  { name: "CONVOCATORIA", uid: "role" },
  { name: "FECHA CIERRE", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const fetchData = async () => {
  try {
    const urlx = _servidorapi+'maestroconvocatorias';
    const response =  await fetch(urlx, { method: 'GET' });
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};

export { columns, fetchData };