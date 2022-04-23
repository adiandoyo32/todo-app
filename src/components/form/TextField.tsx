import classNames from "classnames";
import React from "react";

interface TextFieldProps {
    id: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const TextField: React.FC<TextFieldProps> = (props) => {
    const disableState = {
        "bg-gray-50": !props.disabled,
        "bg-transparent": props.disabled,
    };

    return (
        <div>
            <input
                id={props.id}
                type={props.type ?? "text"}
                placeholder={props.placeholder ?? "Type something..."}
                className={classNames(
                    `w-full mb-1.5 block p-2.5 text-sm rounded-md focus:outline-none focus:ring-0 transition`,
                    disableState
                )}
                disabled={props.disabled ?? false}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    );
};

export default TextField;
