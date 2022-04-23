import classNames from "classnames";
import React from "react";

interface TextAreaFieldProps {
    id: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
    const disableState = {
        "bg-gray-50": !props.disabled,
        "bg-transparent": props.disabled,
    };

    return (
        <div>
            <textarea
                id={props.id}
                placeholder={props.placeholder ?? "Type something..."}
                className={classNames(
                    `w-full mb-1.5 block p-2.5 text-sm rounded-md focus:outline-none focus:ring-0 transition`,
                    disableState
                )}
                disabled={props.disabled ?? false}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default TextAreaField;
