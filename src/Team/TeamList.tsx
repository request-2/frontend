import React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as Button from '../Common/Buttons';
import { Page } from '../Common/Layout';
import Pagination, { usePagination } from '../Common/PageSwitcher';
import { Cell, Pill, Row, Table } from '../Common/Table';
import * as Api from '../Utils/Api';
import { comparator } from '../Utils/Func';
import { WithID } from '../Utils/WithID';
import EditTeam from './EditTeam';
import NewTeam from './NewTeam';
import { Team } from './Team';

export default function TeamRouter() {
  return (
    <Routes>
      <Route path="" element={<TeamList />} />
      <Route path="new" element={<NewTeam />} />
      <Route path=":id/edit" element={<EditTeam />} />
    </Routes>
  );
}

function TeamTableItem({ team }: { team: WithID<Team> }) {
  return (
    <Row>
      <Cell>{team.name}</Cell>
      <Cell className="text-gray-700">
        <span className="text-gray-500">#</span>
        {team.code}
      </Cell>
      <Cell>
        {team.active ? (
          <Pill text="Active" className="text-green-500 bg-green-100 border-green-300" />
        ) : (
          <Pill text="Inactive" className="text-red-500 bg-red-100 border-red-300" />
        )}
      </Cell>
      <Cell className="w-2">
        <div className="flex justify-right">
          <Button.Edit link={`/teams/${team._id}/edit`} />
        </div>
      </Cell>
    </Row>
  );
}

function TeamList() {
  const { limit, offset, currentPage } = usePagination(10);
  const { Loader } = Api.useAsyncGetMany<WithID<Team>>('/teams', limit, offset);

  return (
    <Page title="Admin Panel: Teams" buttons={<Button.Create title="Create new" />}>
      <Loader>
        {({ values, total }) => (
          <>
            <Table columns={['Name', 'Company code', 'Status', '']}>
              {values.sort(comparator(t => t.name)).map(v => (
                <TeamTableItem key={v._id} team={v} />
              ))}
            </Table>
            <Pagination currentPage={currentPage} limit={limit} total={total} />
          </>
        )}
      </Loader>
    </Page>
  );
}
