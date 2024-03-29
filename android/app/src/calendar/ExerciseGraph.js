

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ExerciseGraph = () => {
  const [exerciseDataOn, setExerciseDataOn] = useState([]);
  const [exerciseDataOff, setExerciseDataOff] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState(0);
  const exerciseData = [...exerciseDataOff, ...exerciseDataOn];
  const uniqueDate = [...new Set(exerciseData.map(item => item.date))];


  // 시간을 분과 초로 분리하여 계산 후, 다시 합치기
  const calculateTotalTime = () => {
    const totalTimeByDate = {};

    // 각 exerciseData 항목을 순회하면서 날짜별 총 운동 시간 계산
    exerciseData.forEach((item) => {
      const { date, time } = item;
      const totalTimeInSeconds = time.split(' ').reduce((acc, part) => {
        const value = parseInt(part) || 0;

        if (part.includes('분')) {
          acc += value * 60;
        } else if (part.includes('초')) {
          acc += value;
        }

        return acc;
      }, 0);

      if (!totalTimeByDate[date]) {
        totalTimeByDate[date] = {
          totalSeconds: totalTimeInSeconds,
          minutes: Math.floor(totalTimeInSeconds / 60),
          seconds: totalTimeInSeconds % 60,
        };
      } else {
        totalTimeByDate[date].totalSeconds += totalTimeInSeconds;
        totalTimeByDate[date].minutes = Math.floor(totalTimeByDate[date].totalSeconds / 60);
        totalTimeByDate[date].seconds = totalTimeByDate[date].totalSeconds % 60;
      }
    });



    return totalTimeByDate;
  };

  const totalTimeByDate = calculateTotalTime();

  useEffect(() => {
  }, [uniqueDate, totalTimeByDate]);




  const loadSavedData = async (key, setter) => {
    try {
      const storedData = await AsyncStorage.getItem(`appData${key}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setter(parsedData);
      }
    } catch (error) {
      console.error('데이터 불러오기 오류', error);
    }
  };
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await loadSavedData('Off', setExerciseDataOff);
      await loadSavedData('On', setExerciseDataOn);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);


  const sortedUniqueDate = uniqueDate.sort((a, b) => new Date(a) - new Date(b));
  const extractionDate = sortedUniqueDate.slice(-7);
  //console.log(extractionDate);

  const data = {
    labels: extractionDate.map((date) => date.substring(5, 10)),
    datasets: [
      {
        data: extractionDate.map((date) => totalTimeByDate[date].minutes),
      },
    ],
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>운동시간 그래프</Text>

      {uniqueDate.length > 0 ? (
        <BarChart
          data={data}
          width={350}
          height={200}
          yAxisSuffix="분"
          fromZero={true}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 0,
            barPercentage: 0.8,
            group: false,
            color: (opacity = 1) => `rgba(0,0, 200, ${opacity})`, // 선 색상
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 색상
          }}
          style={{
            marginVertical: 2,
            borderRadius: 16,
            paddingRight: 50,
          }}
        // withInnerLines={false}
        />
      ) : (<Text style={{ color: 'black', fontSize: 15 }}> 운동기록이 없습니다. </Text>)}

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
  },
  container: {
    padding: 10,
  },
});

export default ExerciseGraph; 