import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTodo, deleteTodo, editTodo, FormState, selectTodo, setFormState } from "../redux/todo-slice";
import DeleteIcon from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import TextAreaField from "./form/TextAreaField";
import TextField from "./form/TextField";
import useTodoFormViewModel from "./TodoFormViewModel";
import TodoStatusBadge from "./TodoStatusBadge";

interface TodoFormProps {
    toggle: () => void;
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
    const todoState = useAppSelector(selectTodo);
    const dispatch = useAppDispatch();
    const { initialValues, schema } = useTodoFormViewModel();

    const isCreateOrEdit = (state: FormState): boolean => {
        if (state === FormState.CREATE || state === FormState.EDIT) {
            return true;
        }
        return false;
    };

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (values, _) => {
            if (todoState.formState === FormState.CREATE) {
                dispatch(addTodo(values));
            }
            if (todoState.formState === FormState.EDIT) {
                dispatch(
                    editTodo({
                        id: todoState.todo.id,
                        createdAt: todoState.todo.createdAt,
                        ...values,
                    })
                );
            }
            props.toggle();
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    <div className="mb-4">
                        <span className="mr-2"> {todoState.formState} TO DO</span>
                    </div>
                    <label htmlFor="title" className="inline-block mb-1.5 text-base font-medium">
                        Title
                    </label>
                    <TextField
                        id="title"
                        placeholder="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        disabled={!isCreateOrEdit(todoState.formState)}
                    />
                    {formik.errors.title && formik.touched.title && (
                        <p className="text-red-600 text-sm">{formik.errors.title}</p>
                    )}
                </Dialog.Title>
                <div className="mt-2">
                    <label htmlFor="description" className="inline-block mb-1.5 text-base font-medium">
                        Description
                    </label>
                    <TextAreaField
                        id="description"
                        placeholder="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        disabled={!isCreateOrEdit(todoState.formState)}
                    />
                </div>

                {isCreateOrEdit(todoState.formState) ? (
                    <label className="inline-flex items-center mt-2">
                        <input
                            id="status"
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-red-600"
                            onChange={(e) => {
                                formik.setFieldValue("status", e.target.checked ? 1 : 0);
                            }}
                            value={formik.values.status}
                            defaultChecked={formik.values.status === 1 ? true : false}
                        />
                        <span className="ml-2 text-gray-700">Completed</span>
                    </label>
                ) : (
                    <TodoStatusBadge status={formik.values.status} />
                )}

                <div className="flex justify-end space-x-4 mt-10">
                    {isCreateOrEdit(todoState.formState) ? (
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                            Save
                        </button>
                    ) : null}
                </div>
            </form>
            
            {!isCreateOrEdit(todoState.formState) ? (
                <div className="flex justify-end space-x-4 mt-10">
                    {todoState.todo.status == 0 ? (
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => {
                                props.toggle();
                                dispatch(deleteTodo(todoState.todo.id));
                            }}
                        >
                            <DeleteIcon />
                            Delete
                        </button>
                    ) : null}
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                            dispatch(setFormState(FormState.EDIT));
                        }}
                    >
                        <EditIcon />
                        Edit
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default TodoForm;
