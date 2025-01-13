import React from 'react';
import FormCreator from '../components/FormCreator';
import formStyle from '../formTemplates/formStyle.json';
import formTemplate from '../formTemplates/formTemplate.json';

function EditBlog() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-blue-200 to-gray-200">
      <div className="m-8">
        <FormCreator
          formTemplate={formTemplate}
          formStyle={formStyle}
          onSubmit={() => console.log('hi')}
        />
      </div>
    </div>
  );
}

export default EditBlog;
