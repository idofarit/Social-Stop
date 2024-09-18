import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormField, Header, Segment } from "semantic-ui-react";

function EventForm() {
  const initialValue = {
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
    // selectedEvent
    //   ? updateEvent({ ...selectedEvent, ...values })
    //   : addEvent({
    //       ...values,
    //       id: createId(),
    //       hostedBy: "Maddy",
    //       attendees: [],
    //       hostPhotoURL: "",
    //     });
    // setFormOpen(false);

    console.log(values);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content="Create event" />
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
