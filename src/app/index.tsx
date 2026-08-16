// ====================
// IMPORTS
// ====================

import { useEffect, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Polygon } from 'react-native-svg';

// ====================
// CIRCULAR METER COMPONENT
// ====================

function CircularMeter({ value, icon }) {
  const size = 60;
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const meterColor =
    value > 60
      ? 'green'
      : value > 30
      ? 'gold'
      : 'red';

  return (
    <View style={styles.circularMeter}>
      <Svg width={size} height={size}>
        <Circle
          cx="30"
          cy="30"
          r="28"
          fill="#dddddd"
        />

        <Circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={meterColor}
          strokeWidth="30"
          strokeDasharray={`${circumference * (value / 100)} ${circumference}`}
          transform="rotate(-90 30 30)"
/>
        />
      </Svg>

      <Text style={styles.meterIcon}>{icon}</Text>
    </View>
  );
}

// ====================
// LIL HUMAN GAME
// ====================

export default function HomeScreen() {

// --------------------
// GAME STATS
// --------------------

const [hunger, setHunger] = useState(75);
const [happiness, setHappiness] = useState(100);
const [energy, setEnergy] = useState(100);
const [hygiene, setHygiene] = useState(100);

// --------------------
// CURRENT ROOM
// --------------------

const [currentRoom, setCurrentRoom] = useState('living');

// --------------------
// REACTIONS
// --------------------

const [reaction, setReaction] = useState('');
const [reactionFace, setReactionFace] = useState('');
const humanX = useState(new Animated.Value(0))[0];
const humanY = useState(new Animated.Value(0))[0];
const showReaction = (message, face) => {
  setReaction(message);
  setReactionFace(face);

  setTimeout(() => {
    setReaction('');
    setReactionFace('');
  }, 5000);
};


// --------------------
// STAT DECAY
// --------------------

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
      <View
  style={[
    styles.container,
    currentRoom === 'bathroom' && styles.bathroomContainer,
  ]}
>
        <Text style={styles.title}>Lil Human</Text>
        <View style={styles.floor} />
        <View style={styles.baseboard} />
       
        <View style={styles.window}>
  <View style={styles.windowPane} />
  <View style={styles.windowPane} />
  <View style={styles.windowPane} />
  <View style={styles.windowPane} />
</View>

<View style={styles.rug} />

{currentRoom === 'living' && (
  <View style={styles.fridge}>
    <View style={styles.fridgeDivider} />
    <View style={styles.fridgeHandleTop} />
    <View style={styles.fridgeHandleBottom} />
  </View>
)}

{currentRoom === 'living' && (
<View style={styles.counter}>
  <View style={styles.counterTop} />
  <View style={styles.sink} />
  
  <View style={styles.stove}>
  <View style={styles.burner} />
  <View style={styles.burner} />

</View>
  <View style={styles.cabinetDoorLeft} />
  <View style={styles.cabinetDoorRight} />
</View>
)}

<Svg
  style={styles.bed}
  width={360}
  height={330}
  viewBox="0 0 300 330"
>
  {/* Mattress */}
  <Polygon
    points="65,30 235,30 285,300 15,300"
    fill="#ffffff"
    stroke="#4a4a4a"
    strokeWidth="6"
  />

  {/* Headboard */}
  <Polygon
    points="55,10 245,10 238,55 62,55"
    fill="#6C3FA0"
    stroke="#4a4a4a"
    strokeWidth="6"
  />

  {/* Pillow */}
  <Polygon
    points="85,65 215,65 225,125 75,125"
    fill="#2878c7"
  />

  {/* Blanket */}
  <Polygon
    points="70,145 230,145 270,285 30,285"
    fill="#2878c7"
  />
</Svg>

      <View style={styles.stats}>
  <CircularMeter value={happiness} icon="❤️" />
  <CircularMeter value={hunger} icon="🍔" />
  <CircularMeter value={energy} icon="⚡" />
  <CircularMeter value={hygiene} icon="🧼" />
</View>
      
<Animated.View
  style={[
    styles.humanArea,
    {
      transform: [
        { translateX: humanX },
        { translateY: humanY },
      ],
    },
  ]}
>
     

<Image
  source={require('../../assets/characters/lil-human.png')}
  style={styles.humanImage}
  resizeMode="contain"
/>

<Text style={styles.statusText}>
              {hunger <= 20
              ? "I'm starving! Feed me!"
              : energy <= 20
              ? "I'm exhausted..."
              : hygiene <= 20
              ? "I desperately need a shower."
              : happiness <= 20
              ? "I'm bored. Entertain me!"
              : hunger <= 50
              ? "I could eat."
              : energy <= 50
              ? "I could use a nap."
              : hygiene <= 50
              ? "I'm getting kinda gross."
              : happiness <= 50
              ? "I'm bored..."
              : "I'm doing great!"}
          </Text>
          {reaction !== '' && <Text>{reaction}</Text>}
          </Animated.View>

{/* ====================
    ACTION BUTTONS
==================== */}

          <View style={styles.actions}>
           <Pressable
             style={styles.button}
             onPress={() => {
  setHunger(Math.min(hunger + 5, 100));

  Animated.timing(humanX, {
    toValue: 650,
    duration: 1000,
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      Animated.timing(humanX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  });

  showReaction('Yesss. Food. 🍕', '😋');
}}
>
          <Text style={styles.buttonText}>🍕 Feed</Text>
           </Pressable>
           <Pressable
            style={styles.button}
            onPress={() => {
  setHappiness(Math.min(happiness + 5, 100));

  Animated.timing(humanY, {
    toValue: 90,
    duration: 700,
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      Animated.timing(humanY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 2000);
  });

  showReaction('Okayyy, that was actually fun. 😂', '😄');
}}
>
           <Text style={styles.buttonText}>🎮 Play</Text>
           </Pressable>
           <Pressable
              style={styles.button}
             onPress={() => {
  setEnergy(Math.min(energy + 5, 100));

  Animated.timing(humanX, {
    toValue: -650,
    duration: 1000,
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      Animated.timing(humanX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  });

  showReaction('Do not disturb. 😴', '😴');
}}
>
          <Text style={styles.buttonText}>🛏️ Sleep</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
  setCurrentRoom('bathroom');
}}
>
          <Text style={styles.buttonText}>🛁 Clean</Text>
            </Pressable>
          </View>
          </View>
  );
}

