import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../typing';

interface iFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

const Form = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iFormInput>();

  const onSubmit: SubmitHandler<iFormInput> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
        <hr className="py-3 mt-2" />

        <input {...register('_id')} type="hidden" name="_id" value={post._id} />

        <label className="block mb-5">
          <span className="text-gray-700">Name</span>
          <input
            {...register('name', { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
            placeholder="John Applessed"
            type="text"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Email</span>
          <input
            {...register('email', { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
            placeholder="John Applessed"
            type="email"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Comment</span>
          <textarea
            {...register('comment', { required: true })}
            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none"
            placeholder="John Applessed"
            rows={8}
          />
        </label>

        <div className="flex flex-col p-5">
          <div>
            {errors.name && (
              <span className="text-red-500">The Name Field is required</span>
            )}
          </div>
          <div>
            {errors.email && (
              <span className="text-red-500">The Email Field is required</span>
            )}
          </div>
          <div>
            {errors.comment && (
              <span className="text-red-500">
                The Comment Field is required
              </span>
            )}
          </div>
        </div>
        <input
          type="submit"
          className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Form;
