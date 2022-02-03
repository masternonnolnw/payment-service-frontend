import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function ResultCard({
  ownerName,
  debtor,
  outstandingBalance,
  lastPayment,
  status,
  submitTime,
  debtorId,
  loadStatement,
  payAmount,
}: any): any {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(`${baseURL}/${debtorId}`);
      var sum = parseInt(outstandingBalance) - parseInt(payAmount);
      axios
        .patch(`${baseURL}/${debtorId}`, {
          status: "Success",
          lastPayment: submitTime,
          outstandingBalance: sum,
        })
        .then((response) => {
          loadStatement();
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex bg="grey" w="50vw" h="30vh" alignSelf="center" m="5">
      <Flex flexDir="column" h="100%" bg="yellow" p="5">
        {ownerName}
      </Flex>
      <Flex flexDir="column" w="100%" bg="pink" p="5">
        {/* <Text m="1">Id: {debtorId}</Text> */}
        <Text m="1">Name: {debtor}</Text>
        <Text m="1">Outstanding balance: {outstandingBalance}</Text>
        <Text m="1">
          Last payment:{" "}
          {moment(String(lastPayment)).format("DD/MM/YYYY hh:mm a")}
        </Text>
        <Text m="1">Status: {status}</Text>
        <Text m="1">
          submitTime: {moment(String(submitTime)).format("DD/MM/YYYY hh:mm a")}
        </Text>
        <Button
          w="max"
          p="5"
          m="1"
          isDisabled={status != "pending"}
          onClick={handleSubmit}
          _focus={{
            outline: "none",
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  );
}
