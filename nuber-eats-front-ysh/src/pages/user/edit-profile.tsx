import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { Button } from "../../components/Button";
import { useMe } from "../../hooks/useMe";
import { EditProfileInput, EditProfileOutput } from "../../graphql/generated";
import { useForm } from "react-hook-form";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const { register, handleSubmit, formState, getValues } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData.me.email,
    },
  });

  const onCompleted = ({ ok }: EditProfileOutput) => {
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
    }
  };

  const [editProfile, { loading }] = useMutation<EditProfileOutput>(
    EDIT_PROFILE_MUTATION,
    { onCompleted }
  );

  const onSubmit = ({ email, password }: IFormProps) => {
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("email")}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
