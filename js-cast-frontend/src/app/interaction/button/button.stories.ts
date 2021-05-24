import { Meta, Story } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'Interaction/ButtonComponent',
  component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponent> = (args) => ({
  props: args,
  template: `
    <app-button>{{content}}</app-button>
  `,
});

export const Button = Template.bind({});
Button.args = {
  content: 'Hello World',
};
