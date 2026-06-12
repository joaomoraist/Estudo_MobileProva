Criar uma tela que:

* Digite o nome de um Pokémon
* Clique em "Buscar Pokémon"
* Consuma a API usando Axios
* Exiba:

  * Nome
  * Imagem
* Mostre erro caso não encontre

API:

```text
https://pokeapi.co/api/v2/pokemon/{name}
```

---

# 📂 Estrutura do Projeto

```text
src/
│
├── screens/
│   └── PokemonScreen.js
│
├── components/
│   └── PokemonCard.js
│
└── services/
    └── api.js

App.js
```

---

# 1️⃣ Instalar Axios

```bash
npm install axios
```

---

# 2️⃣ Configurar API

Arquivo:

```text
src/services/api.js
```

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default api;
```

---

# 3️⃣ Criar Card do Pokémon

Arquivo:

```text
src/components/PokemonCard.js
```

```javascript
import React from "react";
import { View, Text, Image } from "react-native";

export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <View>
      <Text>{pokemon.name}</Text>

      <Image
        source={{ uri: pokemon.image }}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}
```

---

# 4️⃣ Criar Tela Principal

Arquivo:

```text
src/screens/PokemonScreen.js
```

```javascript
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

import api from "../services/api";
import PokemonCard from "../components/PokemonCard";

export default function PokemonScreen() {
  const [pokemonName, setPokemonName] =
    useState("");

  const [pokemon, setPokemon] =
    useState(null);

  async function buscarPokemon() {
    try {
      const response = await api.get(
        `/pokemon/${pokemonName.toLowerCase()}`
      );

      setPokemon({
        name: response.data.name,
        image:
          response.data.sprites.other[
            "official-artwork"
          ].front_default,
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Pokémon não encontrado"
      );
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite o Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button
        title="Buscar Pokémon"
        onPress={buscarPokemon}
      />

      <PokemonCard pokemon={pokemon} />
    </View>
  );
}
```

---

# 5️⃣ App.js

```javascript
import PokemonScreen from "./src/screens/PokemonScreen";

export default function App() {
  return <PokemonScreen />;
}
```

---

# 🧠 O que decorar

## Criar estado

```javascript
const [pokemonName, setPokemonName] =
  useState("");

const [pokemon, setPokemon] =
  useState(null);
```

---

## Fazer requisição

```javascript
const response =
  await api.get(`/pokemon/${pokemonName}`);
```

---

## Pegar nome

```javascript
response.data.name
```

---

## Pegar imagem

```javascript
response.data.sprites.other[
  "official-artwork"
].front_default
```

---

## Atualizar estado

```javascript
setPokemon({
  name: response.data.name,
  image: imageUrl,
});
```

---

## Tratar erro

```javascript
catch(error){
  Alert.alert(
    "Erro",
    "Pokémon não encontrado"
  );
}
```

---
