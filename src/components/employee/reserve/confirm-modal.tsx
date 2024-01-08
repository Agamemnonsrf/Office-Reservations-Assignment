
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const ConfirmModal = ({ isShow, setIsShow }: Props) => {
  return (
    <Transition appear show={isShow} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsShow(false)}
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
              <Dialog.Panel className=" w-1/3 transform overflow-hidden rounded-2xl bg-neutral-800  p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Would you like to confirm your reservation?
                </Dialog.Title>

                <div className="flex items-center justify-around mt-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsShow(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className=" px-4 py-2 text-sm font-medium bg-neutral-900"
                    onClick={() => setIsShow(false)}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConfirmModal