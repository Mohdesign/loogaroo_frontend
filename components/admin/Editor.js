import React, { useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
            
            config= {{
             
                forcePasteAsPlainText: true,
                 
              //   allowedContent: true,
	            //   forcePasteAsPlainText: true,
              //   copyFormatting_allowedContexts : true,    
              //   copyFormatting_allowFontStyling : true,
              //   copyFormatting_allowList : true,
              //   copyFormatting_allowLists : true,
              //   copyFormatting_allowLinks : true,
              //   pasteFromWordRemoveFontStyles : false,
              //   copyFormatting_allowRules : 'b s u i em strong; span{text-decoration,font-weight}',

                // toolbar: [
                    
                //     'heading',
                //     '|',
                //     'bold',
                //     'italic',
                //     'link',
                //     'bulletedList',
                //     'numberedList',
                //     'blockQuote',
                //     'undo',
                //     'redo',
                //     'imageUpload',
                //     'insertTable',
                //     'mediaEmbed',
                //     '|',
                //     'outdent',
                //     'indent',
                //     '|',
                //     'alignment',
                //     '|',
                //     'fontSize',
                //     'fontFamily',
                //     'fontColor',
                //     'fontBackgroundColor',
                //     '|',
                //     'specialCharacters',
                //     'insertHR',
                //     '|',
                //     'codeSnippet',
                //     '|',
                //     'undo',
                //     'redo',
                //     '|',
                //     'fullScreen',
                //     '|',
                //     'indent',
                //     'outdent',
                //     '|',
                //     'highlight',
                //     '|',
                //     'horizontalLine',
                //     '|',
                //     'align',
                //     '|',
                //     'indent',
                //     'outdent',

                // ],
                heading: {
                  options: [
                      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                  ]
              },
            }}
            
          type=" ClassicEditor"
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
          
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;