/* @flow */
import React from 'react';
import { Button, Text } from '@innovaccer/design-system';
import { Editor, EditorPreview } from '../../src';

export const All = (args) => {
  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createEmpty());
  const [html, setHTML] = React.useState();
  const [raw, setRaw] = React.useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onClick = () => {
    const raw = Editor.utils.convertToRaw(editorState.getCurrentContent());
    setRaw(raw);
    const html = EditorPreview.utils.convertToHTML(raw, true);
    setHTML(html.replaceAll('<br/>', ''));
  };

  return (
    <div>
      <Editor
        editorClassName="RichTextEditor"
        placeholder="Begin Typing.."
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        mention={{
          suggestions: [
            { label: 'First Name', value: 'Innovaccer' },
            { label: 'Last Name', value: 'Analytics' },
            { label: 'PCP', value: '112' },
            { label: 'Address', value: 'Test Address' },
            { label: 'DOB', value: '11-02-1998' },
          ],
        }}
      />
      <Button appearance="primary" size="large" onClick={onClick} className="my-4">
        Get Preview HTML
      </Button>
      <div>{html}</div>
      <div className="pl-7">
        <EditorPreview {...args} raw={raw} />
      </div>
    </div>
  );
};

All.argTypes = {
  raw: { control: { disable: true } },
  colors: { control: { disable: true } },
};

export default {
  title: 'Library/Preview - ContentOutput',
  component: EditorPreview,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};
