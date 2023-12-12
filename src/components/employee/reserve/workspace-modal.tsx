import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { RoomI, WorkspaceI } from "../../../interfaces/db-intertface";
import { ReserveContext } from "./reserve-context";

interface WorkspaceModalI {
    room: RoomI;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const WorkspaceModal = ({ room, isOpen, setIsOpen }: WorkspaceModalI) => {
    const [selectedWorkspaces, setSelectedWorkspaces] = useState<WorkspaceI[]>(
        []
    );
    const [maxWorkspaces, setMaxWorkspaces] = useState(false);
    const { setWorkspaceNum, workspaceNum, hasSetWorkspaceNum } =
        useContext(ReserveContext);

    const handleClickWorkspace = (workspace: WorkspaceI) => {
        const isWorkspaceSelected = selectedWorkspaces.includes(workspace);

        if (hasSetWorkspaceNum) {
            if (isWorkspaceSelected) {
                setSelectedWorkspaces((prev) =>
                    prev.filter((item) => item !== workspace)
                );
                maxWorkspaces && setMaxWorkspaces(false);
            } else {
                if (selectedWorkspaces.length === workspaceNum) {
                    setMaxWorkspaces(true);
                } else {
                    setSelectedWorkspaces((prev) => [...prev, workspace]);
                }
            }
        } else {
            let offset = 0;
            if (isWorkspaceSelected) {
                setSelectedWorkspaces((prev) =>
                    prev.filter((item) => item !== workspace)
                );
                offset--;
            } else {
                setSelectedWorkspaces((prev) => [...prev, workspace]);
                offset++;
            }
            setWorkspaceNum(selectedWorkspaces.length + offset);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className=" w-1/2 transform overflow-hidden rounded-2xl bg-neutral-800  p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6"
                                >
                                    {room.name}: Select a Workspace
                                </Dialog.Title>
                                {hasSetWorkspaceNum && (
                                    <p>
                                        {selectedWorkspaces.length}/
                                        {workspaceNum}
                                    </p>
                                )}
                                <div className="mt-2 flex flex-wrap w-7/12">
                                    {room.workspaces.map((workspace) => {
                                        const isSelected =
                                            selectedWorkspaces.includes(
                                                workspace
                                            );

                                        return (
                                            <button
                                                onClick={() =>
                                                    handleClickWorkspace(
                                                        workspace
                                                    )
                                                }
                                                className={`${
                                                    isSelected &&
                                                    "border-blue-500"
                                                } bg-neutral-900 pl-6 py-2 m-2 border-2 rounded-md flex flex-col justify-center w-fit focus:outline-none`}
                                            >
                                                <div className="flex justify-between items-baseline w-full">
                                                    <p>{workspace.name}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex items-baseline bg-neutral-700 rounded-md px-1 self-end">
                                                        <h6>
                                                            {workspace.desktops}
                                                        </h6>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="13"
                                                            width="14"
                                                            viewBox="0 0 576 512"
                                                            fill="white"
                                                            className="ml-2"
                                                        >
                                                            <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default WorkspaceModal;
