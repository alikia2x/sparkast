import { createContext } from 'react';

export const SettingsContext = createContext(<settings>{
    bgBlur: true
});
export const SettingsDispatchContext = createContext(null);
