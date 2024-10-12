import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Option {
  option: string;
}

interface Question {
  quest: string;
  options: Option[];
  correct: number;
}

interface FormValues {
  quizId: number;
  quizName: string;
  questions: Question[];
}

const initialValues: FormValues = {
  quizId: 0,
  quizName: '',
  questions: [
    {
      quest: '',
      options: [{ option: '' }],
      correct: 0,
    },
  ],
};

const validationSchema = Yup.object({
  quizId: Yup.number().required('Quiz ID is required'),
  quizName: Yup.string().required('Quiz name is required'),
  questions: Yup.array().of(
    Yup.object({
      quest: Yup.string().required('Question is required'),
      options: Yup.array().of(
        Yup.object({
          option: Yup.string().required('Option is required'),
        })
      ),
      correct: Yup.number().required('Correct option index is required').min(0, 'Must be at least 0'),
    })
  ),
});

const NewQuiz: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold text-black mb-4">Quiz Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="quizId" className="block text-sm font-medium text-black">
                Quiz ID
              </label>
              <Field
                type="number"
                id="quizId"
                name="quizId"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-black rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter Quiz ID"
              />
              <ErrorMessage name="quizId" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="quizName" className="block text-sm font-medium text-black">
                Quiz Name
              </label>
              <Field
                type="text"
                id="quizName"
                name="quizName"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-black rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter Quiz Name"
              />
              <ErrorMessage name="quizName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <FieldArray name="questions">
              {({ push, remove }) => (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-black mb-2">Questions</h2>
                  {values.questions.map((_, index) => (
                    <div key={index} className="mb-6 p-4 bg-gray-100 rounded-md shadow-sm border border-black">
                      <div className="mb-4">
                        <label htmlFor={`questions.${index}.quest`} className="block text-sm font-medium text-black">
                          Question {index + 1}
                        </label>
                        <Field
                          type="text"
                          id={`questions.${index}.quest`}
                          name={`questions.${index}.quest`}
                          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-black rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                          placeholder="Enter your question"
                        />
                        <ErrorMessage
                          name={`questions.${index}.quest`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <FieldArray name={`questions.${index}.options`}>
                        {({ push: pushOption, remove: removeOption }) => (
                          <div className="mb-4">
                            <h3 className="text-md font-semibold text-black mb-2">Options</h3>
                            {values.questions[index].options.map((_, optionIndex) => (
                              <div key={optionIndex} className="mb-2 flex items-center">
                                <Field
                                  type="text"
                                  id={`questions.${index}.options.${optionIndex}.option`}
                                  name={`questions.${index}.options.${optionIndex}.option`}
                                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-black rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                <button
                                  type="button"
                                  className="ml-2 px-3 py-1 bg-zinc-800 text-white text-sm rounded-md shadow-sm hover:bg-zinc-800"
                                  onClick={() => removeOption(optionIndex)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              className="px-4 py-2 bg-zinc-800 text-white text-sm rounded-md shadow-sm hover:bg-zinc-800"
                              onClick={() => pushOption({ option: '' })}
                            >
                              Add Option
                            </button>
                          </div>
                        )}
                      </FieldArray>

                      <div className="mb-4">
                        <label htmlFor={`questions.${index}.correct`} className="block text-sm font-medium text-black">
                          Correct Option Index
                        </label>
                        <Field
                          type="number"
                          id={`questions.${index}.correct`}
                          name={`questions.${index}.correct`}
                          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-black rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                          placeholder="Enter correct option index"
                        />
                        <ErrorMessage
                          name={`questions.${index}.correct`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <button
                        type="button"
                        className="mt-2 px-4 py-2 bg-zinc-800 text-white text-sm rounded-md shadow-sm hover:bg-zinc-800"
                        onClick={() => remove(index)}
                      >
                        Remove Question
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-zinc-800 text-white text-sm rounded-md shadow-sm hover:bg-zinc-800"
                    onClick={() => push({ quest: '', options: [{ option: '' }], correct: 0 })}
                  >
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="mt-6 w-full px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-md shadow-sm hover:bg-zinc-800"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewQuiz;
