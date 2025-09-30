import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HermesInfo() {
  // Check if Hermes is enabled
  const isHermesEnabled = () => {
    return typeof (globalThis as any).HermesInternal !== 'undefined';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Engine Info</Text>
      <Text style={styles.info}>
        {isHermesEnabled() 
          ? '✅ Hermes is enabled'
          : '❌ Hermes is not enabled'}
      </Text>
      <Text style={styles.version}>
        {isHermesEnabled() && typeof (globalThis as any).HermesInternal === 'object' && (globalThis as any).HermesInternal !== null && ((globalThis as any).HermesInternal as any).getRuntimeProperties
          ? `Version: ${JSON.stringify(((globalThis as any).HermesInternal as any).getRuntimeProperties())}` 
          : 'Using JavaScript Core'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#eef2ff',
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  info: {
    fontSize: 13,
    color: '#374151',
  },
  version: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
  },
});