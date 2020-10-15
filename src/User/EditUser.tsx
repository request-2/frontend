import React from 'react';
import { useNavigate, useParams } from 'react-router';

import * as Button from '../Common/Buttons';
import { fieldValueToString } from '../Request/FieldValue';
import { useAsyncGet } from '../Utils/Api';
import { useAuth } from '../Utils/Auth';
import { WithID } from '../Utils/WithID';
import { Role, User } from './User';
import UserForm, { UserStub } from './UserForm';

export default function EditUser() {
  const { id } = useParams();
  const { Loader } = useAsyncGet<WithID<User>>(`/users/${id}`);
  return <Loader>{user => <EditUserForm user={user} />}</Loader>;
}

function EditUserForm({ user }: { user: WithID<User> }) {
  const { authPut, authDel } = useAuth<User>();
  const navigate = useNavigate();

  const onSubmit = async (values: UserStub, teamId: number) => {
    const response = await authPut(`/users/${user._id}`, {
      ...user,
      name: fieldValueToString(values.name),
      email: fieldValueToString(values.email),
      roles: values.roles.content as Role[],
      teamId,
    });

    if (response.status === 200) {
      navigate(-1);
    }
  };

  return (
    <UserForm
      title={`Editing ${user.name}`}
      submitTitle="Save changes"
      headerButtons={
        user.active ? (
          <Button.Deactivate
            onClick={() => {
              authDel(`/users/${user._id}`)
                .then(() => navigate(-1))
                .catch(console.log);
            }}
          />
        ) : (
          <Button.Activate
            onClick={() => {
              authPut(`/users/${user._id}`, { ...user, active: true })
                .then(() => navigate(-1))
                .catch(console.log);
            }}
          />
        )
      }
      user={user}
      onSubmit={onSubmit}
    />
  );
}