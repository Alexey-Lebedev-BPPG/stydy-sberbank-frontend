import { useState } from 'react';

interface ConfirmDialogOptions {
  title: string;
  description: string;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({
    title: '',
    description: '',
  });
  const [resolvePromise, setResolvePromise] =
    useState<(value: boolean) => void>();

  const showConfirmDialog = (
    dialogOptions: ConfirmDialogOptions,
  ): Promise<boolean> => {
    setOptions(dialogOptions);
    setIsOpen(true);

    return new Promise<boolean>(resolve => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolvePromise?.(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolvePromise?.(false);
  };

  return {
    isOpen,
    options,
    showConfirmDialog,
    handleConfirm,
    handleCancel,
  };
};
