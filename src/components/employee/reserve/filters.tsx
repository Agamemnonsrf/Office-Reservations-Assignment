import { useState, useContext } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ChipSelector from "./chip-selector";
import { getData } from "../../../mocks/utils";
import { BuildingI } from "../../../interfaces/db-intertface";
import { ReserveContext } from "./reserve-context";

const getBuildingFeatures = () => {
    let features: string[] = [];
    (getData("buildings") as BuildingI[]).forEach((building) => {
        building.features.forEach((feature) => {
            if (!features.includes(feature)) features.push(feature);
        });
    });
    return features;
}

const getRoomFeatures = () => {
    let features: string[] = [];
    (getData("rooms") as BuildingI[]).forEach((room) => {
        room.features.forEach((feature) => {
            if (!features.includes(feature)) features.push(feature);
        });
    });
    return features;
}

const Filters = () => {
    const [selectedBuildingFeatures, setSelectedBuildingFeatures] = useState<string[]>([]);
    const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<string[]>([]);
    const [workspaceNum, setWorkspaceNum] = useState<number>(0);

    const { filters, setFilters } = useContext(ReserveContext);

    const handleApplyFilters = () => {
        setFilters({
            building: selectedBuildingFeatures,
            room: selectedRoomFeatures,
            workspaces: workspaceNum
        })
    }

    return (
        <div className="w-full px-4 pt-4">
            <div className="mx-auto w-full max-w-md bg-neutral-800 rounded-md p-2">
                <Disclosure>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span>
                            <h6>Filters</h6>
                        </span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="16"
                                viewBox="0 0 512 512"
                                fill="white"
                            >
                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <p >
                                        Building Features
                                    </p>
                                    <ChipSelector chips={getBuildingFeatures()} selectedChips={selectedBuildingFeatures} setSelectedChips={setSelectedBuildingFeatures} />
                                </div>
                                <div className="flex flex-col">
                                    <p >
                                        Room Features
                                    </p>
                                    <ChipSelector chips={getRoomFeatures()} selectedChips={selectedRoomFeatures} setSelectedChips={setSelectedRoomFeatures} />
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <p >
                                            Workspace Desktops
                                        </p>
                                        <input
                                            type="number"
                                            id="workspace-desktops"
                                            className="rounded-md p-2 w-20"
                                            min="1"
                                            onChange={(e) => {
                                                setWorkspaceNum(Number(e.target.value));
                                            }}
                                        />
                                    </div>
                                    <button onClick={handleApplyFilters}>
                                        Apply
                                    </button>
                                    <span>
                                        {JSON.stringify(filters)}
                                    </span>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
            </div>
        </div>
    );
};

export default Filters;
