import { type FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import type { TRegistrationForm } from '../model/types';
import { defaultValues } from '../consts/defaultValues';
import { Button, Description, Field, Input, Label } from '@headlessui/react';
import { defaultListInput } from '../consts/defaultListInput';
import cls from './registrationForm.module.css';
import { SchemaRegistrationForm } from '../model/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { formHandler } from 'shared/lib/helpers/formHandler';
import { getMessageFromError } from 'shared/lib/helpers/common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

interface IRegistrationFormProps {
  className?: string;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const { className } = props;

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TRegistrationForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(SchemaRegistrationForm),
  });

  const {
    fields: linksValues,
    append: linkAppend,
    remove: linkRemove,
  } = useFieldArray({ control, name: 'links' });

  const onSubmit = async (formValues: TRegistrationForm) => {
    try {
      await formHandler(formValues);

      toast.success('Form send success');

      navigate('/tasks');
    } catch (error) {
      toast.error(getMessageFromError(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${cls['registration-form']} ${className}`}
    >
      {defaultListInput.map(({ name, title }) => (
        <div className={cls.block} key={name}>
          <Field>
            <Label className={cls.label}>{title}</Label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                // TODO: библиотека принимает только string в value по типизации, однако прекрасно работает с массивом.поэтому приведение к any. это контролируемо
                <Input {...(field as any)} className={cls['input']} />
              )}
            />
            {errors[name] && (
              <Description className={cls.error}>
                {errors[name]?.message}
              </Description>
            )}
          </Field>
        </div>
      ))}
      {linksValues.map((link, index) => (
        <div className={cls.block} key={link.id}>
          <Field>
            <Label className={cls.label}>{`link ${index + 1}`}</Label>
            <Controller
              name={`links.${index}.value`}
              control={control}
              render={({ field }) => (
                <Input {...field} className={cls['input']} />
              )}
            />
            {errors.links?.[index]?.value && (
              <Description className={cls.error}>
                {errors.links?.[index]?.value?.message}
              </Description>
            )}
          </Field>
          <Button onClick={() => linkRemove(index)}>Remove link</Button>
        </div>
      ))}

      <Button
        onClick={() => linkAppend({ value: '' })}
        disabled={Array.isArray(errors.links) && !!errors.links.length}
      >
        Add link
      </Button>
      <Button type='submit' className={cls['button']} disabled={!isValid}>
        Save changes
      </Button>
    </form>
  );
};
