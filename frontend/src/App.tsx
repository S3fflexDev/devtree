import {Component, createResource, For, onMount, Show} from 'solid-js';
import Comp from './Comp';


const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:3001/users");
    return response.json();
};

const App: Component = () => {

    const [users] = createResource(fetchUsers);

  return (
      <div>
          <h1>🌳 Usuarios de DevTree</h1>

          {/* 3. <Show> muestra un texto mientras los datos llegan del backend */}
          <Show when={!users.loading} fallback={<p>Cargando usuarios a toda pastilla... 🚀</p>}>

              <div>
                  {/* 4. <For> recorre el array. OJO: users() se llama con paréntesis porque es reactivo */}
                  <For each={users()}>
                      {(user) => (
                          <div>
                              {/* Usamos el avatarUrl, si no tiene, ponemos uno por defecto */}
                              <img
                                  src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.username}`}
                                  alt="Avatar"
                              />
                              <div>
                                  <h2>{user.username}</h2>
                                  <p>@{user.username}</p>
                                  <p>{user.bio}</p>
                              </div>
                          </div>
                      )}
                  </For>
              </div>

          </Show>
      </div>
  );
};

export default App;
