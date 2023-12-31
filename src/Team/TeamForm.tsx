import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ShortTextInput } from '../Common/Form/NewTextField';
import { Question, reqRule } from '../Common/Form/Question';
import { Body, Card, ContentWrapper, Header, Page, Spacer, Title } from '../Common/Layout';
import { Maybe } from '../Utils/Maybe';
import { Team } from './Team';

type TeamStub = { name: string; code: string };

export function TeamForm({
  title,
  team,
  onSubmit,
  children,
  headerButtons,
}: {
  title: string;
  team?: Maybe<Team>;
  onSubmit: (values: TeamStub) => Promise<Response>;
  children: ReactNode;
  headerButtons?: React.ReactNode;
}): JSX.Element {
  const navigate = useNavigate();
  const { register, formState:{errors}, handleSubmit } = useForm<TeamStub>({
    defaultValues: {
      name: team?.name ?? '',
      code: team?.code ?? '',
    },
  });

  return (
    <ContentWrapper>
      <div className="max-w-2xl w-full mx-auto">
        <Header>
          <Title>{title}</Title>
          {headerButtons && (
            <>
              <Spacer /> {headerButtons}
            </>
          )}
        </Header>
        <Body>
          <Card className="w-full overflow-hidden">
            <form
              className="flex flex-col items-start"
              onSubmit={handleSubmit(async values => {
                await onSubmit(values);
                navigate(-1);
              })}
            >
              <div className="p-6 space-y-6 w-full">
                <div>
                  <Question required>Team leader</Question>
                  <ShortTextInput errors={errors} {...register("name", reqRule())} />
                </div>
                <div>
                  <Question required>Institutional code</Question>
                  <ShortTextInput errors={errors} {...register("code", reqRule())} />
                </div>
              </div>
              <div className="flex justify-end w-full px-6 py-3 bg-gray-50">{children}</div>
            </form>
          </Card>
        </Body>
      </div>
    </ContentWrapper>
  );
}
