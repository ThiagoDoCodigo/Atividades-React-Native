import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Code2 } from 'lucide-react-native';
import AlertMessage from '../../components/AlertMessage';
import TabNavigation from '../../components/TabNavigation';
import ExerciseOne from './exercises/ExerciseOne';
import ExerciseTwo from './exercises/ExerciseTwo';
import ExerciseThree from './exercises/ExerciseThree';
import MainLayout from '../../layouts/MainLayout';

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
    <MainLayout>      
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
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 20, marginBottom: 20 }}>
          <View style={{ padding: 12, backgroundColor: '#e0f2fe', borderRadius: 12, marginRight: 12 }}>
            <Code2 size={24} color="#0ea5e9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e293b' }}>Prática Mobile</Text>
            <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Prof. Thiago Goldoni Thomé</Text>
          </View>
        </View>

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
    </MainLayout>
  );
}