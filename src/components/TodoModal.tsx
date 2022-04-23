import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import TodoForm from "./TodoForm";

interface TodoModalProps {
    visible: boolean;
    toggle: () => void;
}

const TodoModal: React.FC<TodoModalProps> = (props) => {
    return (
        <>
            <Transition appear show={props.visible} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={props.toggle}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                        </Transition.Child>

                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <TodoForm toggle={props.toggle} />
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default TodoModal;

export const useModalDialog = () => {
    const [visible, setVisible] = useState(false);
    const toggle = () => setVisible(!visible);

    return { visible, toggle };
};
