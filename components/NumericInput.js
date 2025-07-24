import { useState, useCallback } from "react";
import { FiX } from "react-icons/fi";
import debounce from "lodash/debounce";

const NumericInput = ({
  id = "numericInput",
  label = "Enter Number", 
  placeholder = "Ingrese un número",
  initialValue = "",
  onChange = null,
  className = "",
  name = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const formatNumber = (num) => {
    if (!num) return "";
    
    // Si el número termina con una coma, debemos preservarla
    const endsWithComma = num.endsWith(",");
    
    const parts = num.toString().split(",");
    const wholePart = parts[0];
    const decimalPart = parts[1];

    // Formatea la parte entera con puntos como separadores de miles
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Si hay parte decimal o la entrada termina con coma, devuelve ambas partes
    // Si no hay parte decimal pero la entrada termina con coma, preserva la coma
    if (decimalPart) {
      return `${formattedWholePart},${decimalPart}`;
    } else if (endsWithComma) {
      return `${formattedWholePart},`;
    } else {
      return formattedWholePart;
    }
  };

  // Función para convertir el valor formateado a un número
  const getNumericValue = (formattedValue) => {
    if (!formattedValue) return null;
    // Reemplazar puntos y convertir coma a punto para parsear como número
    return parseFloat(formattedValue.replace(/\./g, "").replace(",", "."));
  };

  const debouncedValidation = useCallback(
    debounce((val) => {
      if (val && !/^-?\d*,?\d*$/.test(val.replace(/\./g, ""))) {
        setError("Please enter a valid number");
      } else {
        setError("");
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Si el input está vacío, reseteamos
    if (inputValue === "") {
      setValue("");
      setError("");
      // Crear un evento sintético para pasar al callback
      if (onChange) {
        const syntheticEvent = { 
          target: { 
            name, 
            value: "" 
          } 
        };
        onChange(syntheticEvent, null);
      }
      return;
    }
    
    // Quitamos los puntos de miles para trabajar con el valor limpio
    const strippedValue = inputValue.replace(/\./g, "");
    
    // Verificamos que sea un formato válido antes de procesar
    if (!/^-?\d*,?\d*$/.test(strippedValue)) {
      return;
    }
    
    // Formateamos el valor
    const formattedValue = formatNumber(strippedValue);
    setValue(formattedValue);
    debouncedValidation(formattedValue);
    
    // Si hay función onChange, la llamamos con un evento sintético y el valor numérico
    if (onChange) {
      const numericValue = getNumericValue(formattedValue);
      const syntheticEvent = { 
        target: { 
          name, 
          value: formattedValue 
        } 
      };
      onChange(syntheticEvent, numericValue);
    }
  };

  const handleClear = () => {
    setValue("");
    setError("");
    if (onChange) {
      const syntheticEvent = { 
        target: { 
          name, 
          value: "" 
        } 
      };
      onChange(syntheticEvent, null);
    }
  };

  return (
    <div className={className || "max-w-md mx-auto p-4"}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label={label || "Numeric input with formatting"}
          aria-invalid={error ? "true" : "false"}
          className={`
            w-full px-4 py-2 text-right
            border rounded-lg
            focus:outline-none focus:ring-2
            transition-all duration-200
            ${error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"}
            ${isFocused ? "shadow-sm" : ""}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default NumericInput;