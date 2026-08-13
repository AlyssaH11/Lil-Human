import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [hunger, setHunger] = useState(75);
const [happiness, setHappiness] = useState(100);
const [energy, setEnergy] = useState(100);
const [hygiene, setHygiene] = useState(100);
useEffect(() => {
  const timer = setInterval(() => {
    setHunger(current => Math.max(current - 2, 0));
    setHappiness(current => Math.max(current - 1, 0));
    setEnergy(current => Math.max(current - 1, 0));
    setHygiene(current => Math.max(current - 1, 0));
  }, 5000);

  return () => clearInterval(timer);
}, []);
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Lil Human</Text>

      <View style={styles.stats}>
        <Text style={styles.stat}>❤️ Happiness: {happiness}</Text>
        <Text style={styles.stat}>🍔 Hunger: {hunger}</Text>
        <Text style={styles.stat}>⚡ Energy: {energy}</Text>
        <Text style={styles.stat}>🧼 Hygiene: {hygiene}</Text>
      </View>
      
      <View style={styles.humanArea}>
        <Text style={styles.human}>🙂</Text>
        <Text>Your human lives here</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => setHunger(Math.min(hunger + 5, 100))}
>
        <Text style={styles.buttonText}>Feed</Text>
        </Pressable>
        <Pressable
           style={styles.button}
           onPress={() => setHappiness(Math.min(happiness + 5, 100))}
>
        <Text style={styles.buttonText}>Play</Text>
        </Pressable>
        <Pressable
           style={styles.button}
           onPress={() => setEnergy(Math.min(energy + 5, 100))}
>
        <Text style={styles.buttonText}>Sleep</Text>
        </Pressable>
        <Pressable
           style={styles.button}
           onPress={() => setHygiene(Math.min(hygiene + 5, 100))}
>
        <Text style={styles.buttonText}>Clean</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 60,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },

  stats: {
    width: '80%',
    marginBottom: 40,
  },

  stat: {
    fontSize: 20,
    marginBottom: 10,
  },

  humanArea: {
    alignItems: 'center',
    marginBottom: 40,
  },

  human: {
    fontSize: 100,
    marginBottom: 10,
  },

  actions: {
  width: '80%',
  gap: 10,
},

button: {
  backgroundColor: '#dddddd',
  padding: 15,
  borderRadius: 10,
},

buttonText: {
  textAlign: 'center',
  fontSize: 18,
},
});