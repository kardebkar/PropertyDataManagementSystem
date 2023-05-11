import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }

      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>Sign Up</Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}

        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.email}
                />
              </Form>
            </Col>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="role"
                  label="Role"
                  type="text"
                  placeholder="Role"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.role}
                />
              </Form>
            </Col>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="first_name"
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.first_name}
                />
              </Form>
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="last_name"
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.last_name}
                />
              </Form>
            </Col>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="phone_number"
                  label="Phone Number"
                  type="text"
                  placeholder="Phone Number"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.phone_number}
                />
              </Form>
            </Col>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="country"
                  label="Country"
                  type="text"
                  placeholder="Country"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.country}
                />
              </Form>
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="state"
                  label="State"
                  type="text"
                  placeholder="State"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.state}
                />
              </Form>
            </Col>

            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="city"
                  label="City"
                  type="text"
                  placeholder="City"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.city}
                />
              </Form>
            </Col>

            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Address"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.address}
                />
              </Form>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="zip_code"
                  label="Zip Code"
                  type="text"
                  placeholder="zip_code"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.zip_code}
                />
              </Form>

          <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="communication_preferences"
                  label="Communication Preferences"
                  type="text"
                  placeholder="Communication Preferences"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.communication_preferences}
                />
              </Form>

          <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Username"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.username}
                />
              </Form>

          <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.password}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={styleUtils.width100}
                >
                  Sign Up
                </Button>
              </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
