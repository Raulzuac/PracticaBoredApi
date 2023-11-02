import { Activity } from './activity';
import { Foto } from './foto';


const precios = [
  'minprice=0&maxprice=0.33',
  'minprice=0.33&maxprice=0.66',
  'minprice=0.66&maxprice=1'
];
const accesibilidades = [
  'minaccessibility=0&maxaccessibility=0.33',
  'minaccessibility=0.33&maxaccessibility=0.66',
  'minaccessibility=0.66&maxaccessibility=1'];

function generaQuery(
  participantes:number,
  accesibilidad:number,
  precio:number):string{
  let url:string='https://www.boredapi.com/api/activity?';
  if(precio!=undefined)
  url += `${precios[Number(precio)]}&`
  if(accesibilidad!=undefined)
  url += `${accesibilidades[accesibilidad]}&`
  if(participantes!=undefined)
  url += `participants=${participantes}`
  console.log(url);
  
  return url;

}

async function buscaActividad(url:string):Promise<Activity>{
  const response = await fetch(url,{
    method:"GET"
  });
  return await response.json();
}

async function buscaImagen(actividad:Activity):Promise<Foto> {
  const urlImagen = `https://api.pexels.com/v1/search?query=${actividad.type}&per_page=2`;

    const responsePhoto = await fetch(urlImagen,{
      method:"GET",
      headers:{
        Authorization:"8Li6Uv4sHh45oQNYvOMQiI8XyRrRtv6ymm06ly0az3JhPzvU1scEEc3P"
      }
    })

    return responsePhoto.json();
}

function actualizaVista(actividad:Activity,foto:Foto):void{
  document.getElementById('imagen')?.setAttribute('src',foto.photos[1].src.medium);
  document.getElementById('nombre')!.innerText= actividad.activity;
  document.getElementById('tipo')!.innerText= actividad.type;
  document.getElementById('participantes')!.innerText= String(actividad.participants);
  document.getElementById('precio')!.innerText= generaEstrellas(actividad.price);
  document.getElementById('accesibilidad')!.innerText= generaEstrellas(actividad.accessibility);
  
}
function generaEstrellas(numero:number):string{
  // ★
  // ☆
  let resultado ='';
  for(let i =0;i<5;i++){
    resultado+=i<=(numero*5)?'★':'☆'
  }
  return resultado;
}

async function getActivity(){
  const participantes = document.getElementById('participantesIn') as HTMLInputElement;
  const accesibilidad = document.getElementById('accesibilidadIn') as HTMLInputElement;
  const precio = document.getElementById('priceIn') as HTMLInputElement;


  
  let actividad:Activity = await buscaActividad(
      generaQuery(
        Number(participantes.value),
        Number(accesibilidad.value),
        Number(precio.value))
  );

  
  if(actividad.activity==undefined){
    alert("No hay actividades que cumplan los requisitos");
  }else{
    
    
    const foto:Foto = await buscaImagen(actividad);
  
    actualizaVista(actividad,foto);
  }
  
  

}

document.getElementById('peticion')!.addEventListener('click',()=>{
  getActivity();
})

getActivity()