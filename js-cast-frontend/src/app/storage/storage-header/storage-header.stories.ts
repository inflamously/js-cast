import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { StorageHeaderComponent } from './storage-header.component';
import { HeaderComponent } from '../../interaction/header/header.component';
import { HeaderDropdownComponent } from '../../interaction/header/header-dropdown/header-dropdown.component';
import { HeaderItemComponent } from '../../interaction/header/header-item/header-item.component';
import { HeaderDividerComponent } from '../../interaction/header/header-divider/header-divider.component';

export default {
  title: 'App/Storage/Header',
  component: StorageHeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        HeaderComponent,
        HeaderDropdownComponent,
        HeaderItemComponent,
        HeaderDividerComponent,
      ],
    }),
  ],
} as Meta;

const HeaderTemplate: Story<StorageHeaderComponent> = (args) => ({
  props: args,
});

export const Header = HeaderTemplate.bind({});
Header.args = {};
