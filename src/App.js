import React from 'react';
import axios from 'axios';
import './styles.css'; // Importa los estilos CSS

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = React.useState([]);

  React.useEffect(() => {
    // Realiza la solicitud a la API de WordPress para obtener los titulares
    axios.get('https://gk.city/wp-json/wp/v2/posts?per_page=5')
      .then(response => {
        // Extrae los datos de las respuestas y actualiza el estado
        setHeadlines(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los titulares:', error);
      });
  }, []);

  return (
    <div>
      <center><h2>Titulares más recientes</h2></center>
      <ul className="news-container"> {/* Agrega la clase del contenedor */}
        {headlines.map(headline => (
          <li key={headline.id} className="news-item"> {/* Agrega la clase del titular */}
            <h3>{headline.title.rendered}</h3>
            <p dangerouslySetInnerHTML={{ __html: headline.excerpt.rendered }} />
          </li>
        ))}
      </ul>
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
