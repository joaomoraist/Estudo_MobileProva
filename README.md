# 📱 Projeto React Native + Expo + Axios - Busca de Pokémon

## 🎯 Objetivo

Criar uma aplicação simples utilizando **React Native**, **Expo** e **Axios**, onde o usuário pode digitar o nome de um Pokémon e visualizar:

- Nome do Pokémon
- Imagem oficial
- Descrição do Pokémon

Este projeto é um ótimo exercício para praticar:

- Componentização
- Consumo de APIs REST
- Axios
- Hooks (`useState`)
- Async/Await
- Tratamento de erros
- Organização de pastas em React Native

---

# 📂 Estrutura do Projeto

```text
pokemon-app/
│
├── App.js
│
├── src/
│   ├── services/
│   │   └── api.js
│   │
│   ├── screens/
│   │   └── PokemonScreen.js
│   │
│   └── components/
│       └── PokemonCard.js
│
├── package.json
└── README.md
```

---

# 🚀 Criando o Projeto

Criar um projeto Expo:

```bash
npx create-expo-app pokemon-app
```

Entrar na pasta:

```bash
cd pokemon-app
```

Instalar o Axios:

```bash
npm install axios
```

ou

```bash
yarn add axios
```

---

# 🌐 API Utilizada

Utilizaremos a PokéAPI, uma API pública e gratuita.

Documentação:

https://pokeapi.co

---

## Endpoint para buscar dados do Pokémon

```http
GET https://pokeapi.co/api/v2/pokemon/pikachu
```

Retorna:

- Nome
- Imagem
- Altura
- Peso
- Habilidades
- Entre outros dados

---

## Endpoint para buscar descrição

```http
GET https://pokeapi.co/api/v2/pokemon-species/pikachu
```

Retorna:

- Descrição do Pokémon
- Informações da espécie
- Geração
- Habitat

---

# 🔧 Configurando o Axios

Arquivo:

```text
src/services/api.js
```

Código:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default api;
```

---

# 🧩 Componente PokemonCard

Arquivo:

```text
src/components/PokemonCard.js
```

Responsável por exibir:

- Nome
- Imagem
- Descrição

```javascript
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {pokemon.name.toUpperCase()}
      </Text>

      <Image
        source={{ uri: pokemon.image }}
        style={styles.image}
      />

      <Text style={styles.description}>
        {pokemon.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
  },

  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },

  description: {
    textAlign: "center",
    fontSize: 16,
  },
});
```

---

# 📄 Tela Principal

Arquivo:

```text
src/screens/PokemonScreen.js
```

Responsável por:

- Receber o nome digitado
- Fazer a requisição na API
- Armazenar os dados no estado
- Exibir o componente PokemonCard

```javascript
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

import api from "../services/api";
import PokemonCard from "../components/PokemonCard";

export default function PokemonScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(null);

  async function buscarPokemon() {
    try {
      const pokemonResponse = await api.get(
        `/pokemon/${pokemonName.toLowerCase()}`
      );

      const speciesResponse = await api.get(
        `/pokemon-species/${pokemonName.toLowerCase()}`
      );

      const descricao =
        speciesResponse.data.flavor_text_entries.find(
          item => item.language.name === "en"
        )?.flavor_text || "Descrição não encontrada";

      setPokemon({
        name: pokemonResponse.data.name,
        image:
          pokemonResponse.data.sprites.other[
            "official-artwork"
          ].front_default,
        description: descricao.replace(/\n|\f/g, " "),
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Pokémon não encontrado!"
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o nome do Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
        style={styles.input}
      />

      <Button
        title="Buscar Pokémon"
        onPress={buscarPokemon}
      />

      <PokemonCard pokemon={pokemon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
```

---

# 📱 Arquivo Principal

Arquivo:

```text
App.js
```

Código:

```javascript
import React from "react";
import PokemonScreen from "./src/screens/PokemonScreen";

export default function App() {
  return <PokemonScreen />;
}
```

---

# 🔍 Fluxo da Aplicação

## 1. Usuário digita o nome

Exemplo:

```text
pikachu
```

---

## 2. Axios faz a requisição

```javascript
GET /pokemon/pikachu
```

---

## 3. API retorna os dados

Exemplo simplificado:

```json
{
  "name": "pikachu",
  "sprites": {
    "other": {
      "official-artwork": {
        "front_default": "url-da-imagem"
      }
    }
  }
}
```

---

## 4. Busca a descrição

```javascript
GET /pokemon-species/pikachu
```

---

## 5. API retorna a descrição

```json
{
  "flavor_text_entries": [
    {
      "flavor_text": "When several of these Pokémon gather..."
    }
  ]
}
```

---

## 6. Atualiza o estado

```javascript
setPokemon({
  name: "pikachu",
  image: "url-da-imagem",
  description: "When several of these Pokémon gather..."
});
```

---

## 7. O componente é renderizado

Resultado:

```text
PIKACHU

(Imagem)

When several of these Pokémon
gather, their electricity...
```

---

# 📚 Conceitos Aprendidos

## useState

Permite armazenar informações no componente.

```javascript
const [pokemon, setPokemon] = useState(null);
```

---

## Axios

Biblioteca utilizada para fazer requisições HTTP.

```javascript
const response = await api.get("/pokemon/pikachu");
```

---

## Async/Await

Permite trabalhar com código assíncrono de forma mais simples.

```javascript
async function buscarPokemon() {
  const response = await api.get(...);
}
```

---

## Try/Catch

Captura erros da requisição.

```javascript
try {
  ...
} catch (error) {
  ...
}
```

---

## Componentização

Separar partes da interface em componentes reutilizáveis.

Exemplo:

```text
PokemonCard.js
```

---

# 💡 Possíveis Melhorias

Após concluir o exercício, você pode evoluir o projeto adicionando:

- Loading enquanto busca os dados
- Tradução da descrição para português
- Lista de Pokémon favoritos
- Histórico de pesquisas
- Busca ao pressionar Enter
- Exibição de tipos do Pokémon
- Exibição de habilidades
- Tela de detalhes
- Navegação com React Navigation

---

# ✅ Resultado Final Esperado

O usuário digita o nome de um Pokémon, pressiona o botão de busca e a aplicação exibe:

- Nome
- Imagem oficial
- Descrição

Utilizando:

- React Native
- Expo
- Axios
- PokéAPI
- Componentização
- Hooks
- Consumo de API REST
