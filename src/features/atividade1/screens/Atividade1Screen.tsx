import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Code2 } from 'lucide-react-native';
import { AlertMessage,TabNavigation,Header } from 'react-native-th-components';
import ExerciseOne from './exercises/ExerciseOne';
import ExerciseTwo from './exercises/ExerciseTwo';
import ExerciseThree from './exercises/ExerciseThree';

export default function Atividade1Screen() {
  const [currentExercise, setCurrentExercise] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '', type: 'info' as any });

  const tabs = [
    { id: 1, label: 'Exercício 1' },
    { id: 2, label: 'Exercício 2' },
    { id: 3, label: 'Exercício 3' },
  ];

  const triggerAlert = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setAlertData({ title, message, type });
    setShowAlert(true);
  };

  return (
    <>      
      {showAlert && (
        <AlertMessage 
          title={alertData.title} 
          message={alertData.message}
          type={alertData.type}
          duration={3000} 
          position="bottom" 
          onClose={() => setShowAlert(false)}
        />
      )}

      <View style={styles.container}>         
        <Header 
          title="Prática Mobile" 
          subtitle="Prof. Thiago Goldoni Thomé" 
          icon={Code2} 
          iconColor="#0ea5e9" 
          iconBgColor="#e0f2fe" 
        />

        <TabNavigation 
          tabs={tabs} 
          currentTab={currentExercise} 
          setCurrentTab={setCurrentExercise} 
        />

        <View style={styles.content}>
          <View style={[styles.exerciseContainer, { display: currentExercise === 1 ? 'flex' : 'none' }]}>
            <ExerciseOne onShowAlert={triggerAlert} />
          </View>
          
          <View style={[styles.exerciseContainer, { display: currentExercise === 2 ? 'flex' : 'none' }]}>
            <ExerciseTwo />
          </View>
          
          <View style={[styles.exerciseContainer, { display: currentExercise === 3 ? 'flex' : 'none' }]}>
            <ExerciseThree onShowAlert={triggerAlert} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  exerciseContainer: {
    flex: 1,
  }
});