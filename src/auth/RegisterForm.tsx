import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { Button, Form, FormInput, Label } from "semantic-ui-react";
import { closeModal } from "../app/common/modals/modalSlice";
import ModalWrapper from "../app/common/modals/ModalWrapper";
import { useAppDispatch } from "../app/store/store";
import { auth } from "../app/config/firebase";
import { useFireStore } from "../app/hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useAppDispatch();

  const { set } = useFireStore("profiles");

  async function onSubmit(data: FieldValues) {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCreds.user, {
        displayName: data.displayName,
      });
      await set(userCreds.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      });
      dispatch(closeModal());
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <ModalWrapper header="Register to SocialStop" size="mini">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          defaultValue=""
          placeholder="Display name"
          {...register("displayName", { required: true })}
          error={errors.displayName && "Display name is required"}
        />
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
          content="Register"
        />
        {errors.root && (
          <Label
            basic
            color="red"
            style={{ display: "block", marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}
      </Form>
    </ModalWrapper>
  );
}
export default RegisterForm;
