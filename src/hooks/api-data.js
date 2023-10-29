import { createWithEqualityFn } from 'zustand/traditional'
import { srGetPopularJobs, srGetUserData } from '../sources/dashboard';

export const useUserData = createWithEqualityFn((set, get) => ({
  apiData: {},
  setApiData: data => set({ apiData: data }),
  fetchUserData: async () => {
    get().setApiData({ isLoading: true, userData: null, error: false })
    try {
      const data = await srGetUserData();
      get().setApiData({ isLoading: false, userData: data, error: false })
    } catch (error) {
      get().setApiData({ isLoading: false, userData: null, error: true })
    }
  }
}));

export const useJobList = createWithEqualityFn((set, get) => ({
  apiData: {},
  setApiData: data => set({ apiData: data }),
  fetchJobList: async () => {
    get().setApiData({ isLoading: true, jobs: null, error: false })
    try {
      const data = await srGetPopularJobs();
      get().setApiData({ isLoading: false, jobs: data?.data, error: false })
    } catch (error) {
      get().setApiData({ isLoading: false, jobs: null, error: true })
    }
  }
}));

export const useJobDetails = createWithEqualityFn((set, get) => ({
  jobIndex: 0,
  setJobIndex: data => set({ jobIndex: data })
}))