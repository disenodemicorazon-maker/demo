// App.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, Text, Button, FlatList, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart, ProgressChart, PieChart } from 'react-native-chart-kit';

// Diseño: tokens simples (ajustar a tu paleta)
const theme = {
  colors: {
    primary: '#6A5AE0',
    secondary: '#22C55E',
    accent: '#F59E0B',
    bg: '#0F172A',
    card: '#111827',
    text: '#F8FAFC',
    muted: '#9CA3AF',
  },
};

// Mock data
type Workout = { id: string; title: string; durationMin: number; intensity: 'Baja' | 'Media' | 'Alta' };
const mockPlan: Workout[] = [
  { id: 'w1', title: 'Full Body Express', durationMin: 20, intensity: 'Media' },
  { id: 'w2', title: 'Movilidad Reset', durationMin: 10, intensity: 'Baja' },
  { id: 'w3', title: 'HIIT Booster', durationMin: 15, intensity: 'Alta' },
];

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>
          Hola, ¡vamos a transformar!
        </Text>
        <Text style={{ color: theme.colors.muted, marginTop: 4 }}>
          Recomendados para hoy
        </Text>

        {/* Lista de entrenos recomendados */}
        <FlatList
          style={{ marginTop: 16 }}
          data={mockPlan}
          keyExtractor={(w) => w.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                marginBottom: 12,
                borderRadius: 12,
                backgroundColor: theme.colors.card,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text }}>
                {item.title}
              </Text>
              <Text style={{ color: theme.colors.muted }}>
                {item.durationMin} min • Intensidad {item.intensity}
              </Text>
              <View style={{ marginTop: 8 }}>
                <Button
                  title="Empezar"
                  onPress={() => navigation.navigate('RutinaDetalle', { id: item.id, name: item.title })}
                  color={theme.colors.primary}
                />
              </View>
            </View>
          )}
        />

        {/* Gráfico: Progreso semanal (anillo) */}
        <Text style={{ color: theme.colors.text, fontWeight: '600', marginTop: 8 }}>Progreso semanal</Text>
        <ProgressChart
          data={{ data: [0.6] }} // 60% del objetivo semanal
          width={screenWidth}
          height={140}
          strokeWidth={12}
          radius={40}
          chartConfig={{
            backgroundGradientFrom: theme.colors.card,
            backgroundGradientTo: theme.colors.card,
            color: () => theme.colors.secondary,
            labelColor: () => theme.colors.text,
          }}
          hideLegend={true}
          style={{ marginVertical: 12, borderRadius: 12 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function RutinasScreen({ navigation }: any) {
  const screenWidth = Dimensions.get('window').width - 32;
  // Datos de ejemplo: volumen (kg) por sesión de una rutina
  const labels = ['Lun', 'Mié', 'Vie', 'Dom'];
  const data = [4200, 5100, 4800, 5600];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: theme.colors.text }}>Tus rutinas</Text>

        {/* Gráfico de línea simple de volumen de la rutina activa */}
        <Text style={{ color: theme.colors.muted, marginTop: 8 }}>Volumen de la semana (kg)</Text>
        <LineChart
          data={{ labels, datasets: [{ data }] }}
          width={screenWidth}
          height={180}
          yAxisSuffix="kg"
          chartConfig={{
            backgroundGradientFrom: theme.colors.card,
            backgroundGradientTo: theme.colors.card,
            decimalPlaces: 0,
            color: (o) => (o.alpha ? `rgba(106, 90, 224, ${o.alpha})` : theme.colors.primary),
            labelColor: () => theme.colors.text,
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 12 }}
        />

        {/* Botón para crear rutina */}
        <View style={{ marginTop: 8 }}>
          <Button title="Crear nueva rutina" color={theme.colors.accent} onPress={() => navigation.navigate('RutinaCreador')} />
        </View>

        {/* Lista