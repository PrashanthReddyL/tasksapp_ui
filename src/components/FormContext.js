import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    when: '',
    description: '',
    price: '',
    location: '',
    estimatedDuration: '',
  });

  const clearFormData = () => {
    setFormData({
      taskName: '',
      when: '',
      description: '',
      price: '',
      location: '',
      estimatedDuration: '',
    });
  };

  return <FormContext.Provider value={{ formData, setFormData, clearFormData }}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);
