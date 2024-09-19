import { FieldValues, useForm } from "react-hook-form";
import { Form, Link } from "react-router-dom";
import {
  Button,
  FormInput,
  Header,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";
import { useAppSelector } from "../app/store/store";
import { useEffect } from "react";
import { auth } from "../app/config/firebase";
import { updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

function AccountPage() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const password1 = watch("password1");
  const password2 = watch("password2");

  useEffect(() => {
    if (password2) trigger("password2");
  }, [password2, trigger, password1]);

  const { currentUser } = useAppSelector((state) => state.auth);

  async function onSubmit(data: FieldValues) {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, data.password1);
        toast.success("Password updated");
        reset();
      }
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <Segment style={{ textAlign: "center", width: "50vw", margin: "auto" }}>
      <Header dividing size="large" content="Account" />
      {currentUser?.providerId === "password" ? (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to change your password</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              style={{ marginBottom: 10, padding: 5 }}
              type="password"
              defaultValue=""
              placeholder="Password"
              {...register("password1", { required: true })}
              error={errors.password1 && "Password is required"}
            />
            <FormInput
              style={{ marginBottom: 10, padding: 5 }}
              type="password"
              defaultValue=""
              placeholder="Confirm Password"
              {...register("password2", {
                required: true,

                validate: {
                  passwordMatch: (value) =>
                    value === getValues().password1 || "Password do not match",
                },
              })}
              error={
                (errors.password2?.type === "required" &&
                  "Confirm password is required") ||
                (errors.password2?.type === "passwordMatch" &&
                  errors.password2.message)
              }
            />

            {errors.root && (
              <Label
                basic
                color="red"
                content={errors.root.serverError.message}
              />
            )}
            <Button
              loading={isSubmitting}
              type="submit"
              disabled={!isValid || isSubmitting}
              size="large"
              positive
              content="Update password"
            />
          </Form>
        </div>
      ) : (
        <div>
          <Header content="Google account" color="red" sub />
          <p>visit your google account password settings</p>
          <Button as={Link} to="https://google.com" color="google plus">
            <Icon name="google" />
            go to google
          </Button>
        </div>
      )}
    </Segment>
  );
}
export default AccountPage;
