import React, { useState, useEffect } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`


const misdatos = (props) => {
  const [xavatar, setXavatar] = useState('')
  const { nombre, direccion, telefono, email, documento, avatar } = props;
  console.log('EL Avatar es:'+avatar)
  

  useEffect(() => {
    console.log(avatar)
    if (avatar && avatar.trim().length > 0) {
      setXavatar(_servidorapipdf + avatar);
    }
  }, [avatar]); // Solo se ejecutará cuando `avatar` cambie

  return (
    <div>  <Card className="max-w-[600px] min-w-[600px]" style={{ maxHeight: '300px' }}>
    <CardHeader className="flex gap-3">
    <div style={{ 
      width: '80px', 
      height: '80px', 
      borderRadius: '50%', 
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      border: '2px solid #9C27B0'
    }}>
      <img
        alt="avatar asociado"
        src={avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%239C27B0'/%3E%3Ctext x='40' y='45' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EAvatar%3C/text%3E%3C/svg%3E"}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%'
        }}
        onError={(e) => {
          if (!e.target.dataset.fallbackUsed) {
            e.target.dataset.fallbackUsed = 'true';
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%239C27B0'/%3E%3Ctext x='40' y='45' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EAvatar%3C/text%3E%3C/svg%3E";
          }
        }}
      />
    </div>
           <div className="flex flex-col">
           <p className="text-md">{nombre}</p>
           <p className="text-small text-default-500">{documento}</p>
      </div>
    </CardHeader>
     <Divider/>
      <CardBody>
         <p>Email:{email}</p>
         <p>Telefono:{telefono}</p>
         <p>Direccion:{direccion}</p>
       </CardBody>
      <Divider/>
    <CardFooter>  
    </CardFooter>
      </Card>
  </div>
  )
}

export default misdatos