import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Olá</Text>

      <Button
        title="Ir para Pokémon"
        onPress={() => router.push("/screens/PokemonScreen")}
      />
    </View>
  );
}