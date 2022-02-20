import {
  Button,
  classes,
  DataTable,
  DataTableRowGroup,
  DataTableCell as Td,
  DataTableRow as Tr,
  DaySelector,
  DownloadIcon,
  DropdownSelect,
  Field,
  Label,
  Card,
  usePaginationState,
  useFilter,
  PaginationNavigation,
  Modal,
  ModalBody,
  SearchableDropdown,
} from '@setel/portal-ui';
import * as React from 'react';
import {useNotification} from 'src/react/hooks/use-notification';
import {OnDemandReportCategory} from 'src/react/services/api-reports.enum';
import {cardReportAccess} from 'src/shared/helpers/pdb.roles.type';
import {HasPermission} from '../../auth/HasPermission';
import {useGetMerchantsFilterBy} from '../../cards/card.queries';
import {SendReportForm} from '../../on-demand-reports/components/on-demand-report-send-report-form';
import {useCardReportsDetails, useReportDataCustom} from '../card-reports.queries';
import {onDemandReportUrls, optStatus} from '../enum';
import TableReportDataCommon from './table-report-data-common';

const listColumnsNumber = ['Card balance'];
const GIFT_CARD_CLIENT = 'giftCardClient';

const ExpiredCardBalanceDetailsList: React.VFC = () => {
  const [showSendModal, setShowSendModal] = React.useState(false);
  const [person, setPerson] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const showMessage = useNotification();
  const pagination = usePaginationState();
  const [{values}, {setValue}] = useFilter({
    expiryDate: undefined,
    status: '',
    merchantId: '',
  });

  const {data: dataMerchants} = useGetMerchantsFilterBy({
    page: 1,
    perPage: 100,
    name: searchText,
    merchantTypes: [GIFT_CARD_CLIENT],
  });

  const optMerchants =
    dataMerchants &&
    dataMerchants.items.map((merchant) => ({
      value: merchant.merchantId,
      label: merchant.name,
    }));

  const {data: resolvedData, isFetching} = useReportDataCustom({
    url: onDemandReportUrls.EXPIRED_CARD_BALANCE_DETAILS,
    category: OnDemandReportCategory.CARD,
    perPage: pagination.perPage,
    page: pagination.page,
    ...values,
  });
  const {data: reportDetails} = useCardReportsDetails(
    OnDemandReportCategory.CARD,
    onDemandReportUrls.EXPIRED_CARD_BALANCE_DETAILS,
  );

  const data = React.useMemo(() => {
    return resolvedData && resolvedData.filter((item) => !item.exportOnly).filter(Boolean)[0];
  }, [resolvedData]);

  const dismissSendModal = React.useCallback(() => {
    setShowSendModal(false);
  }, []);

  return (
    <>
      <HasPermission accessWith={[cardReportAccess.view]}>
        <div className="grid gap-4 pt-6 max-w-6xl mx-auto px-4 sm:px-6 mb-15 relative">
          <div className="flex justify-between">
            <h1 className={classes.h1}>Expired card balance details</h1>
            <HasPermission accessWith={[cardReportAccess.download]}>
              <Button
                variant="outline"
                disabled={values?.merchantId ? false : true}
                onClick={() => {
                  setShowSendModal(true);
                }}
                leftIcon={<DownloadIcon />}>
                DOWNLOAD CSV
              </Button>
            </HasPermission>
          </div>
          <Card className="mb-4">
            <div className="grid grid-cols-4 gap-5 p-5">
              <Field className="col-span-2">
                <Label>Merchant name</Label>
                <SearchableDropdown
                  value={person}
                  onChangeValue={(value) => {
                    setPerson(value);
                    setValue('merchantId', value);
                    pagination.page = 0;
                  }}
                  options={optMerchants}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchText(e.target.value);
                  }}
                  placeholder="Please select"
                />
              </Field>
              <Field>
                <Label>Status</Label>
                <DropdownSelect
                  options={optStatus}
                  value={values.status}
                  onChangeValue={(value) => {
                    setValue('status', value);
                    pagination.page = 0;
                  }}
                />
              </Field>
              <Field className="col-span-2">
                <Label>Expired on</Label>
                <DaySelector
                  value={values.expiryDate}
                  onChangeValue={(value) => {
                    setValue('expiryDate', value);
                    pagination.page = 0;
                  }}
                  placeholder="Select date"
                  emptyValue="Any dates"
                  className="w-full"
                />
              </Field>
            </div>
          </Card>
          <DataTable
            striped
            isLoading={isFetching}
            pagination={
              data &&
              data.paginated && (
                <PaginationNavigation
                  onChangePage={pagination.setPage}
                  total={data.paginated.record_count}
                  currentPage={data.paginated.page}
                  perPage={data.paginated.page_size}
                  onChangePageSize={pagination.setPerPage}
                />
              )
            }>
            {!resolvedData && (
              <>
                <DataTableRowGroup groupType="thead">
                  <Tr>
                    <Td>Merchant name</Td>
                    <Td>Card number</Td>
                    <Td>Status</Td>
                    <Td>Card balance (RM)</Td>
                    <Td className="text-right">Expired on</Td>
                  </Tr>
                </DataTableRowGroup>
                <DataTableRowGroup groupType="tbody"></DataTableRowGroup>
              </>
            )}
            {data && <TableReportDataCommon data={data} listColumnsNumber={listColumnsNumber} />}
          </DataTable>
        </div>
      </HasPermission>
      {/* send email modal*/}
      <Modal aria-label="send" isOpen={showSendModal} onDismiss={dismissSendModal}>
        <ModalBody>
          This CSV file will be sent to the email you enter down below. You may enter multiple email
          addresses separated by commas.
        </ModalBody>
        <SendReportForm
          reportName={reportDetails?.reportName}
          filter={values}
          onSuccess={() => {
            showMessage({
              title: 'Report requested.',
              description: 'You will be notified when the report is ready.',
            });
            dismissSendModal();
          }}
          onDismiss={dismissSendModal}
        />
      </Modal>
      {/* send email modal - END */}
    </>
  );
};

export default ExpiredCardBalanceDetailsList;
