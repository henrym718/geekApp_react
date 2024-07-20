import InputSearch from "./components/InputSearch";
import SubcategoryCarousel from "./components/SubcategoryCarousel";

export default function Home() {
  //data del carrusels
  const subcategories = [
    {
      id: "1",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      id: "2",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Cualquier cosa",
      description: "henrym.718@hotmail.com",
    },
    {
      id: "3",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "otra situacion de empleabilidad",
      description: "www.google.com",
    },
    {
      id: "4",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Feria de esoania",
      description: "idealistga.com",
    },
    {
      id: "5",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
    },
    {
      id: "6",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Cualquier cosa",
      description: "henrym.718@hotmail.com",
    },
    {
      id: "7",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "otra situacion de empleabilidad",
      description: "www.google.com",
    },
    {
      id: "8",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Feria de esoania",
      description: "idealistga.com",
    },
  ];

  return (
    <div className='flex flex-col  gap-[40px]'>
      <div className='mt-[200px]'>
        <InputSearch />
      </div>
      <div>
        <SubcategoryCarousel subcategories={subcategories} />
      </div>
    </div>
  );
}
