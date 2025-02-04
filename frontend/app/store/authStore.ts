import type { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "~/services/axiosInstance";
import type { AuthResponseFrontend } from "~/types/types";

interface AuthState {
  user: AuthResponseFrontend | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,

      signin: async (email, password) => {
        const toastId = { id: "signin" };
        toast.loading("Signing in...", toastId);
        try {
          const response = await axiosInstance.post<AuthResponseFrontend>(
            "/auth/signin",
            {
              email,
              password,
            }
          );
          set({ user: response.data, isAuthenticated: true });
          toast.success("Signed in successfully", toastId);
        } catch (error) {
          const err = error as AxiosError;
          const errorMessage =
            (err.response?.data as { message?: string })?.message ??
            "Invalid email or password";
          toast.error(errorMessage, toastId);
        }
      },

      signup: async (name, email, password) => {
        const toastId = { id: "signup" };
        toast.loading("Signing up...", toastId);
        try {
          const response = await axiosInstance.post<AuthResponseFrontend>(
            "/auth/signup",
            {
              name,
              email,
              password,
            }
          );
          set({ user: response.data, isAuthenticated: true });
          toast.success("Signed up successfully", toastId);
        } catch (error) {
          const err = error as AxiosError;
          const errorMessage =
            (err.response?.data as { message?: string })?.message ??
            "Failed to sign up";
          toast.error(errorMessage, toastId);
        }
      },

      signout: async () => {
        const toastId = { id: "signout" };
        toast.loading("Signing out...", toastId);
        try {
          const response = await axiosInstance.post("/auth/signout");
          if (response.status === 200) {
            set({ user: null, isAuthenticated: false });
            toast.success("Signed out successfully", toastId);
          }
        } catch (error) {
          const err = error as AxiosError;
          const errorMessage =
            (err.response?.data as { message?: string })?.message ??
            "Failed to sign out";
          toast.error(errorMessage, toastId);
        }
      },

      setHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: (state) => {
        return () => state?.setHydrated();
      },
    }
  )
);

export const useUser = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { user, isAuthenticated };
};

export const useSignin = () => {
  return useAuthStore((state) => state.signin);
};

export const useSignup = () => {
  return useAuthStore((state) => state.signup);
};

export const useSignout = () => {
  return useAuthStore((state) => state.signout);
};

export const useIsHydrated = () => {
  return useAuthStore((state) => state._hasHydrated);
};
