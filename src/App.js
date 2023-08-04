import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Preloader = () => {
  return (
    <div className="preloader">
      {/* Agrega aquí tu animación o mensaje de carga */}
    </div>
  );
};

const NewsHeadlines = () => {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    // Realiza la solicitud a la API de WordPress para obtener los titulares
    axios.get('https://gk.city/wp-json/wp/v2/posts?per_page=10')
      .then(response => {
        // Extrae los datos de las respuestas y actualiza el estado
        setHeadlines(response.data);
        setLoading(false); // Indica que la carga ha terminado
      })
      .catch(error => {
        console.error('Error al obtener los titulares:', error);
        setLoading(false); // Indica que la carga ha terminado (incluso en caso de error)
      });
  }, []);

  return (
    <div>
      <center><h2>Las historias mas recientes</h2></center>
      <a href="https://gk.city/politica" target="_blank" rel="noopener noreferrer" ><button className="Botones" >Politica</button></a>
      <a href="https://gk.city/medioambiente" target="_blank" rel="noopener noreferrer" ><button className="Botones" >Medioambiente</button></a>
      <a href="https://gk.city/opinion" target="_blank" rel="noopener noreferrer" ><button className="Botones" >Opinión</button></a>
      <a href="https://gk.city/genero" target="_blank" rel="noopener noreferrer" ><button className="Botones" >Género</button></a>
      <center>
      <div>
      <a href="https://www.facebook.com/tu_pagina" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://twitter.com/tu_pagina" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://www.instagram.com/tu_pagina" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      {/* Agrega más botones para otras redes sociales */}
    </div>
      </center>
      {/* Muestra el Preloader mientras se carga la data */}
      {loading ? (
        <Preloader />
      ) : (
        <ul className="news-container">
          {headlines.map(headline => (
            <li key={headline.id} className="news-item">
              <div className="content">
                <h3>{headline.title.rendered}</h3>
                <p dangerouslySetInnerHTML={{ __html: headline.excerpt.rendered }} />
                <a href={headline.link} target="_blank" rel="noopener noreferrer">
                  <button>Ver noticia</button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <NewsHeadlines />
      {/* Otros componentes o contenido de la landing page */}
    </div>
  );
};

export default App;
