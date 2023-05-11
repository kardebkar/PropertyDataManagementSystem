import { useFormContext } from "react-hook-form";
import { FieldData } from './FieldData';
import { Form } from "react-bootstrap";
import TextInputField from "./../form/TextInputField";

export function useFields(fieldsData: FieldData[], handleSubmit: (data: any) => void, onSubmit: (data: any) => Promise<void>) {
  const { register } = useFormContext();
  
  return fieldsData.map(fieldData => (
    <Form onSubmit={handleSubmit}>
      <TextInputField register={register} {...fieldData} />
    </Form>
  ));
}
