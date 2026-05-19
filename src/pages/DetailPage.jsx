import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { useContext } from "react";
import CardFilm from "../components/CardFilm";
import Loader from "../components/Loader";




function DetailPage() {
  const { id, mediaType } = useParams();
  const { fetchDetail } = useContext(GlobalContext);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetchDetail(id, mediaType)
      .then((data) => setDetail(data))
      .catch((error) => console.error("Error fetching detail:", error));
  }, [id, mediaType]);

  if (!detail) {
    return <Loader />;
  }

  return (
    <div>
     
        <CardFilm detail={detail} />
    
    </div>
  )
}

export default DetailPage;