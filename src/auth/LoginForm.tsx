import { signInWithEmailAndPassword } from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { Button, Form, FormInput } from "semantic-ui-react";
import { closeModal } from "../app/common/modals/modalSlice";
import ModalWrapper from "../app/common/modals/ModalWrapper";
import { auth } from "../app/config/firebase";
import { useAppDispatch } from "../app/store/store";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(closeModal());
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <ModalWrapper header="Signin to SocialStop">
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

        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Login"
        />
      </Form>
    </ModalWrapper>
  );
}
export default LoginForm;
