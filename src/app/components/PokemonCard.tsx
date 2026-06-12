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