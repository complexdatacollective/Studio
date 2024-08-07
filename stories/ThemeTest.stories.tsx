import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown, Home } from 'lucide-react';
import React from 'react';
import HuePicker from '~/components/HuePicker';
import ResponsiveContainer from '~/components/layout/ResponsiveContainer';
import Section from '~/components/layout/Section';
import PageHeader from '~/components/typography/PageHeader';
import Paragraph from '~/components/typography/Paragraph';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/form/Input';
import { getVariables } from '~/lib/dynamic-theme/runtime';
import { cn } from '~/lib/utils';

const meta: Meta = {};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  // decorators: [(Story, context) => {
  //   const hue = 200;
  //   const accent = getVariables({ baseName: "accent", hue: +hue });
  //   const lightDarkClass = ''; // '' | 'dark'

  //   const style = Object.fromEntries(accent);

  //   return (
  //     <div style={style} className={cn('h-full', lightDarkClass)}>
  //       <Story />
  //     </div>
  //   )
  // }],
  render: () => {
    return (
    <div className="wrapper flex h-full flex-col bg-primary-50 text-primary-900 dark:bg-primary-950 dark:text-primary-50">
      <nav className="main-nav flex justify-between bg-primary-700 px-4 py-2 text-primary-50">
        <ul className="flex items-center">
          <li>
            <img src="https://via.placeholder.com/50" alt="logo" />
          </li>
          <li>
            <svg
              className="h-6 w-6"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M16.88 3.549L7.12 20.451"></path>
            </svg>
          </li>
          <li className="flex">
            <div>Project Switcher</div>
            <button>
              <ChevronsUpDown />
            </button>
          </li>
        </ul>

        <img
          className="h-12 w-12 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </nav>
      <article className="main flex flex-col">
        <nav className="sidebar-nav bg-secondary-500 px-4 py-2 text-secondary-50">
          <ul className="flex gap-4">
            <li>Dashboard</li>
            <li>Protocol Editor</li>
            <li>Participants</li>
          </ul>
        </nav>
        <main>
          <ResponsiveContainer>
            <PageHeader
              headerText="Page Header"
              subHeaderText="Something about this page that gives more information."
            />
            <Section title="Section 1">
              <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptatem, quos, quibusdam, quas doloribus quae doloremque
                voluptatum nemo autem quod voluptatibus. Quisquam, doloremque
                voluptates. Quisquam, doloremque voluptates.
              </Paragraph>
              <HuePicker />
              <div className="flex gap-2">
                <Button>Default</Button>
                <Button variant="primary">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </Section>
            <Section title="Section with Nested Section">
              <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptatem, quos, quibusdam, quas doloribus quae doloremque
                voluptatum nemo autem quod voluptatibus. Quisquam, doloremque
                voluptates. Quisquam, doloremque voluptates.
              </Paragraph>
              <Section title="Nested Section">
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptatem, quos, quibusdam, quas doloribus quae doloremque
                  voluptatum nemo autem quod voluptatibus. Quisquam, doloremque
                  voluptates. Quisquam, doloremque voluptates.
                </Paragraph>
                <Input label="Input Label" />
                <div className="flex gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </Section>
            </Section>
          </ResponsiveContainer>
        </main>
      </article>
      <footer className="footer border">footer</footer>
    </div>
  )

  } ,
};
