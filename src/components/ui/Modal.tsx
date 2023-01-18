import { Button, Modal, Row, Typography } from "antd";
const { Text } = Typography;

type ModalPopupProps = {
  open: boolean;
  setOpen: any;
  isAuthorFetched?: boolean;
  isQuoteFetched?: boolean;
  cancleRequest?: any;
};

const ModalPopup = ({
  open,
  setOpen,
  isAuthorFetched,
  isQuoteFetched,
  cancleRequest,
}: ModalPopupProps) => {
  const handleCancel = () => {
    setOpen(false);
    cancleRequest() // canceling request on close
  };
  return (
    <Modal
      closable={false}
      title="Requesting the qoute"
      open={open}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Button key="back" type="primary" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Row>
        <Text>
          Step 1: Requesting author.. {isAuthorFetched && "Completed"}
        </Text>
      </Row>
      <Row>
        <Text>Step 2: Requesting quote.. {isQuoteFetched && "Completed"}</Text>
      </Row>
    </Modal>
  );
};
export default ModalPopup;