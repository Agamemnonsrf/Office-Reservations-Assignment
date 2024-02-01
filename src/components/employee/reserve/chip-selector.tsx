import { Dispatch } from "react";
import { Disclosure, Transition } from "@headlessui/react";

type props = {
    chips: string[];
    selectedChips: string[];
    setSelectedChips: Dispatch<React.SetStateAction<string[]>>;
};

const ChipSelector = ({ chips, selectedChips, setSelectedChips }: props) => {
    const handleClickChip = (chip: string) => {
        if (selectedChips.includes(chip)) {
            setSelectedChips((prev) =>
                prev.filter((selectedChip) => selectedChip !== chip)
            );
        } else {
            setSelectedChips((prev) => [...prev, chip]);
        }
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-md bg-neutral-700 p-2">
            <Disclosure>
                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    {selectedChips.length === 0 ? (
                        <span>None Selected</span>
                    ) : (
                        <span>{selectedChips.length} selected</span>
                    )}
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
                        <div className="flex gap-1 flex-wrap">
                            {chips.map((chip) => (
                                <button
                                    onClick={() => handleClickChip(chip)}
                                    className={`relative flex items-center justify-between cursor-pointer select-none box-border rounded-md p-1 pr-5 m1  ${
                                        selectedChips.includes(chip)
                                            ? "bg-neutral-800 text-white"
                                            : "bg-white text-neutral-900"
                                    }`}
                                >
                                    <span>{chip}</span>
                                    {selectedChips.includes(chip) && (
                                        <span className="absolute right-1">
                                            &times;
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </Transition>
            </Disclosure>
        </div>
    );
};

export default ChipSelector;
