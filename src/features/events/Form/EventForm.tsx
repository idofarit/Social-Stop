import { Button, Form, FormField, Header, Segment } from "semantic-ui-react";

type Props = {
  setFormOpen: (value: boolean) => void;
};

function EventForm({ setFormOpen }: Props) {
  return (
    <Segment clearing>
      <Header content="Create event" />
      <Form>
        <FormField>
          <input type="text" placeholder="event title" />
        </FormField>
        <FormField>
          <input type="text" placeholder="category" />
        </FormField>
        <FormField>
          <input type="text" placeholder="description" />
        </FormField>
        <FormField>
          <input type="text" placeholder="city" />
        </FormField>
        <FormField>
          <input type="text" placeholder="venue" />
        </FormField>
        <FormField>
          <input type="date" placeholder="date" />
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
