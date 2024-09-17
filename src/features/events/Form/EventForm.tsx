import { ChangeEvent, useState } from "react";
import { Button, Form, FormField, Header, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { createId } from "@paralleldrive/cuid2";

type Props = {
  setFormOpen: (value: boolean) => void;
  addEvent: (event: AppEvent) => void;
  selectedEvent: AppEvent | null;
  updateEvent: (event: AppEvent) => void;
};

function EventForm({
  setFormOpen,
  addEvent,
  updateEvent,
  selectedEvent,
}: Props) {
  const initialValue = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValue);

  function onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : addEvent({
          ...values,
          id: createId(),
          hostedBy: "Maddy",
          attendees: [],
          hostPhotoURL: "",
        });
    setFormOpen(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Update event" : "Create event"} />
      <Form onSubmit={onSubmit}>
        <FormField>
          <input
            type="text"
            placeholder="event title"
            name="title"
            onChange={(e) => handleInputChange(e)}
            value={values.title}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            placeholder="category"
            name="category"
            onChange={(e) => handleInputChange(e)}
            value={values.category}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={(e) => handleInputChange(e)}
            value={values.description}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            placeholder="city"
            name="city"
            onChange={(e) => handleInputChange(e)}
            value={values.city}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            placeholder="venue"
            name="venue"
            onChange={(e) => handleInputChange(e)}
            value={values.venue}
          />
        </FormField>
        <FormField>
          <input
            type="date"
            placeholder="date"
            name="date"
            onChange={(e) => handleInputChange(e)}
            value={values.date}
          />
        </FormField>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="button"
          floated="right"
          content="Cancel"
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
}
export default EventForm;
