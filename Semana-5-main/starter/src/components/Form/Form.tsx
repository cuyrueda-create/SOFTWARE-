// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: components/Form/Form.tsx
// ============================================

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FormEvent,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { useConfig } from '../../contexts/ConfigContext';

// ============================================
// CONTEXT INTERNO
// ============================================

interface FormContextValue {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (name: string, value: string) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string) => void;
  isSubmitting: boolean;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form');
  }
  return context;
};

// ============================================
// FIELD CONTEXT
// ============================================

interface FieldContextValue {
  name: string;
}

const FieldContext = createContext<FieldContextValue | undefined>(undefined);

const useFieldContext = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error('Field components must be used within a Form.Field');
  }
  return context;
};

// ============================================
// FORM ROOT
// ============================================

interface FormRootProps {
  children: ReactNode;
  onSubmit: (values: Record<string, string>) => void | Promise<void>;
  initialValues?: Record<string, string>;
  className?: string;
}

const FormRoot: React.FC<FormRootProps> = ({
  children,
  onSubmit,
  initialValues = {},
  className = '',
}) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { config } = useConfig();

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const setError = (name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const setTouched = (name: string) => {
    setTouchedState((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const densityClasses = {
    compact: 'form-compact',
    normal: 'form-normal',
    spacious: 'form-spacious',
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        touched,
        setValue,
        setError,
        setTouched,
        isSubmitting,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className={`form ${densityClasses[config.density]} ${className}`}
        data-theme={config.theme === 'system' ? undefined : config.theme}
        data-font-size={config.fontSize}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

// ============================================
// FORM FIELD
// ============================================

interface FormFieldProps {
  children: ReactNode;
  name: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ children, name, className = '' }) => {
  return (
    <FieldContext.Provider value={{ name }}>
      <div className={`form-field ${className}`}>
        {children}
      </div>
    </FieldContext.Provider>
  );
};

// ============================================
// FORM LABEL
// ============================================

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({ 
  children, 
  required = false,
  className = '',
  ...props 
}) => {
  const { name } = useFieldContext();
  const { config } = useConfig();

  return (
    <label
      htmlFor={name}
      className={`form-label ${className}`}
      data-font-size={config.fontSize}
      {...props}
    >
      {children}
      {required && <span className="form-required">*</span>}
    </label>
  );
};

// ============================================
// FORM INPUT
// ============================================

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  // name viene del FieldContext
}

const FormInput: React.FC<FormInputProps> = ({ className = '', onBlur, ...props }) => {
  const { name } = useFieldContext();
  const { values, setValue, errors, touched, setTouched } = useFormContext();
  const { config } = useConfig();

  const hasError = touched[name] && errors[name];

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(name);
    onBlur?.(e);
  };

  return (
    <input
      id={name}
      name={name}
      value={values[name] || ''}
      onChange={(e) => setValue(name, e.target.value)}
      onBlur={handleBlur}
      className={`form-input ${hasError ? 'form-input-error' : ''} ${className}`}
      data-theme={config.theme === 'system' ? undefined : config.theme}
      data-font-size={config.fontSize}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${name}-error` : undefined}
      {...props}
    />
  );
};

// ============================================
// FORM SELECT
// ============================================

interface FormSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'name'> {
  options: Array<{ value: string; label: string }>;
}

const FormSelect: React.FC<FormSelectProps> = ({ 
  options, 
  className = '', 
  onBlur,
  ...props 
}) => {
  const { name } = useFieldContext();
  const { values, setValue, errors, touched, setTouched } = useFormContext();
  const { config } = useConfig();

  const hasError = touched[name] && errors[name];

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setTouched(name);
    onBlur?.(e);
  };

  return (
    <select
      id={name}
      name={name}
      value={values[name] || ''}
      onChange={(e) => setValue(name, e.target.value)}
      onBlur={handleBlur}
      className={`form-select ${hasError ? 'form-input-error' : ''} ${className}`}
      data-theme={config.theme === 'system' ? undefined : config.theme}
      data-font-size={config.fontSize}
      aria-invalid={hasError}
      {...props}
    >
      <option value="">Seleccionar...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

// ============================================
// FORM CHECKBOX
// ============================================

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
  label: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ 
  label, 
  className = '',
  ...props 
}) => {
  const { name } = useFieldContext();
  const { values, setValue } = useFormContext();
  const { config } = useConfig();

  return (
    <label className={`form-checkbox ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={values[name] === 'true'}
        onChange={(e) => setValue(name, e.target.checked ? 'true' : 'false')}
        data-theme={config.theme === 'system' ? undefined : config.theme}
        {...props}
      />
      <span className="form-checkbox-label">{label}</span>
    </label>
  );
};

// ============================================
// FORM ERROR
// ============================================

interface FormErrorProps {
  children?: ReactNode;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ children, className = '' }) => {
  const { name } = useFieldContext();
  const { errors, touched } = useFormContext();

  const error = touched[name] ? errors[name] : null;
  const message = children || error;

  if (!message) return null;

  return (
    <span 
      id={`${name}-error`} 
      className={`form-error ${className}`}
      role="alert"
    >
      ⚠️ {message}
    </span>
  );
};

// ============================================
// FORM ACTIONS
// ============================================

interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ children, className = '' }) => {
  return (
    <div className={`form-actions ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// FORM SUBMIT
// ============================================

interface FormSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const FormSubmit: React.FC<FormSubmitProps> = ({ 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const { isSubmitting } = useFormContext();
  const { config } = useConfig();

  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className={`form-submit ${className}`}
      data-theme={config.theme === 'system' ? undefined : config.theme}
      {...props}
    >
      {isSubmitting ? '⏳ Procesando...' : children}
    </button>
  );
};

// ============================================
// FORM RESET
// ============================================

interface FormResetProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const FormReset: React.FC<FormResetProps> = ({ 
  children, 
  className = '',
  onClick,
  ...props 
}) => {
  const { config } = useConfig();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className={`form-reset ${className}`}
      data-theme={config.theme === 'system' ? undefined : config.theme}
      {...props}
    >
      {children}
    </button>
  );
};

// ============================================
// COMPOUND COMPONENT EXPORT
// ============================================

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Label: FormLabel,
  Input: FormInput,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Error: FormError,
  Actions: FormActions,
  Submit: FormSubmit,
  Reset: FormReset,
});

// ============================================
// TIPOS EXPORTADOS
// ============================================

export type { 
  FormRootProps, 
  FormFieldProps, 
  FormLabelProps, 
  FormInputProps,
  FormSelectProps,
  FormCheckboxProps,
  FormErrorProps,
  FormActionsProps,
  FormSubmitProps,
  FormResetProps,
};
