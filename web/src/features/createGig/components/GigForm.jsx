import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Input,
  Upload,
  Button,
  Cascader,
  InputNumber,
  Alert,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useNavigate } from "react-router-dom";
import GigFromTag from "./GigFromTag";
import { useState } from "react";
import newGigService from "../service/newGigService";

export default function GigForm() {
  const [error, setError] = useState(null);
  const [value, setValue] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    aboutGig: "",
    category: "",
    group: "",
    phone: "",
    price: 0,
    tags: [],
    coverImage: "",
  });

  const navigate = useNavigate();

  const handleStateInputs = (values) => {
    setInputs({ ...inputs, [values.target.name]: values.target.value });
  };

  const handleStateSelected = (values) => {
    setInputs({ ...inputs, tags: values });
  };

  const handlestateCascader = (values) => {
    const [group, category] = values;
    setInputs({ ...inputs, group, category });
  };

  const customRequest = async ({ file, onError, onSuccess }) => {
    try {
      const url = await newGigService.sendImageCover(file);
      setInputs({ ...inputs, coverImage: url });
      onSuccess();
    } catch (error) {
      setError(error.response.data.message);
      onError();
    }
  };

  const handlestateInputNumber = (price) => {
    setInputs({ ...inputs, price });
  };

  const sendData = async () => {
    try {
      const inputstoSend = { ...inputs, aboutGig: value };
      const response = await newGigService.createGig(inputstoSend);
      console.log(response);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className=' flex flex-col items-center justify-center pt-10 pb-60'>
      {error && <Alert message={error} type='info' />}
      <Form className='w-1/3'>
        <span className='font-semibold text-base custom-span'> Titulo</span>
        <Form.Item className='mt-2 mb-10'>
          <Input
            name='title'
            onChange={handleStateInputs}
            size='large'
            type='text'
          />
        </Form.Item>
        <span className='font-semibold text-base custom-span'>Descripcion</span>
        <ReactQuill
          className='h-[250px] mb-16 mt-2'
          theme='snow'
          value={value}
          onChange={setValue}
        />
        <span className='font-semibold text-base custom-span'>
          Sector del servicio
        </span>
        <Form.Item className='mt-2 mb-10'>
          <Cascader
            size='large'
            options={options1}
            onChange={handlestateCascader}
          />
        </Form.Item>
        <div className='flex gap-[125px]'>
          <div>
            <span className='font-semibold text-base custom-span'>Celular</span>
            <Form.Item className='mt-2 mb-10'>
              <Input
                name='phone'
                onChange={handleStateInputs}
                size='large'
                type='phone'
              />
            </Form.Item>
          </div>
          <div>
            <span className='font-semibold text-base custom-span'> precio</span>
            <Form.Item className='mt-2 mb-10'>
              <InputNumber
                onChange={handlestateInputNumber}
                size='large'
                className='w-56'
                defaultValue={0}
                min={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </div>
        </div>
        <span className='font-semibold text-base custom-span'> Tags</span>
        <Form.Item className='mt-2 mb-10'>
          <GigFromTag
            className='w-full'
            selected={handleStateSelected}
            max={5}
          />
        </Form.Item>
        {/* <Form.Item className='mt-2 mb-10'> */}
        <div className='mt-2 mb-10'>
          <ImgCrop aspect={5 / 3} showGrid>
            <Upload
              maxCount={1}
              accept='.jpge, .png'
              customRequest={customRequest}
            >
              <Button size='large'> Imagen de portada</Button>
            </Upload>
          </ImgCrop>
        </div>
        {/* </Form.Item> */}
        <Button
          onClick={sendData}
          className='w-full '
          size='large'
          htmlType='button'
        >
          Registrar
        </Button>
      </Form>
    </div>
  );
}

const options1 = [
  {
    label: "Construcción y Remodelación",
    value: "Construcción y Remodelación",
    children: [
      {
        label: "Pintor de casa",
        value: "Pintor de casa",
      },
      {
        label: "Empastador",
        value: "Empastador",
      },
      {
        label: "Instalador de gypsum",
        value: "Instalador de gypsum",
      },
      {
        label: "Albañil",
        value: "Albañil",
      },
      {
        label: "Fontanero",
        value: "Fontanero",
      },
      {
        label: "Soldador",
        value: "Soldador",
      },
      {
        label: "Electricista",
        value: "Electricista",
      },
      {
        label: "Ebanista",
        value: "Ebanista",
      },
      {
        label: "Carpintero",
        value: "Carpintero",
      },
      {
        label: "Jardinero",
        value: "Jardinero",
      },
      {
        label: "Reparador de techos",
        value: "Reparador de techos",
      },
    ],
  },
  {
    label: "Servicios Profesionales",
    value: "Servicios Profesionales",
    children: [
      {
        label: "Contador",
        value: "Contador",
      },
      {
        label: "Arquitecto",
        value: "Arquitecto",
      },
      {
        label: "Abogado",
        value: "Abogado",
      },
      {
        label: "Importador",
        value: "Importador",
      },
    ],
  },
  {
    label: "Artesanía y Manualidades",
    value: "Artesanía y Manualidades",
    children: [
      {
        label: "Elaboración de manualidades",
        value: "Elaboración de manualidades",
      },
      {
        label: "Trabajador de cuero",
        value: "Trabajador de cuero",
      },
      {
        label: "Ceramista",
        value: "Ceramista",
      },
    ],
  },
  {
    label: "Servicios Tecnológicos",
    value: "Servicios Tecnológicos",
    children: [
      {
        label: "Edición de videos",
        value: "Edición de videos",
      },
      {
        label: "Creación de páginas web",
        value: "Creación de páginas web",
      },
      {
        label: "Desarrollo de aplicaciones",
        value: "Desarrollo de aplicaciones",
      },
      {
        label: "Creación de contenido publicitario",
        value: "Creación de contenido publicitario",
      },
      {
        label: "Estrategias de marketing digital",
        value: "Estrategias de marketing digital",
      },
      {
        label: "Manejo de redes sociales",
        value: "Manejo de redes sociales",
      },
      {
        label: "Ilustración digital",
        value: "Ilustración digital",
      },
      {
        label: "Fotografía profesional",
        value: "Fotografía profesional",
      },
      {
        label: "Manejo de redes sociales",
        value: "Manejo de redes sociales",
      },
    ],
  },
  {
    label: "Salud y Bienestar",
    value: "Salud y Bienestar",
    children: [
      {
        label: "Masajista",
        value: "Masajista",
      },
      {
        label: "Fitoterapeuta",
        value: "Fitoterapeuta",
      },
      {
        label: "Instructor de yoga",
        value: "Instructor de yoga",
      },
      {
        label: "Cosmetóloga",
        value: "Cosmetóloga",
      },
    ],
  },
  {
    label: "Educación y Desarrollo Personal",
    value: "Educación y Desarrollo Personal",
    children: [
      {
        label: "Cursos de inglés",
        value: "Cursos de inglés",
      },
      {
        label: "Cursos de nivelación académica",
        value: "Cursos de nivelación académica",
      },
      {
        label: "Tutoría en diferentes materias",
        value: "Tutoría en diferentes materias",
      },
      {
        label: "Cursos de habilidades blandas",
        value: "Cursos de habilidades blandas",
      },
    ],
  },
  {
    label: "Entretenimiento y Eventos",
    value: "Entretenimiento y Eventos",
    children: [
      {
        label: "Organizador de eventos locales",
        value: "Organizador de eventos locales",
      },
      {
        label: "Animador para fiestas",
        value: "Animador para fiestas",
      },
      {
        label: "DJ local",
        value: "DJ local",
      },
    ],
  },
  {
    label: "Servicios Técnicos",
    value: "Servicios Técnicos",
    children: [
      {
        label: "Reparador de electrodomésticos",
        value: "Reparador de electrodomésticos",
      },
      {
        label: "Instalador de antenas satelitales",
        value: "Instalador de antenas satelitales",
      },
      {
        label: "Instalador de cámaras de seguridad",
        value: "Instalador de cámaras de seguridad",
      },
      {
        label: "Reparación de computadoras",
        value: "Reparación de computadoras",
      },
      {
        label: "Reparación de impresoras",
        value: "Reparación de impresoras",
      },
    ],
  },
];
