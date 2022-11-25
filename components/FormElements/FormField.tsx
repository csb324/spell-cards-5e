import { ChangeEventHandler } from "react";

function FormField({
  title,
  identifier,
  value,
  onChange
}: {
  title: string,
  identifier: string,
  value: string,
  onChange: ChangeEventHandler
}) {
  return (
    <>
      <label className="font-bold text-sm" htmlFor={ identifier }>{ title }</label>
      <input value={ value } className="border block w-full mb-3 rounded px-1" type="text" name={identifier} onChange={ onChange } />
    </>
  )
}

export default FormField;