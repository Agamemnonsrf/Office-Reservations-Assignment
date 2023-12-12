import { createContext } from "react";
interface ReserveContextI {
    setWorkspaceNum: (num: number) => void;
    workspaceNum: number | undefined;
    hasSetWorkspaceNum: boolean;
    // Include other properties as needed
}

export const ReserveContext = createContext<ReserveContextI>(
    {} as ReserveContextI
);
