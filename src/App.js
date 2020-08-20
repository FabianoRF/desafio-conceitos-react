import React,{ useEffect, useState } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(()=>{
    api.get('repositories').then((response)=>{
      setRepositories(response.data);
    });

  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `Repositorio ${Date.now()}`,
      url: 'www.github.com',
      techs: [
        'nodeJs',
        'ReactJs'
      ]
    }

    const response = await api.post('repositories', newRepository);
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter((repositorie) => repositorie.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository)=>(
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>

         
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
