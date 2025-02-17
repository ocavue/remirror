import 'remirror/styles/all.css';

import { TextColorExtension } from 'remirror/extensions';
import { htmlToProsemirrorNode } from '@remirror/core';
import { ProsemirrorDevTools } from '@remirror/dev';
import { Remirror, ThemeProvider, useCommands, useRemirror } from '@remirror/react';

export default { title: 'Extensions / TextColor' };

const extensions = () => [new TextColorExtension()];

const TextColorButton = () => {
  const commands = useCommands();
  return (
    <>
      <button onClick={() => commands.setTextColor('red')}>Red</button>
      <button onClick={() => commands.setTextColor('green')}>Green</button>
      <button onClick={() => commands.removeTextColor()}>Remove</button>
    </>
  );
};

export const Basic = (): JSX.Element => {
  const { manager, state, onChange } = useRemirror({
    extensions: extensions,
    content: `<p>Text in <span data-text-color-mark="red">red</span></p>`,
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <ThemeProvider>
      <Remirror manager={manager} autoFocus onChange={onChange} state={state} autoRender='end'>
        <TextColorButton />
        <ProsemirrorDevTools />
      </Remirror>
    </ThemeProvider>
  );
};
