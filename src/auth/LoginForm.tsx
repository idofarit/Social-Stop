import { signInWithEmailAndPassword } from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { Button, Divider, Form, FormInput, Label } from "semantic-ui-react";
import { closeModal } from "../app/common/modals/modalSlice";
import ModalWrapper from "../app/common/modals/ModalWrapper";
import { auth } from "../app/config/firebase";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const { data: location } = useAppSelector((state) => state.modal);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(closeModal());
      navigate(location.from);
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <ModalWrapper header="Signin to SocialStop" size="mini">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          defaultValue=""
          placeholder="Email address"
          {...register("email", {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          })}
          error={
            (errors.email?.type === "required" && "Email is required") ||
            (errors.email?.type === "pattern" && "Invalid Email")
          }
        />
        <FormInput
          type="password"
          defaultValue=""
          placeholder="Password"
          {...register("password", { required: true })}
          error={errors.password && "password is required"}
        />
        {errors.root && (
          <Label
            basic
            color="red"
            style={{ display: "block", marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}

        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Login"
        />

        <Divider horizontal>or</Divider>
        <SocialLogin />
      </Form>
    </ModalWrapper>
  );
}
export default LoginForm;
