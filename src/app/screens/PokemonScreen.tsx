import { useState } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
} from "react-native";

import PokemonCard from "../components/PokemonCard";
import api from "../services/api";

export default function PokemonScreen() {
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
          response.data.sprites.other["official-artwork"].front_default,
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