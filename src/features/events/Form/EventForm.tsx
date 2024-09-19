import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormField,
  FormInput,
  FormSelect,
  FormTextArea,
  Header,
  Segment,
} from "semantic-ui-react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppSelector } from "../../../app/store/store";
import { AppEvent } from "../../../app/types/event";
import { actions } from "../eventSlice";
import { categoryOptions } from "./categoryOptions";

function EventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      if (event) return { ...event, date: new Date(event.date) };
    },
  });

  const { loadDocument, create, update } = useFireStore("events");

  const { status } = useAppSelector((state) => state.events);

  const { id } = useParams();

  const event = useAppSelector((state) =>
    state.events.data.find((e) => e.id === id)
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  async function updateEvent(data: AppEvent) {
    if (!event) return;
    await update(data.id, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  }

  async function createEvent(data: FieldValues) {
    const ref = await create({
      ...data,
      hostedBy: "Maddy",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
    return ref;
  }

  async function handleCancelToggle(event: AppEvent) {
    await update(event.id, {
      isCancelled: !event.isCancelled,
    });
    toast.success(
      `Event has been ${event.isCancelled ? "uncancelled" : "cancelled"}`
    );
  }

  async function onSubmit(data: FieldValues) {
    try {
      if (event) {
        await updateEvent({ ...event, ...data });
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(data);
        navigate(`/events/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  if (status === "loading") return <LoadingComponent />;

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="Event Title"
          defaultValue={event?.title || ""}
          {...register("title", { required: true })}
          error={errors.title && "Title is required"}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "category is required" }}
          defaultValue={event?.category}
          render={({ field }) => (
            <FormSelect
              options={categoryOptions}
              clearable
              placeholder="category"
              {...field}
              onChange={(_e, d) =>
                setValue("category", d.value, { shouldValidate: true })
              }
              error={errors.category && errors.category.message}
            />
          )}
        />

        <FormTextArea
          type="text"
          placeholder="description"
          defaultValue={event?.description || ""}
          {...register("description", { required: "description is required" })}
          error={errors.description && errors.description.message}
        />

        <Header sub content="Location details" color="teal" />

        <FormInput
          type="text"
          placeholder="city"
          defaultValue={event?.city || ""}
          {...register("city", { required: "city is required" })}
          error={errors.city && errors.city.message}
        />

        <FormInput
          placeholder="venue"
          type="text"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: "venue is required" })}
          error={errors.venue && errors.venue.message}
        />

        <FormField>
          <Controller
            name="date"
            control={control}
            rules={{ required: "date is required" }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => {
              return (
                <DatePicker
                  selected={field.value}
                  onChange={(value) =>
                    setValue("date", value, { shouldValidate: true })
                  }
                  showTimeSelect
                  timeCaption="time"
                  dateFormat="MMM d,yyyy h:mm aa"
                  placeholderText="Event date and time"
                />
              );
            }}
          />
        </FormField>

        {event && (
          <Button
            type="button"
            floated="left"
            color={event.isCancelled ? "green" : "red"}
            onClick={() => handleCancelToggle(event)}
            content={event.isCancelled ? "Re-active event" : "Cancel event"}
          />
        )}

        <Button
          disabled={!isValid}
          type="submit"
          floated="right"
          positive
          content="Submit"
          loading={isSubmitting}
        />
        <Button
          disabled={isSubmitting}
          as={Link}
          to="/events"
          type="button"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
export default EventForm;
