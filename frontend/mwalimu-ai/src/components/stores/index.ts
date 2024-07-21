import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../../types";

type Actions = {
    updateEmail: (email: string) => void;
    updateId: (id: string) => void;
    clearEmail: () => void;
    clearId: () => void;
    clearUser: () => void;
    setAuth: (value: boolean) => void;
    updateLevel: (level: string) => void;
};

const initialUser: User = {
    email: "",
    id: null,
    level: "Elementary",
    isAuthed: false,
};

type State = {
    user: User;
};

const useStore = create<State & Actions>()(
    immer(
        devtools(
            persist(
                (set) => ({
                    user: initialUser,
                    updateLevel: (level: string) =>
                        set((state) => {
                            state.user.level = level;
                        }),
                    updateEmail: (email) =>
                        set((state) => {
                            state.user.email = email;
                        }),
                    updateId: (id) =>
                        set((state) => {
                            state.user.id = id;
                        }),
                    clearEmail: () =>
                        set((state) => {
                            state.user.email = "";
                        }),
                    clearId: () =>
                        set((state) => {
                            state.user.id = null;
                        }),
                    clearUser: () =>
                        set((state) => {
                            state.user = initialUser;
                        }),
                    setAuth: (value) =>
                        set((state) => {
                            state.user.isAuthed = value;
                        }),
                }),
                {
                    name: "global-storage",
                    storage: createJSONStorage(() => sessionStorage),
                    onRehydrateStorage: (state) => {
                        state.user = initialUser;

                        return (_state, error) => {
                            if (error) {
                                console.error("Error rehydrating state", error);
                            }
                        };
                    },
                },
            ),
        ),
    ),
);

export default useStore;
