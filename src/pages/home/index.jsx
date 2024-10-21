import { useState } from "react";
import TextIntroduction from "./components/TextIntroduction";
import Autocomplete from "./components/Autocomplete";
import Nav from "./components/Nav";
import useUserStore from "../auth/store/user";

export default function Home() {
  const [options, setOptions] = useState([]);

  const { user } = useUserStore((state) => state);
  console.log({ user });

  const handleChange = (value) => {
    const data = servicios.filter((service) => service.value.toLowerCase().includes(value.toLowerCase()));
    setOptions(data);
  };

  const handleOnSelected = (value) => {
    console.log(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
  };
  return (
    <>
      <div>
        <div className=" flex flex-col bg-hero px-5 py-10 sm:items-center sm:py-24 ">
          <TextIntroduction />
          <Autocomplete options={options} onChange={handleChange} onSelected={handleOnSelected} limit={10} />
        </div>
      </div>
      <div className="sm:max-w-screen-xl sm:mx-auto">
        <Nav />
      </div>
    </>
  );
}

const servicios = [
  // Servicios digitales y tecnológicos
  { id: 1, value: "Desarrollo web personalizado" },
  { id: 2, value: "Diseño de aplicaciones móviles" },
  { id: 3, value: "Marketing digital integral" },
  { id: 4, value: "Consultoría SEO y SEM" },
  { id: 5, value: "Gestión de redes sociales" },
  { id: 6, value: "Desarrollo de ecommerce" },
  { id: 7, value: "Ciberseguridad y protección de datos" },
  { id: 8, value: "Análisis de datos y Business Intelligence" },
  { id: 9, value: "Desarrollo de software a medida" },
  { id: 10, value: "Diseño UX/UI" },

  // Servicios de diseño y creatividad
  { id: 11, value: "Diseño gráfico y branding" },
  { id: 12, value: "Ilustración y animación 2D y 3D" },
  { id: 13, value: "Fotografía profesional" },
  { id: 14, value: "Diseño de interiores" },
  { id: 15, value: "Video marketing y producción audiovisual" },
  { id: 16, value: "Diseño de packaging" },
  { id: 17, value: "Calligrafía y lettering" },
  { id: 18, value: "Diseño web responsive" },
  { id: 19, value: "Arte urbano y muralismo" },
  { id: 20, value: "Diseño de infografías" },

  // Servicios de consultoría y asesoramiento
  { id: 21, value: "Consultoría empresarial" },
  { id: 22, value: "Asesoría legal" },
  { id: 23, value: "Coaching ejecutivo" },
  { id: 24, value: "Consultoría en recursos humanos" },
  { id: 25, value: "Asesoría financiera" },
  { id: 26, value: "Coaching de vida" },
  { id: 27, value: "Consultoría en sostenibilidad" },
  { id: 28, value: "Mediación y resolución de conflictos" },
  { id: 29, value: "Asesoría en inmigración" },
  { id: 30, value: "Consultoría en marketing estratégico" },

  // Servicios para el hogar y la empresa
  { id: 31, value: "Limpieza a fondo de hogares y oficinas" },
  { id: 32, value: "Mantenimiento y reparaciones del hogar" },
  { id: 33, value: "Jardinería y paisajismo" },
  { id: 34, value: "Mudanzas y transporte" },
  { id: 35, value: "Reformas integrales" },
  { id: 36, value: "Instalaciones eléctricas y fontanería" },
  { id: 37, value: "Pintura y decoración" },
  { id: 38, value: "Carpintería y ebanistería" },
  { id: 39, value: "Servicios de seguridad" },
  { id: 40, value: "Organización de eventos" },
];

// // export default function Home() {
// //   //data del carrusels
// //   const subcategories = [
// //     {
// //       id: "1",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "Europe Street beat",
// //       description: "www.instagram.com",
// //     },
// //     {
// //       id: "2",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "Cualquier cosa",
// //       description: "henrym.718@hotmail.com",
// //     },
// //     {
// //       id: "3",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "otra situacion de empleabilidad",
// //       description: "www.google.com",
// //     },
// //     {
// //       id: "4",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "Feria de esoania",
// //       description: "idealistga.com",
// //     },
// //     {
// //       id: "5",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "Europe Street beat",
// //       description: "www.instagram.com",
// //     },
// //     {
// //       id: "6",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "Cualquier cosa",
// //       description: "henrym.718@hotmail.com",
// //     },
// //     {
// //       id: "7",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "otra situacion de empleabilidad",
// //       description: "www.google.com",
// //     },
// //     {
// //       id: "8",
// //       url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
// //       title: "Feria de esoania",
// //       description: "idealistga.com",
// //     },
// //   ];

// //   const onchange = (value)=>{
// //     console.log(value)
// //   }
// //   return (
// //     <div className="flex flex-col gap-[40px]">
// //       <div className="relative h-[500px]">
// //         <img
// //           src={bgImage}
// //           alt="background"
// //           className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
// //         />
// //         <div className=" flex flex-col absolute top-0 left-0 w-full h-full justify-center items-center">
// //           <h2 className="text-6xl text-white text-center mb-5 ">
// //             Encuentra el servicio <br />
// //              freelance adecuado de <br />
// //             inmediato
// //           </h2>
// //           <InputSearch />
// //         </div>
// //       </div>
// //           <Autocomplete
// //           onChange={onchange}
// //           />
// //       <CatgeoriesCard categories={categories} />

// //       <h1 className="text-5xl text-gray-700">Servicios populares</h1>
// //       <div>
// //         <SubcategoryCarousel subcategories={subcategories} />
// //       </div>
// //     </div>
// //   );
// // }

// // const categories = [
// //   {
// //     id: 1,
// //     name: "categoria 1",
// //     ico: ico,
// //   },
// //   {
// //     id: 2,
// //     name: "categoria 2",
// //     ico: ico,
// //   },
// //   {
// //     id: 3,
// //     name: "categoria 3",
// //     ico: ico,
// //   },
// //   {
// //     id: 4,
// //     name: "categoria 4",
// //     ico: ico,
// //   },
// //   {
// //     id: 5,
// //     name: "categoria 4",
// //     ico: ico,
// //   },
// //   {
// //     id: 6,
// //     name: "categoria 4",
// //     ico: ico,
// //   },
// //   {
// //     id: 7,
// //     name: "categoria 4",
// //     ico: ico,
// //   },
// //   {
// //     id: 8,
// //     name: "categoria 4",
// //     ico: ico,
// //   },
// // ];
// <seccion className="bg-[#202020] rounded-lg h-[500px]">
// 			ssssdsadas
// 					{/* <TextIntroduction /> */}

// 					{/* <Autocomplete onChange={handleChange} options={options} limit={10} /> */}

// 			</seccion>

// 			<Nav className="relative z-0" />
