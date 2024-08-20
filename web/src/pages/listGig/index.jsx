import { Link } from "react-router-dom";
import CardGigs from "./component/CardGigs";
import "./index.css";

export default function ListGigsView() {
  const gigs = [
    {
      id: "1",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
      author: "henrym718",
    },
    {
      id: "2",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Cualquier cosa",
      description: "henrym.718@hotmail.com",
      author: "henrym718",
    },
    {
      id: "3",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "otra situacion de empleabilidad",
      description: "www.google.com",
      author: "henrym718",
    },
    {
      id: "4",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Feria de esoania",
      description: "idealistga.com",
      author: "henrym718",
    },
    {
      id: "5",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
      author: "henrym718",
    },
    {
      id: "6",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Cualquier cosa",
      description: "henrym.718@hotmail.com",
      author: "henrym718",
    },
    {
      id: "7",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "otra situacion de empleabilidad",
      description: "www.google.com",
      author: "henrym718",
    },
    {
      id: "8",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Feria de esoania",
      description: "idealistga.com",
      author: "henrym718",
    },
    {
      id: "1",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
      author: "henrym718",
    },
    {
      id: "2",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Cualquier cosa",
      description: "henrym.718@hotmail.com",
      author: "henrym718",
    },
    {
      id: "3",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "otra situacion de empleabilidad",
      description: "www.google.com",
      author: "henrym718",
    },
    {
      id: "4",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Feria de esoania",
      description: "idealistga.com",
      author: "henrym718",
    },
    {
      id: "5",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Europe Street beat",
      description: "www.instagram.com",
      author: "henrym718",
    },
    {
      id: "6",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Cualquier cosa",
      description: "henrym.718@hotmail.com",
      author: "henrym718",
    },
    {
      id: "7",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "otra situacion de empleabilidad",
      description: "www.google.com",
      author: "henrym718",
    },
    {
      id: "8",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "Feria de esoania",
      description: "idealistga.com",
      author: "henrym718",
    },
  ];

  return (
    <div className='container'>
      {gigs.map((gig) => (
        <div className='container__item '>
          <Link to={`/${gig.author}/${gig.title}`}>
            <CardGigs key={gig.id} gig={gig} />
          </Link>
        </div>
      ))}
    </div>
  );
}
