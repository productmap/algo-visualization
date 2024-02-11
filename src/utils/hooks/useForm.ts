import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export function useForm<T>(inputValues: T): {
  formValues: T;
  setValues: Dispatch<SetStateAction<T>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
} {
  const [formValues, setValues] = useState<T>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...formValues, [name]: value });
  };
  return { formValues, setValues, handleChange };
}