import {Badge, BadgeProps, DataTable as Table, formatMoney, titleCase} from '@setel/portal-ui';
import * as React from 'react';
import {PageContainer} from 'src/react/components/page-container';
// import {
//   GetWalletTransactionOptions,
// } from 'src/react/services/api-wallets.service';
import {
  PlanStatus,
  // PlanType
} from 'src/react/modules/bnpl-plan-config/bnpl.enum';
// import {
//   TransactionType,
//   CreditCardBrand,
//   CreditCardPaymentType,
// } from 'src/shared/enums/wallet.enum';

export const BNPLBillListing = () => {
  // const {
  //   query: {data, isLoading, isFetching},
  //   pagination,
  //   filter,
  // } = useDataTableState({
  //   initialFilter: {
  //     status: '',
  //     dateRange: ['', ''],
  //     cardBrand: '' as any,
  //     paymentType: '' as any,
  //   } as FilterValues,
  //   queryKey: walletTopupQueryKey.topupListing,
  //   queryFn: (values) => getWalletTransactions(transformToApiFilter(values)),
  //   components: [
  //     {
  //       key: 'status',
  //       type: 'select',
  //       props: {
  //         label: 'Status',
  //         options: statusOptions,
  //         placeholder: 'All',
  //       },
  //     },
  //     {
  //       key: 'cardBrand',
  //       type: 'select',
  //       props: {
  //         label: 'Plan Type',
  //         options: planTypeOptions,
  //         placeholder: 'All',
  //       },
  //     },
  //     {
  //       key: 'paymentType',
  //       type: 'select',
  //       props: {
  //         label: 'Payment type',
  //         options: paymentTypeOptions,
  //         placeholder: 'All',
  //       },
  //     },
  //     {
  //       key: 'dateRange',
  //       type: 'daterange',
  //       props: {
  //         label: 'Created date',
  //       },
  //     },
  //   ],
  // });

  const isLoading = false;
  const isFetching = false;
  const data = {
    items: [
      {
        id: '12312313',
        planName: '123123',
        status: 'ACTIVE',
        planType: 'MONTHLY',
        minAmount: '12.00',
        maxAmount: '111.00',
        planStructure: 'INSTRUCTION',
      },
    ],
  };

  return (
    <PageContainer heading="BNPL Bills">
      <div className="space-y-5">
        {/* <FilterControls filter={filter} />
        <Filter filter={filter} /> */}
        <Table
          isLoading={isLoading}
          isFetching={isFetching}
          // pagination={
          //   data &&
          //   (data.items.length > 0 || pagination.page > 1) && (
          //     <PaginationNavigation
          //       variant="page-list"
          //       onChangePage={pagination.setPage}
          //       onChangePageSize={pagination.setPerPage}
          //       currentPage={pagination.page}
          //       perPage={pagination.perPage}
          //       total={data.total}
          //     />
          //   )
          // }
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Plan Id</Table.Th>
              <Table.Th>Plan Name</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Plan Type</Table.Th>
              <Table.Th className="text-right">Min Amount (RM)</Table.Th>
              <Table.Th className="text-right">Max Amount (RM)</Table.Th>
              <Table.Th className="text-right">Plan Structure</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data &&
              data.items.map((trx) => (
                <Table.Tr key={trx.id}>
                  <Table.Td
                  // render={(cellProps) => (
                  //   <Link {...cellProps} to={`/wallet/topups/details/${trx.transactionUid}`} />
                  // )}
                  >
                    {trx.id}
                  </Table.Td>

                  <Table.Td
                  // render={(cellProps) => <Link {...cellProps} to={`/customers/${trx.userId}`} />}
                  >
                    {titleCase(trx.planName) || '-'}
                  </Table.Td>

                  <Table.Td>
                    <Badge color={statusColor[trx.status]}>{trx.status}</Badge>
                  </Table.Td>

                  <Table.Td>{titleCase(trx.planType) || '-'}</Table.Td>

                  <Table.Td className="text-right">{formatMoney(trx.minAmount)}</Table.Td>
                  <Table.Td className="text-right">{formatMoney(trx.maxAmount)}</Table.Td>
                  <Table.Td className="text-right">{titleCase(trx.planStructure) || '-'}</Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
          {data && data.items.length === 0 && (
            <Table.Caption>
              <div className="p-6 text-center">
                <span>No records found.</span>
              </div>
            </Table.Caption>
          )}
        </Table>
      </div>
    </PageContainer>
  );
};

// interface FilterValues {
//   dateRange: [string, string];
//   cardBrand: CreditCardBrand;
//   paymentType: CreditCardPaymentType;
//   status: string;
// }

// const transformToApiFilter = ({
//   dateRange: [transactionDateFrom, transactionDateTo],
//   ...filter
// }: FilterValues): GetWalletTransactionOptions => {
//   return {
//     ...filter,
//     type: TransactionType.TOPUP,
//     transactionDateFrom,
//     transactionDateTo,
//   };
// };

// const planTypeOptions = Object.values(PlanType).map((value) => ({
//   value,
//   label: titleCase(value),
// }));

// const paymentTypeOptions = Object.values(CreditCardPaymentType).map((value) => ({
//   value,
//   label: value,
// }));

// const statusOptions = Object.values(PlanStatus).map((value) => ({
//   value,
//   label: titleCase(value),
// }));

const statusColor: Record<PlanStatus, BadgeProps['color']> = {
  [PlanStatus.ACTIVE]: 'success',
  [PlanStatus.INACTIVE]: 'error',
};
