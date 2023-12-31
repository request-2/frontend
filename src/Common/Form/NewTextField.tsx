import React from 'react';
import c from 'classnames';
import { useFormContext, Validate } from 'react-hook-form';

import { ResultWidget } from '../../Request/Operator/ResultComponent';
import {
  ErrorMessage,
  Question,
  QuestionProps,
  reqRule,
  useFieldContext,
  FieldProps,
  InputProps,
  Description,
  Answer,
  QA,
} from './Question';

export function ShortText({
  id,
  q,
  optional = false,
  description,
  errorMsg = 'This field is required',
  validate,
}: QuestionProps & { validate?: Validate<string,unknown> | Record<string, Validate<string,unknown>> | undefined }): JSX.Element {
  const required = !optional && errorMsg;
  const { state, values } = useFieldContext();
  if (state === 'edit') {
    return (
      <ShortTextField
        name={id}
        question={q}
        required={required}
        defaultValue={values[id] ?? null}
        description={description}
        validate={validate}
      />
    );
  }

  if (state === 'print') {
    return (
      <QA>
        <Question required={required} showIcons={false}>
          {q}
        </Question>
        {values[id] && values[id].length > 0 ? (
          <p className="text-xs text-gray-800">{values[id]}</p>
        ) : (
          <p className="text-xs text-gray-400">[no value given]</p>
        )}
      </QA>
    );
  }

  return (
    <QA>
      <Question required={required} showIcons={false}>
        {q}
      </Question>
      <Answer>
        {values[id] && values[id].length > 0 ? (
          <p className="text-sm text-gray-800">{values[id]}</p>
        ) : (
          <p className="text-sm text-gray-400">[no value given]</p>
        )}
      </Answer>
    </QA>
  );
}

function ShortTextField({
  name,
  question,
  required = false,
  defaultValue,
  description,
  validate,
}: FieldProps & {
  defaultValue: string;
  validate: Validate<string,unknown> | Record<string, Validate<string,unknown>> | undefined;
}) {
  const { register, formState:{errors} } = useFormContext();

  return (
    <div>
      <Question required={required}>{question}</Question>
      <ShortTextInput
        errors={errors}
        {...register(name, { ...reqRule(required), validate })}
        defaultValue={defaultValue}
      />
      <Description>{description}</Description>
    </div>
  );
}

export function ShortTextInput({
  name,
  errors,
  className,
  ...props
}: InputProps<'input'>): JSX.Element {
  const err = errors && name && errors[name]?.message;
  return (
    <div>
      <input
        name={name}
        className={c(
          className,
          'border',
          baseClasses,
          err && errorClasses,
          !props.disabled && !err && normalClasses
        )}
        {...props}
      />
      <ErrorMessage error={err} />
    </div>
  );
}

export function LongText({
  id,
  q,
  optional = false,
  errorMsg = 'This field is required',
  description,
}: QuestionProps): JSX.Element {
  const required = !optional && errorMsg;
  const { state, values } = useFieldContext();
  if (state === 'edit') {
    return (
      <LongTextField
        name={id}
        question={q}
        required={required}
        defaultValue={values[id] ?? null}
        description={description}
      />
    );
  }

  if (state === 'print') {
    return (
      <QA>
        <Question required={required} showIcons={false}>
          {q}
        </Question>
        {values[id] && values[id].length > 0 ? (
          <p className="text-xs text-gray-800">{values[id]}</p>
        ) : (
          <p className="text-xs text-gray-400">[no value given]</p>
        )}
      </QA>
    );
  }

  return (
    <QA>
      <Question required={required} showIcons={false}>
        {q}
      </Question>
      <Answer>
        {values[id] && values[id].length > 0 ? (
          <p className="text-sm text-gray-800">{values[id]}</p>
        ) : (
          <p className="text-sm text-gray-400">[no value given]</p>
        )}
      </Answer>
    </QA>
  );
}

function LongTextField({
  name,
  question,
  required = false,
  defaultValue,
  description,
}: FieldProps & { defaultValue: string }) {
  const { register, formState:{errors} } = useFormContext();
  return (
    <div>
      <Question required={required}>{question}</Question>
      <LongTextInput
        errors={errors}
        {...register(name, reqRule(required))}
        defaultValue={defaultValue}
      />
      <Description>{description}</Description>
    </div>
  );
}

export function LongTextInput({
  name,
  className,
  style,
  errors,
  ...props
}: InputProps<'textarea'>): JSX.Element {
  const err = errors && name && errors[name]?.message;

  return (
    <div className="h-full">
      <textarea
        name={name}
        className={c(
          className,
          baseClasses,
          err && errorClasses,
          !props.disabled && !err && normalClasses
        )}
        {...props}
        style={{ ...style, minHeight: '7rem' }}
      />
      <ErrorMessage error={err} />
    </div>
  );
}

export function Number({
  id,
  q,
  optional = false,
  errorMsg = 'You have to enter a number',
}: QuestionProps): JSX.Element {
  const required = !optional && errorMsg;
  const { state, values } = useFieldContext();
  if (state === 'edit') {
    return (
      <NumberField name={id} question={q} required={required} defaultValue={values[id] ?? null} />
    );
  }

  if (state === 'print') {
    return (
      <QA>
        <Question required={required} showIcons={false}>
          {q}
        </Question>
        {values[id] && values[id].length > 0 ? (
          <p className="text-xs text-gray-800">{values[id]}</p>
        ) : (
          <p className="text-xs text-gray-400">[no value given]</p>
        )}
      </QA>
    );
  }

  return (
    <QA>
      <Question required={required} showIcons={false}>
        {q}
      </Question>
      <Answer>
        {values[id] && values[id].length > 0 ? (
          <p className="text-sm text-gray-800">{values[id]}</p>
        ) : (
          <p className="text-sm text-gray-400">[no value given]</p>
        )}
      </Answer>
    </QA>
  );
}

function NumberField({
  name,
  question,
  required = false,
  defaultValue,
}: FieldProps & { defaultValue: string }) {
  const { register, formState:{errors} } = useFormContext();

  return (
    <div>
      <Question required={required} number>
        {question}
      </Question>
      <NumberInput
        errors={errors}
        {...register(name,{ ...reqRule(required) })}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export function NumberInput({
  name,
  errors,
  className,
  ...props
}: InputProps<'input'>): JSX.Element {
  return (
    <ShortTextInput
      name={name}
      errors={errors}
      className={className}
      type="number"
      step="any"
      {...props}
    />
  );
}

export const baseClasses = [
  'border',
  'w-full',
  'shadow-sm',
  'text-sm',
  'text-gray-900',
  'rounded-md',
  'py-2',
  'px-3',
  'font-normal',
  'disabled:text-gray-400 disabled:bg-gray-100 disabled:shadow-none',
  'transition-colors',
];

export const normalClasses = [
  'border-gray-300',
  'hover:border-gray-400',
  'focus:border-blue-400',
  'focus:outline-none',
  'focus:ring-4',
  'focus:ring-opacity-50',
  'focus:ring-blue-300',
];

export const errorClasses = [
  'border-red-300',
  'hover:border-red-400',
  'focus:border-red-400',
  'focus:outline-none',
  'focus:ring-4',
  'focus:ring-opacity-50',
  'focus:ring-red-300',
];
