import React from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export enum DynamicIslandState {
  IDLE = 'IDLE',
  EXPANDED = 'EXPANDED',
  CHARGING = 'CHARGING',
  MUSIC = 'MUSIC',
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}