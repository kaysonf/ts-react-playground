import React, {ChangeEvent, FC, useState} from "react";

type ParamType =
    | { type: 'string', value?: string, mandatory: boolean }
    | { type: 'json', value?: {}, mandatory: boolean }
    | { type: 'integer', value?: number, mandatory: boolean }


type TypeMap<T> =
    T extends 'string'
        ? string

        : T extends 'integer'
            ? number

            : T extends 'json'
                ? object

                : never;

type Parameter = {
    name: string;
    paramType: ParamType
}

type InputProps = React.ComponentProps<'input'>
type ValidateFn<T> = (data: TypeMap<T>) => string[];
type InputFormProps<T> = InputProps & {
    validate: ValidateFn<T>;
    value: TypeMap<T>;
}

function InputForm<T>(props: InputFormProps<T>) {

    const {validate, value, ...inputProps} = props;

    const message = validate(value);

    return (
        <>
            <input {...inputProps} />
            {message ? <p>{message.join(' ')}</p> : null}
        </>
    );

}

const Form: FC<Parameter & { onChange: (e: ChangeEvent<HTMLInputElement>) => void; }> = (props) => {

    const {name, paramType, onChange} = props;

    function mandatoryFieldIsEmpty<T>(data: T): boolean {
        return paramType.mandatory && !data
    }

    const validateString: ValidateFn<'string'> = (data: string): string[] => {

        const errorMessages: string[] = [];

        if (mandatoryFieldIsEmpty(data)) errorMessages.push('field cannot be empty!');

        if (data && data.includes('a')) errorMessages.push('cannot contain "a"');

        return errorMessages;
    }

    const stringForm = () => {
        if (paramType.type === 'string') {
            const props: InputFormProps<'string'> = {
                value: paramType.value as string, // FIXME: String vs as string
                validate: (data) => validateString(data),
            }

            return (
                <InputForm
                    {...props}

                    type={'text'}

                    onChange={onChange}
                />
            );
        } else
            throw Error('must be string');
    }

    const renderNumberForm = () => {
        if (paramType.type === 'integer') {

            const props: InputFormProps<'integer'> = {
                value: paramType.value as number,
                validate: (data) => {
                    const errorMessages: string[] = [];

                    if (mandatoryFieldIsEmpty(data)) errorMessages.push('field cannot be empty!')

                    if (data && data < 5) errorMessages.push('must be >= 5');

                    return errorMessages;
                }
            }

            return (
                <InputForm
                    {...props}

                    type={'number'}

                    onChange={onChange}
                />
            );
        } else
            throw Error('must be number');
    }

    const renderInput = () => {

        switch (paramType.type) {
            case 'string':
                return stringForm();

            case 'integer':
                return renderNumberForm();

            default:
                return null;
        }

    }

    return (
        <>
            <h5>{name}</h5>

            {renderInput()}

        </>
    )
}

export const FormApp: FC = () => {
    const data: Parameter[] = [
        {name: 'name', paramType: {type: 'string', mandatory: true}},
        {name: 'age', paramType: {type: 'integer', mandatory: false}},
        {name: 'food', paramType: {type: 'string', mandatory: false, value: 'chicken'}}
    ]

    // not k:v to preserve order
    const [formFields, setFormFields] = useState<Parameter[]>(data);

    return (
        <>
            <h5>the parameters:</h5>

            {
                formFields.map(parameter =>

                    <Form  {...parameter}
                           onChange={e => {

                               const _formFields = [...formFields];

                               const indexOfModifiedForm = _formFields.findIndex(f => f.name === parameter.name);

                               const itemToUpdate = {..._formFields[indexOfModifiedForm]};

                               itemToUpdate.paramType.value = e.target.value;

                               _formFields[indexOfModifiedForm] = itemToUpdate;

                               setFormFields(_formFields);

                           }}
                           key={parameter.name}/>
                )
            }
        </>
    )
}
