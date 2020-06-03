import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/IranoLincolnJA/modulo01-reactjs",
      techs: [
        "NodeJS", "ReactJS"
      ]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    // Filtra todos os repositórios com Id diferente do deletado
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => 
          <li key={index}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
