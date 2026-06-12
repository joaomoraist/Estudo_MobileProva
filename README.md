
# 📂 Estrutura do Projeto

```text
src/
└── app/
    ├── components/
    │   └── PokemonCard.tsx
    │
    ├── screens/
    │   └── PokemonScreen.tsx
    │
    ├── services/
    │   └── api.js
    │
    └── index.tsx

app.js
```

---

# 1️⃣ Configurar API

Arquivo:

```text
src/app/services/api.js
```

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default api;
```

**Função:** Centralizar as requisições para a API.

---

# 2️⃣ Criar Card do Pokémon

Arquivo:

```text
src/app/components/PokemonCard.tsx
```

```tsx
import { Image, Text, View } from "react-native";

export default function PokemonCard({ pokemon }: any) {
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

**Função:** Exibir nome e imagem do Pokémon.

---

# 3️⃣ Criar Tela Principal

Arquivo:

```text
src/app/screens/PokemonScreen.tsx
```

```tsx
const [pokemonName, setPokemonName] = useState("");
const [pokemon, setPokemon] = useState<any>(null);

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
```

Campo de busca:

```tsx
<TextInput
  placeholder="Digite o Pokémon"
  value={pokemonName}
  onChangeText={setPokemonName}
/>
```

Botão:

```tsx
<Button
  title="Buscar Pokémon"
  onPress={buscarPokemon}
/>
```

Exibição:

```tsx
<PokemonCard pokemon={pokemon} />
```

**Função:** Buscar os dados da API e enviar para o componente.

---

# 4️⃣ App.js

Arquivo:

```text
app.js
```

```javascript
import PokemonScreen from "./src/screens/PokemonScreen";

export default function App() {
  return <PokemonScreen />;
}
```

**Função:** Inicializar a aplicação exibindo a tela principal.

---

# 5️⃣ index.tsx (Expo Router)

Arquivo:

```text
src/app/index.tsx
```

```tsx
import { router } from "expo-router";

<Button
  title="Ir para Pokémon"
  onPress={() =>
    router.push("/screens/PokemonScreen")
  }
/>
```

**Função:** Exemplo de navegação utilizando Expo Router.

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
const response = await api.get(
  `/pokemon/${pokemonName.toLowerCase()}`
);
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

## Exibir componente

```tsx
<PokemonCard pokemon={pokemon} />
```

---

# 🔄 Fluxo da Aplicação

```text
Usuário digita o nome
        ↓
Clica em Buscar Pokémon
        ↓
Axios faz GET na PokéAPI
        ↓
Dados retornam da API
        ↓
setPokemon() atualiza o estado
        ↓
PokemonCard recebe os dados
        ↓
Nome e imagem são exibidos
```
