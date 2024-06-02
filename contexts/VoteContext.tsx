'use client'

import {createContext, ReactNode, useContext, useState} from 'react';

type VoteContextType = {
  voteInProgress: boolean;
  setVoteInProgress: (value: boolean) => void;
};

export const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider = ({ children }: { children: ReactNode }) => {
  const [voteInProgress, setVoteInProgress] = useState(false);

  return (
    <VoteContext.Provider value={{ voteInProgress, setVoteInProgress }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = () => {
  const context = useContext(VoteContext);
  if (context === undefined) {
    throw new Error('useVoteContext must be used within a VoteProvider');
  }
  return context;
};