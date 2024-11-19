import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { submitLoanLead } from '../services/api';

export const PersonalLoanScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    occupation: '',
    loanAmount: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await submitLoanLead(formData);
      navigation.navigate('Home');
    } catch (err) {
      setError('Failed to submit loan application');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Loan Application</Text>
      <TextInput
        label="Full Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Address"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        multiline
        style={styles.input}
      />
      <TextInput
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />
      <TextInput
        label="Occupation"
        value={formData.occupation}
        onChangeText={(text) => setFormData({ ...formData, occupation: text })}
        style={styles.input}
      />
      <TextInput
        label="Loan Amount"
        value={formData.loanAmount}
        onChangeText={(text) => setFormData({ ...formData, loanAmount: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit Application
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});