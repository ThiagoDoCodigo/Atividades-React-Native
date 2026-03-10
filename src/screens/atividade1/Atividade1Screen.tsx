import { useState } from 'react';
import { View } from 'react-native';
import { Code2 } from 'lucide-react-native';
import AlertMessage from '../../components/AlertMessage';
import TabNavigation from '../../components/TabNavigation';
import ExerciseOne from './exercises/ExerciseOne';
import ExerciseTwo from './exercises/ExerciseTwo';
import ExerciseThree from './exercises/ExerciseThree';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';

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

      <View style={{ flex: 1}}>         
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

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, display: currentExercise === 1 ? 'flex' : 'none' }}>
            <ExerciseOne onShowAlert={triggerAlert} />
          </View>
          
          <View style={{ flex: 1, display: currentExercise === 2 ? 'flex' : 'none' }}>
            <ExerciseTwo />
          </View>
          
          <View style={{ flex: 1, display: currentExercise === 3 ? 'flex' : 'none' }}>
            <ExerciseThree onShowAlert={triggerAlert} />
          </View>
        </View>
      </View>
    </>
  );
}