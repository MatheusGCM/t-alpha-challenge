import { Eye, EyeOff } from 'lucide-react'
import { InputHTMLAttributes, forwardRef, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const iconPassword = isPasswordVisible ? <Eye /> : <EyeOff />

    return (
      <div className="flex-1">
        <label className="text-sm font-medium text-zinc-800" htmlFor={label}>
          {label}
        </label>
        <div
          className={`flex w-full rounded-lg border bg-transparent p-3 focus-within:border-zinc-500 ${error ? 'border-red-500' : 'border-zinc-200'}`}
        >
          <input
            id={label}
            type={isPasswordVisible ? 'text' : type}
            autoComplete="off"
            ref={ref}
            className="mr-2 flex-1 bg-transparent outline-none placeholder:text-zinc-400"
            {...rest}
          />
          {type === 'password' && (
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            >
              {iconPassword}
            </button>
          )}
        </div>

        <span className="block h-3 text-xs text-red-500">{error}</span>
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