// ====================
// STYLES
// ====================

const styles = StyleSheet.create({
container: {
  flex: 1,
  width: '100%',
  minHeight: '100%',
  backgroundColor: '#f7e9dc',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',
},

bathroomContainer: {
  backgroundColor: '#d9f0f2',
},

floor: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '35%',
  backgroundColor: '#d7b899',
},

baseboard: {
  position: 'absolute',
  bottom: '35%',
  left: 0,
  right: 0,
  height: 8,
  backgroundColor: '#c9a27f',
},

window: {
  position: 'absolute',
  top: 110,
  right: 35,
  width: 130,
  height: 100,
  backgroundColor: '#ffffff',
  borderWidth: 6,
  borderColor: '#c9a27f',
  flexDirection: 'row',
  flexWrap: 'wrap',
},

windowPane: {
  width: '50%',
  height: '50%',
  backgroundColor: '#bfe8ff',
  borderWidth: 2,
  borderColor: '#ffffff',
},

rug: {
  position: 'absolute',
  bottom: 65,
  width: 620,
  height: 190,
  backgroundColor: '#6C3FA0',
  borderRadius: 95,
},

fridge: {
  position: 'absolute',
  bottom: '35%',
  right: 55,
  width: 200,
  height: 330,
  backgroundColor: '#2F9E9E',
  borderWidth: 5,
  borderColor: '#4a4a4a',
  borderRadius: 18,
},

fridgeDivider: {
  position: 'absolute',
  top: 85,
  left: 0,
  right: 0,
  height: 5,
  backgroundColor: '#4a4a4a',
},

fridgeHandleTop: {
  position: 'absolute',
  top: 30,
  right: 15,
  width: 8,
  height: 35,
  backgroundColor: '#4a4a4a',
  borderRadius: 4,
},

fridgeHandleBottom: {
  position: 'absolute',
  top: 110,
  right: 15,
  width: 8,
  height: 65,
  backgroundColor: '#4a4a4a',
  borderRadius: 4,
},

counter: {
  position: 'absolute',
  bottom: '35%',
  right: 255,
  width: 230,
  height: 145,
  backgroundColor: '#F2C94C',
  borderWidth: 5,
  borderColor: '#4a4a4a',
  borderRadius: 10,
},

counterTop: {
  position: 'absolute',
  top: -10,
  left: -5,
  width: 230,
  height: 18,
  backgroundColor: '#4a4a4a',
  borderRadius: 8,
},

sink: {
  position: 'absolute',
  top: -10,
  left: 115,
  width: 90,
  height: 18,
  backgroundColor: '#d9eef2',
  borderWidth: 3,
  borderColor: '#4a4a4a',
  borderRadius: 9,
  zIndex: 2,
},

stove: {
  position: 'absolute',
  top: -8,
  left: 30,
  width: 55,
  height: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 2,
},

burner: {
  width: 16,
  height: 16,
  backgroundColor: '#222222',
  borderRadius: 8,
},

faucet: {
  position: 'absolute',
  top: -18,
  left: 110,
  width: 10,
  height: 22,
  backgroundColor: '#4a4a4a',
  borderRadius: 5,
},

cabinetDoorLeft: {
  position: 'absolute',
  bottom: 8,
  left: 10,
  width: 95,
  height: 110,
  borderWidth: 3,
  borderColor: '#4a4a4a',
  borderRadius: 8,
},

cabinetDoorRight: {
  position: 'absolute',
  bottom: 8,
  right: 10,
  width: 95,
  height: 110,
  borderWidth: 3,
  borderColor: '#4a4a4a',
  borderRadius: 8,
},

bed: {
  position: 'absolute',
  bottom: 105,
  left: 35,
},

pillow: {
  position: 'absolute',
  top: 20,
  left: 40,
  width: 170,
  height: 65,
  backgroundColor: '#2878c7',
  borderRadius: 20,
  zIndex: 2,
},

blanket: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 175,
  backgroundColor: '#2878c7',
},

 title: {
  fontSize: 32,
  fontWeight: 'bold',
  color: 'black',
  marginTop: 20,
  marginBottom: 10,
  zIndex: 10,
},

 stats: {
  position: 'absolute',
  top: 70,
  left: 12,
  gap: 8,
  zIndex: 10,
},

  stat: {
    fontSize: 20,
    marginBottom: 10,
  },

  humanArea: {
  alignItems: 'center',
  marginTop: 90,
  marginBottom: 40,
},

  human: {
    fontSize: 100,
    marginBottom: 10,
  },

 humanImage: {
  width: 420,
  height: 600,
  marginTop: -25,
},

statusText: {
  fontSize: 16,
  fontWeight: '600',
  backgroundColor: '#ffffff',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 18,
  marginTop: -2,
},

 actions: {
  position: 'absolute',
  bottom: 20,
  left: 15,
  right: 15,
  flexDirection: 'row',
  gap: 8,
},

button: {
  flex: 1,
  height: 65,
  borderRadius: 20,
  backgroundColor: '#dddddd',
  alignItems: 'center',
  justifyContent: 'center',
},

buttonText: {
  textAlign: 'center',
  fontSize: 16,
  fontWeight: '600',
},


statRow: {
  marginBottom: 12,
},

barBackground: {
  width: '100%',
  height: 14,
  backgroundColor: '#dddddd',
  borderRadius: 7,
  overflow: 'hidden',
  marginTop: 5,
},

barFill: {
  height: '100%',
  backgroundColor: '#888888',
},

circularMeter: {
  width: 60,
  height: 60,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},

meterIcon: {
  position: 'absolute',
  fontSize: 22,
},
});