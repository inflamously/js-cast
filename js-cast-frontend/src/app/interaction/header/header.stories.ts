import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { HeaderComponent } from './header.component';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { HeaderItemComponent } from './header-item/header-item.component';
import { HeaderDividerComponent } from './header-divider/header-divider.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Interaction/HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        HeaderDropdownComponent,
        HeaderItemComponent,
        HeaderDividerComponent,
      ],
    }),
  ],
} as Meta;

const HeaderItemTemplateActions = {
  click: action('click'),
  clickImage: action('click-image'),
};

const HeaderItemActionProps = (args) => {
  return {
    ...args,
    ...HeaderItemTemplateActions,
  };
};

const HeaderTemplate: Story<HeaderComponent> = (args) => ({
  props: HeaderItemActionProps(args),
  template: `
    <app-header>
      <app-header-item slot="brand" (click)="click()">
        <p>Hello Brand</p>
      </app-header-item>
      <app-header-item [container]="true" slot="start">
        <app-header-dropdown>
          <app-header-item (click)="click()">Menu A</app-header-item>
          <app-header-divider></app-header-divider>
          <app-header-item (click)="click()">Menu B</app-header-item>
        </app-header-dropdown>
      </app-header-item>
    </app-header>
  `,
});

export const Header = HeaderTemplate.bind({});
Header.args = {};

const HeaderBrandTemplate: Story<HeaderComponent> = (args) => ({
  props: HeaderItemActionProps(args),
  template: `
    <app-header>
      <app-header-item slot="brand" (click)="clickImage()">
        <img loading="lazy" src="https://dummyimage.com/48x48/000000/ffffff"/>
      </app-header-item>
      <app-header-item [container]="true" slot="start">
        <app-header-dropdown>
          <app-header-item (click)="click()">Menu A</app-header-item>
          <app-header-divider></app-header-divider>
          <app-header-item (click)="click()">Menu B</app-header-item>
        </app-header-dropdown>
      </app-header-item>
    </app-header>
  `,
});

export const HeaderBrand = HeaderBrandTemplate.bind({});
HeaderBrand.args = {};

const HeaderDropdownTemplate: Story<HeaderDropdownComponent> = (args) => ({
  props: HeaderItemActionProps(args),
  template: `
    <app-header>
      <app-header-item [container]="true" slot="start">
        <app-header-dropdown>
          <app-header-item (click)="click()">Menu A</app-header-item>
          <app-header-divider></app-header-divider>
          <app-header-item (click)="click()">Menu B</app-header-item>
        </app-header-dropdown>
      </app-header-item>
    </app-header>
  `,
});

export const HeaderDropdown = HeaderDropdownTemplate.bind({});
HeaderDropdown.args = {};

const HeaderItemTemplate: Story<HeaderItemComponent> = (args) => ({
  props: HeaderItemActionProps(args),
  template: `
  <app-header>
    <app-header-item slot="start" (click)="click()">{{menuLabel}}</app-header-item>
  </app-header>
`,
});

export const HeaderItemText = HeaderItemTemplate.bind({});
HeaderItemText.args = {
  menuLabel: 'Menu A',
};
