import { Activity } from './activity';
import { Foto } from './foto';


const precios = ['minprice=0&maxprice=0.33','minprice=0.33&maxprice=0.66','minprice=0.66&maxprice=1'];
const accesibilidades = ['minaccessibility=0&maxaccessibility=0.33','minaccessibility=0.33&maxaccessibility=0.66','minaccessibility=0.66&maxaccessibility=1'];


async function getActivity(){
  const participantes = document.getElementById('participantesIn') as HTMLInputElement;
  console.log(participantes.value);
  const accesibilidad = document.getElementById('accesibilidadIn') as HTMLInputElement;
  console.log(accesibilidad.value);
  const precio = document.getElementById('priceIn') as HTMLInputElement;
  console.log(precio.value);
  
  let url:string='https://www.boredapi.com/api/activity?';
  if(precio.value!=undefined)
  url += `${precios[Number(precio.value)]}&`
  if(accesibilidad.value!=undefined)
  url += `${accesibilidades[Number(accesibilidad.value)]}&`
  if(participantes.value!=undefined)
  url += `participants=${participantes.value}`

  const response = await fetch(url,{
    method:"GET"
  });
  const json = await response.json();

  let actividad:Activity = json;
  if(json.error!=undefined){
    Swal.fire('No hay actividad','No existe ninguna actividad con los campos que buscas','warning');
  }else{
    const urlImagen = `https://api.pexels.com/v1/search?query=${actividad.type}&per_page=2`;

    const responsePhoto = await fetch(urlImagen,{
      method:"GET",
      headers:{
        Authorization:"8Li6Uv4sHh45oQNYvOMQiI8XyRrRtv6ymm06ly0az3JhPzvU1scEEc3P"
      }
    })
    
    const foto:Foto = await responsePhoto.json();
  
    document.getElementById('imagen')?.setAttribute('src',foto.photos[1].src.medium);
  
    document.getElementById('nombre')!.innerText= actividad.activity;
    document.getElementById('tipo')!.innerText= actividad.type;
    document.getElementById('participantes')!.innerText= String(actividad.participants);
    document.getElementById('precio')!.innerText= String(actividad.price);
    document.getElementById('accesibilidad')!.innerText= String(actividad.activity);
  }
  
  

}

getActivity()